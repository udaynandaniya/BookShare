import { NextResponse } from "next/server"

export async function POST() {
  try {
    const res = NextResponse.json({
      message: "Logout successful",
      success: true,
    })

    res.cookies.set("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only secure in production
      sameSite: "lax",
      path: "/",
      maxAge: 0, // Expire immediately
    })

    return res
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
