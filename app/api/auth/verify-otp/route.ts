

import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"


export async function POST(request: NextRequest) {
  try {

      await connectDB() 

    const reqBody = await request.json()
   const { email, otp } = reqBody
const numericOtp = Number(otp)

if (isNaN(numericOtp)) {
  return NextResponse.json({ error: "Invalid OTP format" }, { status: 400 })
}



    // Find the user by email and verify OTP and expiry
    const user = await User.findOne({
  email,
  emailOtp: numericOtp,
  emailOtpExpiry: { $gt: new Date() },
})
// const user = await User.findOne({
//       email,
//       emailOtp: otp,
//       emailOtpExpiry: { $gt: new Date() },
//     })

    if (!user) {
      return NextResponse.json({ error: "Invalid OTP or OTP expired" }, { status: 400 })
    }

  

    // Update user as verified and clean OTP fields
    user.isVerified = true
    user.emailOtp = undefined
    user.emailOtpExpiry = undefined

    await user.save()

    // Create JWT token
    const tokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      isAdmin: user.isAdmin || false,
      fullName: user.fullName,
    }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, { expiresIn: "60d" })

    const response = NextResponse.json({
      message: "Email verified successfully",
      success: true,
    })

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      // sameSite: "lax",

      sameSite: "none",
secure: true,

      path: "/",
      maxAge: 60 * 24 * 60 * 60, // 60 days in seconds
    })


    return response
  } catch (error: any) {
    console.error("❗️ Server Error:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
