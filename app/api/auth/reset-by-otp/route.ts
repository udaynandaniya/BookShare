// // app/api/auth/reset-by-otp/route.ts
// import { NextRequest, NextResponse } from "next/server"
// import { connectDB } from "@/lib/mongodb"
// import { User } from "@/models/User"
// import bcrypt from "bcryptjs"

// connectDB()

// export async function POST(req: NextRequest) {
//   try {
//     const { email, otp, newPassword } = await req.json()

//     const user = await User.findOne({
//       email,
//       otp,
//       otpExpiry: { $gt: new Date() }, // ensure OTP not expired
//     })

//     if (!user) {
//       return NextResponse.json({ message: "Invalid OTP or expired." }, { status: 400 })
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10)

//     user.password = hashedPassword
//     user.otp = undefined
//     user.otpExpiry = undefined

//     await user.save()

//     return NextResponse.json({ message: "Password reset successfully." })
//   } catch (error: any) {
//     console.error("❌ reset-by-otp error:", error.message)
//     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
//   }
// }


import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"
import bcryptjs from "bcryptjs"

connectDB()
export async function POST(req: NextRequest) {
  const { email, oldPassword, newPassword } = await req.json()
  const user = await User.findOne({ email })
  if (!user) return NextResponse.json({ error: "Email not found. Please register." }, { status: 404 })

  const match = await bcryptjs.compare(oldPassword, user.password)
  if (!match) return NextResponse.json({ error: "Old password is wrong" }, { status: 400 })

  user.password = await bcryptjs.hash(newPassword, await bcryptjs.genSalt(10))
  await user.save()

  return NextResponse.json({ message: "Password reset successfully" })
}
