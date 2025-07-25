import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"
import { sendOTPEmail } from "@/lib/email"
import bcryptjs from "bcryptjs"

connectDB()
export async function POST(req: NextRequest) {
  const { email } = await req.json()
  const user = await User.findOne({ email })
  if (!user) return NextResponse.json({ error: "Email not found. Please register." }, { status: 404 })

  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  const otpHash = await bcryptjs.hash(otp, await bcryptjs.genSalt(10))

  user.resetOtp = otpHash
  user.resetOtpExpiry = new Date(Date.now() + 10 * 60 * 1000)
  await user.save()

  await sendOTPEmail(email, otp, user.fullName)
  return NextResponse.json({ message: "OTP sent" })
}
