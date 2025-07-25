import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Book } from "@/models/Book"
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

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as { userId: string }

    // Find user's books
    const books = await Book.find({ seller: decoded.userId }).sort({ createdAt: -1 })

    return NextResponse.json({ books })
  } catch (error) {
    console.error("User books fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
