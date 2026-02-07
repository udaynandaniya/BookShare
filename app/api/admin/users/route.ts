
import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"
import { Book } from "@/models/Book"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as {
      userId: string
    }

    const user = await User.findById(decoded.userId)
    if (!user || !user.isAdmin) {
      return NextResponse.json({ message: "Admin access required" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const search = searchParams.get("search") || ""

    const query: any = {}
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ]
    }

    const skip = (page - 1) * limit

    const users = await User.find(query, {
      password: 0,
      otp: 0,
      otpExpiry: 0,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const usersWithBookCount = await Promise.all(
      users.map(async (user) => {
        const bookCount = await Book.countDocuments({
          sellerEmail: user.email,
          isActive: true,
        })
        return {
          ...user.toObject(),
          bookCount,
        }
      }),
    )

    const total = await User.countDocuments(query)

    return NextResponse.json({
      users: usersWithBookCount,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Admin users fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as {
      userId: string
    }

    const user = await User.findById(decoded.userId)
    if (!user || !user.isAdmin) {
      return NextResponse.json({ message: "Admin access required" }, { status: 403 })
    }

    const { userId, action, data } = await request.json()

    const targetUser = await User.findById(userId)
    if (!targetUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    switch (action) {
      case "toggleAdmin":
        targetUser.isAdmin = !targetUser.isAdmin
        await targetUser.save()
        return NextResponse.json({
          message: `User ${targetUser.isAdmin ? "promoted to" : "demoted from"} admin`,
          user: targetUser,
        })

      case "toggleVerification":
        targetUser.isVerified = !targetUser.isVerified
        await targetUser.save()
        return NextResponse.json({
          message: `User ${targetUser.isVerified ? "verified" : "unverified"}`,
          user: targetUser,
        })

      case "updateProfile":
        Object.assign(targetUser, data)
        await targetUser.save()
        return NextResponse.json({
          message: "User profile updated",
          user: targetUser,
        })

      default:
        return NextResponse.json({ message: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("User management error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
