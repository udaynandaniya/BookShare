

import { NextRequest, NextResponse } from "next/server"
import {Book} from "@/models/Book"
import { getUserFromRequest } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"



export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const user = await getUserFromRequest(req)
    if (!user) {
      console.warn("Unauthorized access attempt.")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const bookId = params.id

    const existingBook = await Book.findById(bookId)
    if (!existingBook) {
      console.warn("Book not found:", bookId)
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

    // Permission check
    if (existingBook.seller.toString() !== user.id && !user.isAdmin) {
      console.warn("Forbidden update attempt by user:", user.id)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await req.json()

    const {
      title,
      standard,
      condition,
      price,
      description,
      location,
      quantity,
      specificBooks,
      images,
    } = body

    // Validation
    const errors = []
    if (!title?.trim()) errors.push("Title is required")
    if (!standard) errors.push("Standard is required")
    if (!condition) errors.push("Condition is required")
    if (typeof price !== "number" || price <= 0 || price > 100000) errors.push("Invalid price")
    if (!location?.trim()) errors.push("Location is required")
    if (!Array.isArray(images) || images.length === 0 || images.length > 5)
      errors.push("Invalid image count")
    if (quantity === "some" && (!Array.isArray(specificBooks) || specificBooks.length === 0))
      errors.push("Specific books required when quantity is 'some'")

    if (errors.length > 0) {
      console.warn("Validation failed:", errors)
      return NextResponse.json({ error: "Validation failed", details: errors }, { status: 400 })
    }

    // Update book
    existingBook.title = title.trim()
    existingBook.standard = standard
    existingBook.condition = condition
    existingBook.price = price
    existingBook.description = description?.trim() || ""
    existingBook.location = location.trim()
    existingBook.quantity = quantity
    existingBook.specificBooks = quantity === "some" ? specificBooks : []
    existingBook.images = images

    await existingBook.save()

    return NextResponse.json({
      message: "Book updated successfully",
      book: existingBook,
      updatedBy: {
        id: user.id,
        name: user.fullName,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    })
  } catch (err) {
    console.error("Error updating book:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const bookId = params.id
    const book = await Book.findById(bookId)
    if (!book) return NextResponse.json({ error: "Book not found" }, { status: 404 })

    if (book.seller.toString() !== user.id && !user.isAdmin)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })

    await book.deleteOne()

    return NextResponse.json({
      message: "Book deleted successfully",
      deletedBookId: bookId,
    })
  } catch (err) {
    console.error("Error deleting book:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}