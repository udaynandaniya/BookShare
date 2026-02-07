

import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Book } from "@/models/Book"
import { User } from "@/models/User"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    // Get and verify token
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId?: string
      email: string
      isAdmin?: boolean
    }

    // Find user
    const user = await User.findOne({ email: decoded.email })
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }


    // Parse request body
    const body = await request.json()
   

    const { title, standard, condition, price, description, images, location, quantity, specificSubjects } = body

    // Validation
    if (!title || !standard || !condition || !price || !location) {
      return NextResponse.json(
        {
          error: "Missing required fields: title, standard, condition, price, location",
        },
        { status: 400 },
      )
    }

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        {
          error: "At least one image is required",
        },
        { status: 400 },
      )
    }

    if (images.length > 5) {
      return NextResponse.json(
        {
          error: "Maximum 5 images allowed",
        },
        { status: 400 },
      )
    }

    const bookData = {
      seller: user._id,
      sellerName: user.fullName,
      sellerEmail: user.email,
      sellerContact: user.mobile,
      title: title.trim(),
      standard,
      condition,
      price: Number(price),
      description: description?.trim() || "",
      images: images, // This should now contain the uploaded image URLs/base64
      location: location.trim(),
      quantity: quantity || "all",
      specificBooks: specificSubjects || [],
      specificSubjects: specificSubjects || [], // Keep both for compatibility
      views: 0,
      isActive: true,
    }

    // Create and save book
    const book = new Book(bookData)
    await book.save()

   
    return NextResponse.json(
      {
        message: "Book created successfully",
        book: {
          _id: book._id,
          title: book.title,
          standard: book.standard,
          condition: book.condition,
          price: book.price,
          images: book.images,
          location: book.location,
          sellerName: book.sellerName,
          createdAt: book.createdAt,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("❌ Error creating book:", error)

    // Handle specific errors
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: "Invalid authentication token" }, { status: 401 })
    }

    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json({ error: "Authentication token expired" }, { status: 401 })
    }

    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err) => err.message)
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationErrors,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const standard = searchParams.get("standard") || ""
    const condition = searchParams.get("condition") || ""
    const location = searchParams.get("location") || ""
    const sortBy = searchParams.get("sortBy") || "newest"
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")

   

    // Build query
    const query: any = { isActive: true }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { sellerName: { $regex: search, $options: "i" } },
      ]
    }

    if (standard && standard !== "all") {
      query.standard = standard
    }

    if (condition && condition !== "all") {
      query.condition = condition
    }

    if (location) {
      query.location = { $regex: location, $options: "i" }
    }

    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number(minPrice)
      if (maxPrice) query.price.$lte = Number(maxPrice)
    }

    // Build sort option
    let sortOption: any = {}
    switch (sortBy) {
      case "oldest":
        sortOption = { createdAt: 1 }
        break
      case "priceLow":
        sortOption = { price: 1 }
        break
      case "priceHigh":
        sortOption = { price: -1 }
        break
      case "popular":
        sortOption = { views: -1 }
        break
      default:
        sortOption = { createdAt: -1 }
    }

   

    // Fetch books
    const books = await Book.find(query).sort(sortOption).limit(50).lean() // Use lean() for better performance


    return NextResponse.json(
      {
        books,
        count: books.length,
        filters: {
          search,
          standard,
          condition,
          location,
          sortBy,
          priceRange: { min: minPrice, max: maxPrice },
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("❌ Error fetching books:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch books",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

