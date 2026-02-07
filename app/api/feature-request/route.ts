import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

  
    return NextResponse.json({
      success: true,
      message: "Feature request submitted successfully",
    })
  } catch (error) {
    console.error("Error processing feature request:", error)
    return NextResponse.json({ success: false, message: "Failed to submit feature request" }, { status: 500 })
  }
}
