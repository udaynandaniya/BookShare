// // app/api/auth/session/route.ts
// import { NextResponse } from "next/server"
// import { connectDB } from "@/lib/mongodb"
// import { User } from "@/models/User"
// import jwt from "jsonwebtoken"
// import { cookies } from "next/headers"

// export async function GET() {
//   await connectDB()
  
//   const token = cookies().get("auth-token")?.value
//   if (!token) {
//     return NextResponse.json({ user: null }, { status: 401 })
//   }

//   try {
//    const { email } = jwt.verify(token, process.env.JWT_SECRET!) as { email: string }
// const user = await User.findOne({ email }).select("-password -otp -otpExpiry")
//  if (!user) {
//       return NextResponse.json({ user: null }, { status: 404 })
//     }

//     return NextResponse.json({
//       user: {
//         id: user._id,
//         name: user.fullName,
//         email: user.email,
//         mobile: user.mobile,
//         isVerified: user.isVerified,
//         isAdmin: user.isAdmin,
//       },
//     }, { status: 200 })

//   } catch (error) {
//     console.error("Invalid token:", error)
//     return NextResponse.json({ user: null }, { status: 401 })
//   }
// }



//C:\Users\UDAYN\Downloads\navneethub\app\api\auth\session\route.ts
import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export async function GET() {
  try {
    await connectDB()

    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
 if (!token) {
      return NextResponse.json({ user: null }, { status: 401 })
    }

    // Verify JWT token
    const { email } = jwt.verify(token, process.env.JWT_SECRET!) as { email: string }

    // Find user by email
    const user = await User.findOne({ email }).select("-password -otp -otpExpiry")

    if (!user) {
      return NextResponse.json({ user: null }, { status: 404 })
    }

    // Check if user is still verified (in case verification was revoked)
    if (!user.isVerified) {
      return NextResponse.json({ user: null }, { status: 401 })
    }

    return NextResponse.json(
      {
        user: {
          id: user._id,
          name: user.fullName,
          email: user.email,
          mobile: user.mobile,
          isVerified: user.isVerified,
          isAdmin: user.isAdmin,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Session validation error:", error)

    // Clear invalid token cookie
    const response = NextResponse.json({ user: null }, { status: 401 })
    response.cookies.set("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    })

    return response
  }
}
