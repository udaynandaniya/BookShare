





"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUpload } from "@/components/image-upload"
import { useToast } from "@/hooks/use-toast"
import { BookOpen, DollarSign, AlertCircle, CheckCircle } from "lucide-react"
import { useSession } from "../context/SessionContext"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { useTheme } from "next-themes"

const MySwal = withReactContent(Swal)

export default function SellPage() {
  const { user } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const { theme } = useTheme()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<string[]>([])

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

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])

  // Check authentication on mount
  useEffect(() => {
    if (!user) {
      MySwal.fire({
        title: "Authentication Required",
        text: "Please log in to sell books",
        icon: "warning",
        background: theme === "dark" ? "#1e1b4b" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#1f2937",
        showCancelButton: true,
        confirmButtonText: "Login Now",
        cancelButtonText: "Go Back",
        customClass: {
          popup: "rounded-xl shadow-2xl",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login")
        } else {
          router.push("/")
        }
      })
    }
  }, [user, router, theme])

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="max-w-md mx-auto bg-black/40 backdrop-blur-md border-white/10 p-8">
          <div className="text-center">
            <BookOpen className="h-16 w-16 text-purple-400 mx-auto mb-4" />
            <p className="text-gray-300 mb-6">Please log in to sell books</p>
            <Button onClick={() => router.push("/login")} className="bg-purple-600 hover:bg-purple-700">
              Login Now
            </Button>
          </div>
        </Card>
      </div>
    )
  }

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
    if (!formData.location.trim()) errors.push("Location is required")
    if (images.length === 0) errors.push("Please upload at least one image")
    if (images.length > 5) errors.push("Maximum 5 images allowed")
    if (formData.quantity === "some" && selectedSubjects.length === 0) {
      errors.push("Please select at least one subject for specific books")
    }

    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

   

    // Validate form
    const validationErrors = validateForm()
    if (validationErrors.length > 0) {
      MySwal.fire({
        title: "Validation Error!",
        html: validationErrors.map((error) => `• ${error}`).join("<br>"),
        icon: "error",
        background: theme === "dark" ? "#1e1b4b" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#1f2937",
        customClass: {
          popup: "rounded-xl shadow-2xl",
        },
      })
      return
    }

    setLoading(true)

    try {
      // Prepare payload to match your Book model exactly
      const payload = {
        title: formData.title.trim(),
        standard: formData.standard,
        condition: formData.condition,
        price: Number(formData.price),
        description: formData.description.trim(),
        location: formData.location.trim(),
        images: images, // This should contain the uploaded image URLs/base64
        quantity: formData.quantity,
        specificBooks: formData.quantity === "some" ? selectedSubjects : [], // Match your Book model field name
      }

  

      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for cookies
        body: JSON.stringify(payload),
      })


      const result = await response.json()

      if (response.ok) {
        // Success
        MySwal.fire({
          title: "Success! 🎉",
          text: "Your book has been listed successfully!",
          icon: "success",
          background: theme === "dark" ? "#1e1b4b" : "#ffffff",
          color: theme === "dark" ? "#ffffff" : "#1f2937",
          timer: 3000,
          showConfirmButton: false,
          customClass: {
            popup: "rounded-xl shadow-2xl",
          },
        }).then(() => {
          // Redirect to dashboard or book listing
          router.push("/dashboard/user")
        })

        // Also show toast
        toast({
          title: "Book Listed Successfully! 📚",
          description: "Your book is now available for sale",
        })
      } else {
        // Error from server
        console.error("❌ Server error:", result)

        let errorMessage = result.error || "Failed to list book"
        if (result.details && Array.isArray(result.details)) {
          errorMessage += "\n\nDetails:\n" + result.details.join("\n")
        }

        MySwal.fire({
          title: "Failed to List Book",
          text: errorMessage,
          icon: "error",
          background: theme === "dark" ? "#1e1b4b" : "#ffffff",
          color: theme === "dark" ? "#ffffff" : "#1f2937",
          customClass: {
            popup: "rounded-xl shadow-2xl",
          },
        })
      }
    } catch (error) {
      console.error("❌ Network error:", error)

      MySwal.fire({
        title: "Network Error",
        text: "Failed to connect to server. Please check your internet connection and try again.",
        icon: "error",
        background: theme === "dark" ? "#1e1b4b" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#1f2937",
        customClass: {
          popup: "rounded-xl shadow-2xl",
        },
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-black/40 backdrop-blur-md border-white/10">
            <CardHeader className="text-center">
              <DollarSign className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <CardTitle className="text-2xl text-white">Sell Your Navneet Book</CardTitle>
              <p className="text-gray-300">Fill in details to list your book</p>
              <div className="text-sm text-purple-300 mt-2 flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Contact info will be taken from your profile automatically
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-white">
                    Book Title *
                  </Label>
                  <Input
                    id="title"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="Enter book title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                {/* Standard & Condition Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Standard *</Label>
                    <select
                      className="w-full bg-white/10 border-white/20 text-white p-3 rounded-md border"
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

                  <div className="space-y-2">
                    <Label className="text-white">Condition *</Label>
                    <select
                      className="w-full bg-white/10 border-white/20 text-white p-3 rounded-md border"
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

                {/* Price & Location Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-white">
                      Price (₹) *
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      min="1"
                      max="100000"
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      placeholder="Enter price"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-white">
                      Location *
                    </Label>
                    <Input
                      id="location"
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      placeholder="Enter your city/area"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="Describe your book's condition, included items, etc."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                  />
                </div>

                {/* <div className="space-y-3">
                  <Label className="text-white">How many books? *</Label>
                  <div className="flex gap-6">
                    <label className="inline-flex items-center text-white cursor-pointer">
                      <input
                        type="radio"
                        value="all"
                        name="quantity"
                        checked={formData.quantity === "all"}
                        onChange={() => setFormData({ ...formData, quantity: "all" })}
                        className="mr-2"
                      />
                      <span>All subjects</span>
                    </label>
                    <label className="inline-flex items-center text-white cursor-pointer">
                      <input
                        type="radio"
                        value="some"
                        name="quantity"
                        checked={formData.quantity === "some"}
                        onChange={() => setFormData({ ...formData, quantity: "some" })}
                        className="mr-2"
                      />
                      <span>Specific subjects</span>
                    </label>
                  </div>
                </div>

                {formData.quantity === "some" && (
                  <div className="space-y-3 border border-white/20 rounded-lg p-4 bg-white/5">
                    <Label className="text-white flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Select specific subjects:
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      {subjects.map((sub) => (
                        <label key={sub} className="inline-flex items-center text-white cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedSubjects.includes(sub)}
                            onChange={() => handleSubjectToggle(sub)}
                            className="mr-2"
                          />
                          <span className="text-sm">{sub}</span>
                        </label>
                      ))}
                    </div>
                    {selectedSubjects.length > 0 && (
                      <div className="text-sm text-green-300 mt-2">✅ Selected: {selectedSubjects.join(", ")}</div>
                    )}
                  </div>
                )} */}

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label className="text-white">Upload Images * (1-5 images)</Label>
                  <ImageUpload onImagesChange={setImages} initialImages={images} maxImages={5} />
                  <p className="text-xs text-gray-400">
                    📸 Upload clear photos of your book cover, pages, and any damage
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-12 text-lg font-semibold"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Listing Book...
                    </div>
                  ) : (
                    "List Book for Sale 🚀"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
