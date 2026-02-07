
import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export async function GET() {
  try {
    await connectDB()

    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
 if (!token) {
      return NextResponse.json({ user: null }, { status: 401 })
    }

    const { email } = jwt.verify(token, process.env.JWT_SECRET!) as { email: string }

    const user = await User.findOne({ email }).select("-password -otp -otpExpiry")

    if (!user) {
      return NextResponse.json({ user: null }, { status: 404 })
    }

    if (!user.isVerified) {
      return NextResponse.json({ user: null }, { status: 401 })
    }

    return NextResponse.json(
      {
        user: {
          id: user._id,
          name: user.fullName,
          email: user.email,
          mobile: user.mobile,
          isVerified: user.isVerified,
          isAdmin: user.isAdmin,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Session validation error:", error)

    const response = NextResponse.json({ user: null }, { status: 401 })
    response.cookies.set("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    })

    return response
  }
}
