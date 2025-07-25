// // C:\Users\UDAYN\Downloads\navneethub\components\image-upload.tsx

// "use client"

// import { useState, useCallback } from "react"
// import { useDropzone } from "react-dropzone"
// import { Button } from "@/components/ui/button"
// import { X, Upload, ImageIcon } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"

// interface ImageUploadProps {
//   onImagesChange: (images: string[]) => void
//   initialImages?: string[]
//   maxImages?: number
// }

// export function ImageUpload({ onImagesChange, initialImages = [], maxImages = 5 }: ImageUploadProps) {
//   const [images, setImages] = useState<string[]>(initialImages)
//   const [uploading, setUploading] = useState(false)
//   const { toast } = useToast()

//   const onDrop = useCallback(
//     async (acceptedFiles: File[]) => {
//       if (images.length + acceptedFiles.length > maxImages) {
//         toast({
//           title: "Too many images",
//           description: `You can only upload up to ${maxImages} images`,
//           variant: "destructive",
//         })
//         return
//       }

//       setUploading(true)
//       const newImages: string[] = []

//       for (const file of acceptedFiles) {
//         try {
//           // Convert file to base64 for preview
//           const reader = new FileReader()
//           reader.onload = () => {
//             const base64 = reader.result as string
//             newImages.push(base64)

//             if (newImages.length === acceptedFiles.length) {
//               const updatedImages = [...images, ...newImages]
//               setImages(updatedImages)
//               onImagesChange(updatedImages)
//               setUploading(false)
//             }
//           }
//           reader.readAsDataURL(file)
//         } catch (error) {
//           toast({
//             title: "Upload failed",
//             description: "Failed to upload image",
//             variant: "destructive",
//           })
//         }
//       }
//     },
//     [images, maxImages, onImagesChange, toast],
//   )

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       "image/*": [".jpeg", ".jpg", ".png", ".webp"],
//     },
//     maxSize: 5 * 1024 * 1024, // 5MB
//     disabled: uploading || images.length >= maxImages,
//   })

//   const removeImage = (index: number) => {
//     const updatedImages = images.filter((_, i) => i !== index)
//     setImages(updatedImages)
//     onImagesChange(updatedImages)
//   }

//   return (
//     <div className="space-y-4">
//       {/* Upload Area */}
//       <div
//         {...getRootProps()}
//         className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
//           isDragActive ? "border-purple-400 bg-purple-400/10" : "border-white/20 hover:border-white/40"
//         } ${uploading || images.length >= maxImages ? "opacity-50 cursor-not-allowed" : ""}`}
//       >
//         <input {...getInputProps()} />
//         <div className="flex flex-col items-center gap-2">
//           <Upload className="h-8 w-8 text-gray-400" />
//           {uploading ? (
//             <p className="text-white">Uploading...</p>
//           ) : isDragActive ? (
//             <p className="text-white">Drop the images here...</p>
//           ) : (
//             <>
//               <p className="text-white">Drag & drop images here, or click to select</p>
//               <p className="text-sm text-gray-400">
//                 PNG, JPG, WEBP up to 5MB ({images.length}/{maxImages} images)
//               </p>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Image Previews */}
//       {images.length > 0 && (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//           {images.map((image, index) => (
//             <div key={index} className="relative group">
//               <img
//                 src={image || "/placeholder.svg"}
//                 alt={`Upload ${index + 1}`}
//                 className="w-full h-24 object-cover rounded-lg border border-white/20"
//               />
//               <Button
//                 type="button"
//                 size="sm"
//                 variant="destructive"
//                 className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
//                 onClick={() => removeImage(index)}
//               >
//                 <X className="h-3 w-3" />
//               </Button>
//             </div>
//           ))}
//         </div>
//       )}

//       {images.length === 0 && (
//         <div className="text-center py-8 border border-dashed border-white/20 rounded-lg">
//           <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
//           <p className="text-gray-400">No images uploaded yet</p>
//         </div>
//       )}
//     </div>
//   )
// }








// // "use client"

// // import { useState, useCallback, useEffect } from "react"
// // import { useDropzone } from "react-dropzone"
// // import { Button } from "@/components/ui/button"
// // import { X, Upload, ImageIcon } from "lucide-react"
// // import { useToast } from "@/hooks/use-toast"

// // interface ImageUploadProps {
// //   onImagesChange: (images: string[]) => void
// //   initialImages?: string[]
// //   maxImages?: number
// // }

// // export function ImageUpload({ onImagesChange, initialImages = [], maxImages = 5 }: ImageUploadProps) {
// //   const [images, setImages] = useState<string[]>(initialImages)
// //   const [uploading, setUploading] = useState(false)
// //   const { toast } = useToast()

// //   // Update images when initialImages change (for edit mode)
// //   useEffect(() => {
// //     setImages(initialImages)
// //   }, [initialImages])

// //   // Notify parent when images change
// //   useEffect(() => {
// //     onImagesChange(images)
// //   }, [images, onImagesChange])

// //   const onDrop = useCallback(
// //     async (acceptedFiles: File[]) => {
// //       if (images.length + acceptedFiles.length > maxImages) {
// //         toast({
// //           title: "Too many images",
// //           description: `You can only upload up to ${maxImages} images`,
// //           variant: "destructive",
// //         })
// //         return
// //       }

// //       setUploading(true)
// //       const newImages: string[] = []

// //       for (const file of acceptedFiles) {
// //         try {
// //           // Convert file to base64 for preview
// //           const reader = new FileReader()
// //           reader.onload = () => {
// //             const base64 = reader.result as string
// //             newImages.push(base64)

// //             if (newImages.length === acceptedFiles.length) {
// //               const updatedImages = [...images, ...newImages]
// //               setImages(updatedImages)
// //               setUploading(false)
// //             }
// //           }
// //           reader.readAsDataURL(file)
// //         } catch (error) {
// //           toast({
// //             title: "Upload failed",
// //             description: "Failed to upload image",
// //             variant: "destructive",
// //           })
// //           setUploading(false)
// //         }
// //       }
// //     },
// //     [images, maxImages, toast],
// //   )

// //   const { getRootProps, getInputProps, isDragActive } = useDropzone({
// //     onDrop,
// //     accept: {
// //       "image/*": [".jpeg", ".jpg", ".png", ".webp"],
// //     },
// //     maxSize: 5 * 1024 * 1024, // 5MB
// //     disabled: uploading || images.length >= maxImages,
// //   })

// //   const removeImage = (index: number) => {
// //     setImages((prev) => prev.filter((_, i) => i !== index))
// //   }

// //   return (
// //     <div className="space-y-4">
// //       {/* Upload Area */}
// //       <div
// //         {...getRootProps()}
// //         className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
// //           isDragActive ? "border-purple-400 bg-purple-400/10" : "border-white/20 hover:border-white/40"
// //         } ${uploading || images.length >= maxImages ? "opacity-50 cursor-not-allowed" : ""}`}
// //       >
// //         <input {...getInputProps()} />
// //         <div className="flex flex-col items-center gap-2">
// //           <Upload className="h-8 w-8 text-gray-400" />
// //           {uploading ? (
// //             <p className="text-white">Uploading...</p>
// //           ) : isDragActive ? (
// //             <p className="text-white">Drop the images here...</p>
// //           ) : (
// //             <>
// //               <p className="text-white">Drag & drop images here, or click to select</p>
// //               <p className="text-sm text-gray-400">
// //                 PNG, JPG, WEBP up to 5MB ({images.length}/{maxImages} images)
// //               </p>
// //             </>
// //           )}
// //         </div>
// //       </div>

// //       {/* Image Previews */}
// //       {images.length > 0 && (
// //         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
// //           {images.map((image, index) => (
// //             <div key={index} className="relative group">
// //               <img
// //                 src={image || "/placeholder.svg"}
// //                 alt={`Upload ${index + 1}`}
// //                 className="w-full h-24 object-cover rounded-lg border border-white/20"
// //               />
// //               <Button
// //                 type="button"
// //                 size="sm"
// //                 variant="destructive"
// //                 className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
// //                 onClick={() => removeImage(index)}
// //               >
// //                 <X className="h-3 w-3" />
// //               </Button>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {/* Empty State */}
// //       {images.length === 0 && (
// //         <div className="text-center py-8 border border-dashed border-white/20 rounded-lg">
// //           <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
// //           <p className="text-gray-400">No images uploaded yet</p>
// //           <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }




"use client"

import { useState, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { X, Upload, ImageIcon, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"

interface ImageUploadProps {
  onImagesChange: (images: string[]) => void
  initialImages?: string[]
  maxImages?: number
}

export function ImageUpload({ onImagesChange, initialImages = [], maxImages = 5 }: ImageUploadProps) {
  const [images, setImages] = useState<string[]>(initialImages)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<string>("")
  const { toast } = useToast()
  const { theme } = useTheme()

  // Add this after the useState declarations
  useEffect(() => {
    if (initialImages.length > 0) {
      setImages(initialImages)
    }
  }, [initialImages])

  // Update images when initialImages change (for edit mode)
  useEffect(() => {
    setImages(initialImages)
  }, [initialImages])

  // Notify parent when images change
  useEffect(() => {
    onImagesChange(images)
  }, [images, onImagesChange])

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (images.length + acceptedFiles.length > maxImages) {
        toast({
          title: "Too many images",
          description: `You can only upload up to ${maxImages} images`,
          variant: "destructive",
        })
        return
      }

      setUploading(true)

      try {
        // Create FormData for file upload
        const formData = new FormData()
        acceptedFiles.forEach((file) => {
          formData.append("images", file)
        })

     
        // Upload to server
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        const result = await response.json()

        if (response.ok && result.success) {
          const updatedImages = [...images, ...result.images]
          setImages(updatedImages)
          onImagesChange(updatedImages)

          toast({
            title: "Upload successful! 🎉",
            description: `${result.images.length} images uploaded`,
          })

        } else {
          throw new Error(result.error || "Upload failed")
        }
      } catch (error) {
        console.error("❌ Upload error:", error)
        toast({
          title: "Upload failed",
          description: error instanceof Error ? error.message : "Failed to upload images",
          variant: "destructive",
        })
      } finally {
        setUploading(false)
      }
    },
    [images, maxImages, onImagesChange, toast],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    disabled: uploading || images.length >= maxImages,
  })

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
    toast({
      title: "Image removed",
      description: "Image has been removed from your listing",
    })
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
          isDragActive
            ? "border-purple-400 bg-purple-400/10 scale-105"
            : theme === "dark"
              ? "border-white/20 hover:border-purple-400/50 hover:bg-purple-400/5"
              : "border-gray-300 hover:border-purple-400 hover:bg-purple-50"
        } ${uploading || images.length >= maxImages ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          {uploading ? (
            <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
          ) : (
            <Upload className={`h-8 w-8 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
          )}

          {uploading ? (
            <div className="text-center">
              <p className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-800"}`}>Uploading...</p>
              <p className={`text-sm ${theme === "dark" ? "text-purple-300" : "text-purple-600"}`}>{uploadProgress}</p>
            </div>
          ) : isDragActive ? (
            <p className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
              Drop the images here! 📸
            </p>
          ) : (
            <div className="text-center">
              <p className={`font-medium mb-1 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                Drag & drop images here, or click to select
              </p>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                PNG, JPG, WEBP up to 5MB ({images.length}/{maxImages} images)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="relative overflow-hidden rounded-lg border-2 border-white/20 hover:border-purple-400/50 transition-all duration-300">
                <img
                  src={image || "/placeholder.svg?height=100&width=100"}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    console.error("Image load error:", image)
                    e.currentTarget.src = "/placeholder.svg?height=100&width=100"
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              </div>

              <Button
                type="button"
                size="sm"
                variant="destructive"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg"
                onClick={() => removeImage(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && !uploading && (
        <div
          className={`text-center py-8 border border-dashed rounded-xl transition-all duration-300 ${
            theme === "dark" ? "border-white/20 hover:border-purple-400/30" : "border-gray-300 hover:border-purple-400"
          }`}
        >
          <ImageIcon className={`h-12 w-12 mx-auto mb-3 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
          <p className={`font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            No images uploaded yet
          </p>
          <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
            Your book photos will appear here
          </p>
        </div>
      )}

      {/* Upload Status */}
      {images.length > 0 && (
        <div className={`text-center text-sm ${theme === "dark" ? "text-purple-300" : "text-purple-600"}`}>
          ✅ {images.length} image{images.length !== 1 ? "s" : ""} ready for upload
        </div>
      )}
    </div>
  )
}

