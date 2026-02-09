
import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"
import { sendOTPEmail } from "@/lib/email"

export async function POST(req: NextRequest) {
  await connectDB()
  let { fullName, mobile, email, password } = await req.json()

email = email.trim().toLowerCase()
fullName = fullName.trim()
mobile = mobile.trim()


  if (!fullName || !mobile || !email || !password)
    return NextResponse.json({ message: "All fields are required" }, { status: 400 })

  if (!email.toLowerCase().endsWith("@gmail.com")) {
  return NextResponse.json(
    { message: "Email must be a valid Gmail address" },
    { status: 400 }
  )
}

  if (!/^[6-9]\d{9}$/.test(mobile)) return NextResponse.json({ message: "Invalid mobile number" }, { status: 400 })

  const verifiedUserWithEmail = await User.findOne({ email, isVerified: true })
  if (verifiedUserWithEmail) {
    return NextResponse.json({ message: "Email is already registered & verified. Please Login" }, { status: 400 })
  }

  const verifiedUserWithMobile = await User.findOne({ mobile, isVerified: true })
  if (verifiedUserWithMobile) {
    return NextResponse.json(
      { message: "Mobile number is already registered & verified. Please Login" },
      { status: 400 },
    )
  }

  await User.deleteMany({
    $or: [
      { email, isVerified: false },
      { mobile, isVerified: false },
    ],
  })

  const hashed = await bcrypt.hash(password, 12)
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  const expiry = new Date(Date.now() + 10 * 60 * 1000)
  const isAdmin = email === process.env.ADMIN_EMAIL

  const user = new User({
    fullName,
    mobile,
    email,
    password: hashed,
    emailOtp: otp,
    emailOtpExpiry: expiry,
    isAdmin,
    isVerified: false,
  })

  try {
    await user.save()
  } catch (err: any) {
    console.error("User creation error:", err)
    return NextResponse.json({ message: "Failed to create user. Please try again." }, { status: 500 })
  }

  try {
    await sendOTPEmail(email, otp, fullName)
    return NextResponse.json({ message: "OTP sent. Check email." }, { status: 201 })
  } catch (emailError) {
    console.error("Email sending failed:", emailError)
    await User.deleteOne({ _id: user._id })
    return NextResponse.json(
      {
        message: "Failed to send OTP email. Please try again.",
      },
      { status: 500 },
    )
  }
}
