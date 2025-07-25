// /lib/auth.ts
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { User } from "@/models/User"
import { connectDB } from "./mongodb"

export async function getUserFromRequest(req: Request) {
  try {
    await connectDB()

    const token = cookies().get("auth-token")?.value
    if (!token) return null

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string }
    const user = await User.findOne({ email: decoded.email }).select("-password -otp -otpExpiry")
    if (!user || !user.isVerified) return null

    return user
  } catch (error) {
    console.error("Auth error:", error)
    return null
  }
}
