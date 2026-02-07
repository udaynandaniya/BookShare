

import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { sendDeletionNotificationEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as {
      userId: string
    }

    const user = await User.findById(decoded.userId)
    if (!user || !user.isAdmin) {
      return NextResponse.json({ message: "Admin access required" }, { status: 403 })
    }

    const { userEmail, userName, bookTitle, reason } = await request.json()

    if (!userEmail || !userName || !bookTitle || !reason) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Send email notification
    try {
      await sendDeletionNotificationEmail(userEmail, userName, bookTitle, reason)
      return NextResponse.json({ message: "Notification sent successfully" })
    } catch (emailError) {
      console.error("Email sending failed:", emailError)
      // Still return success as the book was deleted, just email failed
      return NextResponse.json({
        message: "Book deleted but email notification failed",
        warning: "Email notification could not be sent",
      })
    }
  } catch (error) {
    console.error("Notification send error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
