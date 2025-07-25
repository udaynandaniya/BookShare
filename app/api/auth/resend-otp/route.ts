import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"
import { sendOTPEmail } from "@/lib/email"

export async function POST(req: NextRequest) {
  await connectDB()
  const { email } = await req.json()
  if (!email) return NextResponse.json({ message: "Email is required" }, { status: 400 })

  const user = await User.findOne({ email })
  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 })
  if (user.isVerified) return NextResponse.json({ message: "Already verified" }, { status: 400 })

  user.emailOtp = Math.random().toString().slice(2,8)
  user.emailOtpExpiry = new Date(Date.now() + 10 * 60 * 1000)
  await user.save()

  await sendOTPEmail(email, user.emailOtp!, user.fullName)
  return NextResponse.json({ message: "OTP resent" }, { status: 200 })
}
