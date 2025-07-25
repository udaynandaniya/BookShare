// // import { NextRequest, NextResponse } from "next/server"
// // import { connectDB } from "@/lib/mongodb"
// // import { User } from "@/models/User"
// // import { Book } from "@/models/Book"
// // import jwt from "jsonwebtoken"

// // export async function GET(req: NextRequest) {
// //   await connectDB()
  
// //   const token = req.cookies.get("auth-token")?.value
// //   if (!token) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 })

// //   let data
// //   try {
// //     data = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
// //   } catch {
// //     return NextResponse.json({ error: "Invalid token" }, { status: 401 })
// //   }

// //   const admin = await User.findById(data.userId)
// //   if (!admin?.isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

// //   const totalUsers = await User.countDocuments()
// //   const verifiedUsers = await User.countDocuments({ isVerified: true })
// //   const totalBooks = await Book.countDocuments()

// //   return NextResponse.json({ totalUsers, verifiedUsers, totalBooks })
// // }



// //C:\Users\UDAYN\Downloads\navneethub\app\api\admin\stats\route.ts
// import { type NextRequest, NextResponse } from "next/server"
// import { connectDB } from "@/lib/mongodb"
// import { User } from "@/models/User"
// import { Book } from "@/models/Book"
// import jwt from "jsonwebtoken"
// import { cookies } from "next/headers"

// export async function GET(request: NextRequest) {
//   try {
//     await connectDB()

//     const cookieStore = cookies()
//     const token = cookieStore.get("auth-token")?.value

//     if (!token) {
//       return NextResponse.json({ message: "Authentication required" }, { status: 401 })
//     }

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as {
//       userId: string
//     }

//     const user = await User.findById(decoded.userId)
//     if (!user || !user.isAdmin) {
//       return NextResponse.json({ message: "Admin access required" }, { status: 403 })
//     }

//     // Get stats
//     const totalBooks = await Book.countDocuments()
//     const totalUsers = await User.countDocuments()
//     const activeBooks = await Book.countDocuments({ isActive: true })

//     // Recent books (last 7 days)
//     const sevenDaysAgo = new Date()
//     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
//     const recentBooks = await Book.countDocuments({
//       createdAt: { $gte: sevenDaysAgo },
//     })

//     return NextResponse.json({
//       totalBooks,
//       totalUsers,
//       activeBooks,
//       recentBooks,
//     })
//   } catch (error) {
//     console.error("Admin stats fetch error:", error)
//     return NextResponse.json({ message: "Internal server error" }, { status: 500 })
//   }
// }



//C:\Users\UDAYN\Downloads\navneethub\app\api\admin\stats\route.ts
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

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as {
      userId: string
    }

    const user = await User.findById(decoded.userId)
    if (!user || !user.isAdmin) {
      return NextResponse.json({ message: "Admin access required" }, { status: 403 })
    }

    // Get stats
    const totalBooks = await Book.countDocuments()
    const totalUsers = await User.countDocuments()
    const activeBooks = await Book.countDocuments({ isActive: true })

    // Recent books (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const recentBooks = await Book.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    })

    // Additional stats for better dashboard insights
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

    // Books by condition
    const booksByCondition = await Book.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$condition", count: { $sum: 1 } } },
    ])

    // Books by standard
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
