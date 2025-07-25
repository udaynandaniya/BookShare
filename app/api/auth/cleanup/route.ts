import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    // Delete unverified users whose OTP expired more than 1 hour ago
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)

    const result = await User.deleteMany({
      isVerified: false,
      otpExpiry: { $lt: oneHourAgo },
    })

    return NextResponse.json({
      message: `Cleaned up ${result.deletedCount} expired unverified users`,
    })
  } catch (error) {
    console.error("Cleanup error:", error)
    return NextResponse.json({ message: "Cleanup failed" }, { status: 500 })
  }
}
