// //C:\Users\UDAYN\Downloads\navneethub\app\edit-book\[id]\page.tsx


// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { Header } from "@/components/header"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ImageUpload } from "@/components/image-upload"
// import { useSession } from "@/components/session-provider"
// import { useToast } from "@/hooks/use-toast"
// import { Edit, Save } from "lucide-react"

// interface Book {
//   _id: string
//   title: string
//   author: string
//   subject: string
//   standard: string
//   condition: string
//   price: number
//   description: string
//   location: string
//   contactNumber: string
//   images: string[]
//   sellerId: string
// }

// export default function EditBookPage({ params }: { params: { id: string } }) {
//   const { user } = useSession()
//   const router = useRouter()
//   const { toast } = useToast()
//   const [loading, setLoading] = useState(false)
//   const [book, setBook] = useState<Book | null>(null)
//   const [images, setImages] = useState<string[]>([])
//   const [formData, setFormData] = useState({
//     title: "",
//     author: "",
//     subject: "",
//     standard: "",
//     condition: "",
//     price: "",
//     description: "",
//     location: "",
//     contactNumber: "",
//   })

//   const standards = [
//     "1st Standard",
//     "2nd Standard",
//     "3rd Standard",
//     "4th Standard",
//     "5th Standard",
//     "6th Standard",
//     "7th Standard",
//     "8th Standard",
//     "9th Standard",
//     "10th Standard",
//     "11th Standard",
//     "12th Standard",
//   ]

//   const subjects = [
//     "Mathematics",
//     "Science",
//     "English",
//     "Hindi",
//     "Social Studies",
//     "Physics",
//     "Chemistry",
//     "Biology",
//     "History",
//     "Geography",
//     "Economics",
//     "Computer Science",
//   ]

//   const conditions = [
//     { value: "excellent", label: "Excellent - Like new" },
//     { value: "good", label: "Good - Minor wear" },
//     { value: "fair", label: "Fair - Some wear" },
//     { value: "poor", label: "Poor - Heavy wear" },
//   ]

//   useEffect(() => {
//     if (!user) {
//       router.push("/login")
//       return
//     }
//     fetchBook()
//   }, [user, router, params.id])

//   const fetchBook = async () => {
//     try {
//       const response = await fetch(`/api/books/${params.id}`)
//       if (response.ok) {
//         const bookData = await response.json()

//         // Check if user owns this book
//         if (bookData.sellerId !== user?.id) {
//           toast({
//             title: "Access denied",
//             description: "You can only edit your own books",
//             variant: "destructive",
//           })
//           router.push("/dashboard")
//           return
//         }

//         setBook(bookData)
//         setImages(bookData.images || [])
//         setFormData({
//           title: bookData.title,
//           author: bookData.author,
//           subject: bookData.subject,
//           standard: bookData.standard,
//           condition: bookData.condition,
//           price: bookData.price.toString(),
//           description: bookData.description || "",
//           location: bookData.location,
//           contactNumber: bookData.contactNumber,
//         })
//       } else {
//         throw new Error("Book not found")
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to fetch book details",
//         variant: "destructive",
//       })
//       router.push("/dashboard")
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const response = await fetch(`/api/books/${params.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...formData,
//           price: Number.parseFloat(formData.price),
//           images,
//         }),
//       })

//       if (response.ok) {
//         toast({
//           title: "Book updated successfully!",
//           description: "Your book listing has been updated",
//         })
//         router.push("/dashboard")
//       } else {
//         throw new Error("Failed to update book")
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to update book. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (!user || !book) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//         <Header />
//         <div className="container mx-auto px-4 py-16 text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto"></div>
//           <p className="text-white mt-4">Loading...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//       <Header />

//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-2xl mx-auto">
//           <Card className="bg-black/40 backdrop-blur-md border-white/10">
//             <CardHeader className="text-center">
//               <div className="flex justify-center mb-4">
//                 <Edit className="h-12 w-12 text-blue-400" />
//               </div>
//               <CardTitle className="text-2xl text-white">Edit Book</CardTitle>
//               <p className="text-gray-300">Update your book listing details</p>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="title" className="text-white">
//                       Book Title *
//                     </Label>
//                     <Input
//                       id="title"
//                       value={formData.title}
//                       onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                       className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
//                       required
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="author" className="text-white">
//                       Author *
//                     </Label>
//                     <Input
//                       id="author"
//                       value={formData.author}
//                       onChange={(e) => setFormData({ ...formData, author: e.target.value })}
//                       className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label className="text-white">Standard *</Label>
//                     <Select
//                       value={formData.standard}
//                       onValueChange={(value) => setFormData({ ...formData, standard: value })}
//                     >
//                       <SelectTrigger className="bg-white/10 border-white/20 text-white">
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent className="bg-slate-900 border-slate-700">
//                         {standards.map((std) => (
//                           <SelectItem key={std} value={std} className="text-white hover:bg-slate-800">
//                             {std}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div className="space-y-2">
//                     <Label className="text-white">Subject *</Label>
//                     <Select
//                       value={formData.subject}
//                       onValueChange={(value) => setFormData({ ...formData, subject: value })}
//                     >
//                       <SelectTrigger className="bg-white/10 border-white/20 text-white">
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent className="bg-slate-900 border-slate-700">
//                         {subjects.map((subject) => (
//                           <SelectItem key={subject} value={subject} className="text-white hover:bg-slate-800">
//                             {subject}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label className="text-white">Condition *</Label>
//                     <Select
//                       value={formData.condition}
//                       onValueChange={(value) => setFormData({ ...formData, condition: value })}
//                     >
//                       <SelectTrigger className="bg-white/10 border-white/20 text-white">
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent className="bg-slate-900 border-slate-700">
//                         {conditions.map((condition) => (
//                           <SelectItem
//                             key={condition.value}
//                             value={condition.value}
//                             className="text-white hover:bg-slate-800"
//                           >
//                             {condition.label}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="price" className="text-white">
//                       Price (₹) *
//                     </Label>
//                     <Input
//                       id="price"
//                       type="number"
//                       value={formData.price}
//                       onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                       className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="description" className="text-white">
//                     Description
//                   </Label>
//                   <Textarea
//                     id="description"
//                     value={formData.description}
//                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                     className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
//                     rows={4}
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="location" className="text-white">
//                       Location *
//                     </Label>
//                     <Input
//                       id="location"
//                       value={formData.location}
//                       onChange={(e) => setFormData({ ...formData, location: e.target.value })}
//                       className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
//                       required
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="contact" className="text-white">
//                       Contact Number *
//                     </Label>
//                     <Input
//                       id="contact"
//                       type="tel"
//                       value={formData.contactNumber}
//                       onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
//                       className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label className="text-white">Book Images</Label>
//                   <ImageUpload onImagesChange={setImages} initialImages={images} />
//                 </div>

//                 <div className="flex gap-4">
//                   <Button type="submit" className="flex-1 animated-border-button" disabled={loading}>
//                     <Save className="mr-2 h-4 w-4" />
//                     {loading ? "Updating..." : "Update Book"}
//                   </Button>
//                   <Button
//                     type="button"
//                     variant="outline"
//                     className="border-white/20 text-white hover:bg-white/10"
//                     onClick={() => router.push("/dashboard")}
//                   >
//                     Cancel
//                   </Button>
//                 </div>
//               </form>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }
