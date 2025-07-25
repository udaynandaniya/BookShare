import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"
import bcryptjs from "bcryptjs"

connectDB()
export async function POST(req: NextRequest) {
  const { email, otp, newPassword } = await req.json()
  const user = await User.findOne({ email })
  if (!user || !user.resetOtp || !user.resetOtpExpiry) {
    return NextResponse.json({ error: "OTP not requested" }, { status: 400 })
  }
  if (user.resetOtpExpiry < new Date()) {
    return NextResponse.json({ error: "OTP expired" }, { status: 400 })
  }

  const match = await bcryptjs.compare(otp, user.resetOtp)
  if (!match) return NextResponse.json({ error: "OTP does not match" }, { status: 400 })

  user.password = await bcryptjs.hash(newPassword, await bcryptjs.genSalt(10))
  user.resetOtp = undefined
  user.resetOtpExpiry = undefined
  await user.save()

  return NextResponse.json({ message: "Password reset successfully" })
}
