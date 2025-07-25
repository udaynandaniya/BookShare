

"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUpload } from "@/components/image-upload"
import { useTheme } from "next-themes"
import { useSession } from "@/app/context/SessionContext"
import { Edit, X, Save, AlertCircle, User, Shield } from "lucide-react"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)

interface BookEditDialogProps {
  book: any
  isOpen: boolean
  onClose: () => void
  onSave: (updatedBook: any) => void
}

export function BookEditDialog({ book, isOpen, onClose, onSave }: BookEditDialogProps) {
  const { theme } = useTheme()
  const { user } = useSession() // Get user from your session context
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])

  const standards = [
    "1st Standard",
    "2nd Standard",
    "3rd Standard",
    "4th Standard",
    "5th Standard",
    "6th Standard",
    "7th Standard",
    "8th Standard",
    "9th Standard",
    "10th Standard",
    "11th Standard",
    "12th Standard",
  ]

  const subjects = [
    "Mathematics",
    "Science",
    "English",
    "Hindi",
    "Social Studies",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
    "Geography",
    "Economics",
    "Computer Science",
  ]

  const conditions = [
    { value: "excellent", label: "Excellent – Like new" },
    { value: "good", label: "Good – Minor wear" },
    { value: "fair", label: "Fair – Some wear" },
    { value: "poor", label: "Poor – Heavy wear" },
  ]

  const [formData, setFormData] = useState({
    title: "",
    standard: "",
    condition: "",
    price: "",
    description: "",
    location: "",
    quantity: "all" as "all" | "some",
  })

  // Pre-fill form when book changes
  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        standard: book.standard || "",
        condition: book.condition || "",
        price: book.price?.toString() || "",
        description: book.description || "",
        location: book.location || "",
        quantity: book.quantity || "all",
      })
      setImages(book.images || [])
      // Handle both field names for backward compatibility
      setSelectedSubjects(book.specificSubjects || book.specificBooks || [])
    }
  }, [book])

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects((prev) => (prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]))
  }

  const validateForm = () => {
    const errors = []

    if (!formData.title.trim()) errors.push("Book title is required")
    if (!formData.standard) errors.push("Please select a standard")
    if (!formData.condition) errors.push("Please select book condition")
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      errors.push("Please enter a valid price")
    }
    if (Number(formData.price) > 100000) {
      errors.push("Price cannot exceed ₹1,00,000")
    }
    if (!formData.location.trim()) errors.push("Location is required")
    if (images.length === 0) errors.push("Please upload at least one image")
    if (images.length > 5) errors.push("Maximum 5 images allowed")
    if (formData.quantity === "some" && selectedSubjects.length === 0) {
      errors.push("Please select at least one subject for specific books")
    }

    return errors
  }

  const handleSave = async () => {
    try {
   

      // Basic user check (since auth is handled at card level)
      if (!user) {
        MySwal.fire({
          title: "Authentication Required!",
          text: "Please log in to edit books",
          icon: "warning",
          background: theme === "dark" ? "#1e1b4b" : "#ffffff",
          color: theme === "dark" ? "#ffffff" : "#1f2937",
          customClass: { popup: "rounded-xl" },
        })
        return
      }

      // Validate form
      const validationErrors = validateForm()
      if (validationErrors.length > 0) {
        MySwal.fire({
          title: "Validation Error!",
          html: validationErrors.map((error) => `• ${error}`).join("<br>"),
          icon: "error",
          background: theme === "dark" ? "#1e1b4b" : "#ffffff",
          color: theme === "dark" ? "#ffffff" : "#1f2937",
          customClass: { popup: "rounded-xl" },
        })
        return
      }

      setLoading(true)

      // Prepare update data to match your Book model exactly
      const updateData = {
        title: formData.title.trim(),
        standard: formData.standard,
        condition: formData.condition,
        price: Number(formData.price),
        description: formData.description.trim(),
        location: formData.location.trim(),
        images: images,
        quantity: formData.quantity,
        // Use specificBooks to match your Book model
        specificBooks: formData.quantity === "some" ? selectedSubjects : [],
      }

     
      const response = await fetch(`/api/books/${book._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // This sends your auth-token cookie
        body: JSON.stringify(updateData),
      })

      let result
      try {
        result = await response.json()
      } catch (error) {
        console.error("❌ Failed to parse response JSON:", error)
        throw new Error("Server returned invalid response")
      }

      if (response.ok) {
        MySwal.fire({
          title: "Success! 🎉",
          text: "Book updated successfully",
          icon: "success",
          background: theme === "dark" ? "#1e1b4b" : "#ffffff",
          color: theme === "dark" ? "#ffffff" : "#1f2937",
          timer: 2000,
          showConfirmButton: false,
          customClass: { popup: "rounded-xl" },
        })

        // Log the successful update
       
        onSave(result.book)
        onClose()
      } else {
        console.error("❌ API Error:", result)

        let errorMessage = result.error || "Failed to update book"

        if (response.status === 401) {
          errorMessage = "Session expired. Please log in again."
        } else if (response.status === 403) {
          errorMessage = "You don't have permission to edit this book."
        } else if (response.status === 404) {
          errorMessage = "Book not found. It may have been deleted."
        } else if (response.status === 400 && result.details) {
          errorMessage = Array.isArray(result.details) ? result.details.join(", ") : result.details
        }

        MySwal.fire({
          title: "Update Failed!",
          text: errorMessage,
          icon: "error",
          background: theme === "dark" ? "#1e1b4b" : "#ffffff",
          color: theme === "dark" ? "#ffffff" : "#1f2937",
          customClass: { popup: "rounded-xl" },
        })
      }
    } catch (error) {
      console.error("❌ Error updating book:", error)
      MySwal.fire({
        title: "Network Error!",
        text: error instanceof Error ? error.message : "Failed to connect to server",
        icon: "error",
        background: theme === "dark" ? "#1e1b4b" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#1f2937",
        customClass: { popup: "rounded-xl" },
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[95vh] overflow-hidden p-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border border-white/20 rounded-2xl">
        <div className="flex flex-col h-full max-h-[95vh]">
          {/* Header - Fixed */}
          <div className="flex-shrink-0 p-6 pb-4">
            <Card className="bg-black/40 backdrop-blur-md border-white/10">
              <CardHeader className="text-center pb-4">
                <DialogHeader>
                  <DialogTitle asChild>
                    <div className="text-center">
                      <Edit className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                      <CardTitle className="text-2xl sm:text-3xl text-white mb-2">Edit Your Book</CardTitle>
                      <p className="text-gray-300 text-base">Update your book details</p>
                    </div>
                  </DialogTitle>
                </DialogHeader>

                {/* User Status Indicator */}
                <div className="flex items-center justify-center gap-2 text-sm mt-4">
                  {user ? (
                    <div className="text-green-300 flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
                      {user.isAdmin ? (
                        <>
                          <Shield className="w-5 h-5" />
                          <span className="font-medium">Admin: {user.fullName}</span>
                        </>
                      ) : (
                        <>
                          <User className="w-5 h-5" />
                          <span className="font-medium">User: {user.fullName}</span>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="text-red-300 flex items-center gap-2 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20">
                      <AlertCircle className="w-5 h-5" />
                      <span className="font-medium">Not authenticated</span>
                    </div>
                  )}
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-transparent px-6">
            <Card className="bg-black/40 backdrop-blur-md border-white/10">
              <CardContent className="p-6 space-y-8">
                {/* Title */}
                <div className="space-y-3">
                  <Label htmlFor="title" className="text-white text-base font-medium">
                    Book Title *
                  </Label>
                  <Input
                    id="title"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 text-base rounded-xl focus:ring-2 focus:ring-purple-400 transition-all"
                    placeholder="Enter book title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                {/* Standard & Condition */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-white text-base font-medium">Standard *</Label>
                    <select
                      className="w-full bg-white/10 border-white/20 text-white p-3 rounded-xl text-base h-12 border focus:ring-2 focus:ring-purple-400 transition-all"
                      value={formData.standard}
                      onChange={(e) => setFormData({ ...formData, standard: e.target.value })}
                      required
                    >
                      <option value="" disabled className="text-gray-400">
                        Select standard
                      </option>
                      {standards.map((std) => (
                        <option key={std} value={std} className="text-black">
                          {std}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white text-base font-medium">Condition *</Label>
                    <select
                      className="w-full bg-white/10 border-white/20 text-white p-3 rounded-xl text-base h-12 border focus:ring-2 focus:ring-purple-400 transition-all"
                      value={formData.condition}
                      onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                      required
                    >
                      <option value="" disabled className="text-gray-400">
                        Select condition
                      </option>
                      {conditions.map((c) => (
                        <option key={c.value} value={c.value} className="text-black">
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price & Location */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="price" className="text-white text-base font-medium">
                      Price (₹) *
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      min="1"
                      max="100000"
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 text-base rounded-xl focus:ring-2 focus:ring-purple-400 transition-all"
                      placeholder="Enter price"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="location" className="text-white text-base font-medium">
                      Location *
                    </Label>
                    <Input
                      id="location"
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 text-base rounded-xl focus:ring-2 focus:ring-purple-400 transition-all"
                      placeholder="Enter your city/area"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <Label htmlFor="description" className="text-white text-base font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-base rounded-xl focus:ring-2 focus:ring-purple-400 transition-all resize-none"
                    placeholder="Describe your book's condition, included items, etc..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                  />
                </div>

                {/* Image Upload - No Scroll, Full Space */}
                <div className="space-y-4">
                  <Label className="text-white text-base font-medium">Update Images * (1-5 images)</Label>
                  <div className="w-full">
                    <ImageUpload onImagesChange={setImages} initialImages={images} maxImages={5} />
                  </div>
                  <p className="text-sm text-gray-400 flex items-center gap-2">
                    📸 Upload clear photos of your book cover, pages, and any damage
                  </p>
                </div>

                {/* Extra spacing at bottom */}
                <div className="h-6"></div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons - Fixed at Bottom */}
          <div className="flex-shrink-0 p-6 pt-4">
            <Card className="bg-black/40 backdrop-blur-md border-white/10">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white h-12 text-base font-medium rounded-xl transition-all hover:scale-105"
                  >
                    <X className="w-5 h-5 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSave}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-12 text-base font-medium rounded-xl transition-all hover:scale-105"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Saving...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Save className="w-5 h-5 mr-2" />
                        Save Changes
                      </div>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
