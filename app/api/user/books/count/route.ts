import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Book } from "@/models/Book"
import { User } from "@/models/User"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as { email: string }

    const user = await User.findOne({ email: decoded.email })
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Count books for this user
    const bookCount = await Book.countDocuments({ seller: user._id })

    return NextResponse.json({
      count: bookCount,
      message: "Book count retrieved successfully",
    })
  } catch (error) {
    console.error("Book count fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
