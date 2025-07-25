
import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const { email, password } = await request.json()

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { error: "Email not found. Please register first." },
        { status: 401 }
      )
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Incorrect password. Please try again." },
        { status: 401 }
      )
    }

    // Create JWT token
    const tokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      isAdmin: user.isAdmin || false,
      fullName: user.fullName,
    }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "60d",
    })

    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          isAdmin: user.isAdmin || false,
        },
      },
      { status: 200 }
    )

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 24 * 60 * 60,
    })

    return response
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
