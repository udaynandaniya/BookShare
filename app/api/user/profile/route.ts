
import { User } from "@/models/User"
import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { connectDB } from "@/lib/mongodb"
import { Book } from "@/models/Book"

export async function DELETE(request: NextRequest) {
  try {
    await connectDB()

    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 })
    }

 

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as { email: string }

const user = await User.findOne({ email: decoded.email })
if (!user) {
  return NextResponse.json({ message: "User not found" }, { status: 404 })
}



    // Admin check
    if (user.isAdmin) {
      const adminCount = await User.countDocuments({ isAdmin: true })
      if (adminCount <= 1) {
        return NextResponse.json(
          {
            message: "Cannot delete account. You are the only admin. Please assign another admin first.",
          },
          { status: 400 },
        )
      }
    }

    // Delete associated books
    const bookCount = await Book.countDocuments({ seller: user._id })

    const deletedBooks = await Book.deleteMany({ seller: user._id })

    // Delete the user
    await User.findByIdAndDelete(user._id)

    // Clear cookie
    const response = NextResponse.json({
      message: "Account deleted successfully",
      deletedBooks: bookCount,
      userEmail: user.email,
    })

    response.cookies.set("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    })

    return response
  } catch (error) {
    console.error("[DELETE] Account deletion error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
