import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as { userId: string }
    const { currentPassword, newPassword } = await request.json()

    const user = await User.findById(decoded.userId)
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    const isValidPassword = await bcrypt.compare(currentPassword, user.password)
    if (!isValidPassword) {
      return NextResponse.json({ message: "Current password is incorrect" }, { status: 400 })
    }

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(newPassword, salt)
    await user.save()

    return NextResponse.json({ message: "Password changed successfully" })
  } catch (error) {
    console.error("Password change error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
