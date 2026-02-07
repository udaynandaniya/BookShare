import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {

    const formData = await request.formData()
    const files = formData.getAll("images") as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 })
    }


    await connectDB()

   
    const uploadedImages = []

    for (const file of files) {
      try {
       
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64 = `data:${file.type};base64,${buffer.toString("base64")}`

        uploadedImages.push(base64)

      } catch (error) {
        console.error(`❌ Error processing file ${file.name}:`, error)
      }
    }

    // console.log(`🎉 Upload complete. ${uploadedImages.length} images processed`)

    return NextResponse.json({
      success: true,
      images: uploadedImages,
      message: `${uploadedImages.length} images uploaded successfully`,
    })
  } catch (error) {
    console.error("❌ Upload error:", error)
    return NextResponse.json({ error: "Failed to upload images" }, { status: 500 })
  }
}
