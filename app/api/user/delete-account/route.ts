import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"
import { Book } from "@/models/Book"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"

export async function DELETE(request: NextRequest) {
  try {
    await connectDB()

    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as { userId: string }
    const { password } = await request.json()

    const user = await User.findById(decoded.userId)
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json({ message: "Password is incorrect" }, { status: 400 })
    }

    // Delete user's books
    await Book.deleteMany({ seller: decoded.userId })

    // Delete user account
    await User.findByIdAndDelete(decoded.userId)

    return NextResponse.json({ message: "Account deleted successfully" })
  } catch (error) {
    console.error("Account deletion error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
