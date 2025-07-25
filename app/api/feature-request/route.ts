import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // In a real application, you would save this to a database
    // For now, we'll just log it and return success

    // You could also send an email notification to admin here
    // await sendEmailToAdmin(body)

    return NextResponse.json({
      success: true,
      message: "Feature request submitted successfully",
    })
  } catch (error) {
    console.error("Error processing feature request:", error)
    return NextResponse.json({ success: false, message: "Failed to submit feature request" }, { status: 500 })
  }
}
