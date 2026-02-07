


//C:\Users\UDAYN\Downloads\navneethub\app\api\user\dashboard\route.ts
import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { Book } from "@/models/Book"
import { User } from "@/models/User"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    // console.log("Dashboard API called") // Debug log
    await connectDB()

    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")?.value

    // console.log("Token found:", !!token) // Debug log

    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Verify token
    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as {
        email?: string
        userId?: string
      }
    } catch (jwtError) {
      console.error("JWT verification failed:", jwtError)
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    let user
    if (decoded.email) {
      user = await User.findOne({ email: decoded.email })
    } else if (decoded.userId) {
      user = await User.findById(decoded.userId)
    }


    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const ownBooks = await Book.find({ seller: user._id })
      .populate("seller", "fullName mobile whatsappNumber location")
      .sort({ createdAt: -1 })
      .lean()


    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const standard = searchParams.get("standard") || ""
    const condition = searchParams.get("condition") || ""
    const location = searchParams.get("location") || ""
    const sortBy = searchParams.get("sortBy") || "newest"
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")

    const query: any = {
      isActive: true,
    }

    if (!user.isAdmin) {
      query.seller = { $ne: user._id }
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { sellerName: { $regex: search, $options: "i" } },
      ]
    }

    if (standard && standard !== "all") {
      const standardValue = standard.includes("Standard") ? standard : `${standard} Standard`
      query.standard = { $regex: `^${standardValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, $options: "i" }
    }

    if (condition && condition !== "all") {
      query.condition = condition
    }

    if (location) {
      query.location = { $regex: location, $options: "i" }
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number.parseInt(minPrice)
      if (maxPrice) query.price.$lte = Number.parseInt(maxPrice)
    }

    // Sort logic
    const sortOptions: Record<string, any> = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      priceLow: { price: 1 },
      priceHigh: { price: -1 },
      popular: { views: -1 },
    }
    const sort = sortOptions[sortBy] || { createdAt: -1 }

    const allBooks = await Book.find(query)
      .populate("seller", "fullName mobile whatsappNumber location")
      .sort(sort)
      .limit(100) // Limit for performance
      .lean()


    // Prepare response data
    const responseData: any = {
      ownBooks,
      allBooks,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
        whatsappNumber: user.whatsappNumber,
        location: user.location,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
      },
    }

    // Add admin-specific data if user is admin
    if (user.isAdmin) {
      try {
        // Get all users for admin
        const users = await User.find({})
          .select("fullName email mobile isVerified isAdmin createdAt")
          .sort({ createdAt: -1 })
          .lean()

        // Calculate admin stats
        const totalBooks = await Book.countDocuments({})
        const totalUsers = await User.countDocuments({})
        const activeBooks = await Book.countDocuments({ isActive: true })

        // Recent books (last 7 days)
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
        const recentBooks = await Book.countDocuments({
          createdAt: { $gte: sevenDaysAgo },
        })

        responseData.users = users
        responseData.stats = {
          totalBooks,
          totalUsers,
          activeBooks,
          recentBooks,
        }

        
      } catch (adminError) {
        console.error("Error fetching admin data:", adminError)
        // Don't fail the entire request if admin data fails
      }
    }

    return NextResponse.json(responseData)
  } catch (error) {
    console.error("Dashboard fetch error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
