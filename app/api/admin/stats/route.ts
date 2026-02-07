
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

    const totalBooks = await Book.countDocuments()
    const totalUsers = await User.countDocuments()
    const activeBooks = await Book.countDocuments({ isActive: true })

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const recentBooks = await Book.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    })

    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    const todayBooks = await Book.countDocuments({
      createdAt: { $gte: todayStart },
    })

    const thisMonthStart = new Date()
    thisMonthStart.setDate(1)
    thisMonthStart.setHours(0, 0, 0, 0)
    const monthlyBooks = await Book.countDocuments({
      createdAt: { $gte: thisMonthStart },
    })
    const booksByCondition = await Book.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$condition", count: { $sum: 1 } } },
    ])

    const booksByStandard = await Book.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$standard", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ])

    return NextResponse.json({
      totalBooks,
      totalUsers,
      activeBooks,
      recentBooks,
      todayBooks,
      monthlyBooks,
      booksByCondition,
      booksByStandard,
    })
  } catch (error) {
    console.error("Admin stats fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
