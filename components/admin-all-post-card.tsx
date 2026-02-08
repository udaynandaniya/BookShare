"use client"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, MapPin, Eye, Share2, User, Phone, MessageCircle, Shield, AlertTriangle } from "lucide-react"
import { useTheme } from "next-themes"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)

interface AdminAllPostCardProps {
  book: any
  onEdit: (book: any) => void
  onAdminDelete: (book: any) => void
  onView: (book: any) => void
}

export function AdminAllPostCard({ book, onEdit, onAdminDelete, onView }: AdminAllPostCardProps) {
  const { theme } = useTheme()

  const handleAdminDelete = async () => {
    const result = await MySwal.fire({
      title: "Admin Delete - User's Book",
      html: `
        <div class="text-left space-y-3">
          <p><strong>Book:</strong> ${book.title}</p>
          <p><strong>Owner:</strong> ${book.sellerName}</p>
          <p><strong>Email:</strong> ${book.sellerEmail}</p>
          <div class="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-lg border border-yellow-300 dark:border-yellow-700">
            <p class="text-sm text-yellow-800 dark:text-yellow-200">
              ⚠️ This will delete the user's book and send them an email notification with your reason.
            </p>
          </div>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Proceed to Delete",
      cancelButtonText: "Cancel",
      background: theme === "dark" ? "#1e1b4b" : "#ffffff",
      color: theme === "dark" ? "#ffffff" : "#1f2937",
      customClass: {
        popup: "rounded-xl shadow-2xl max-w-md",
        confirmButton: "rounded-lg px-6 py-2 font-semibold",
        cancelButton: "rounded-lg px-6 py-2 font-semibold",
      },
    })

    if (result.isConfirmed) {
      onAdminDelete(book)
    }
  }

  const handleShare = async () => {
    const currentDomain = typeof window !== "undefined" ? window.location.origin : ""
    const bookUrl = `${currentDomain}/book/${book._id}`

    const shareData = {
      title: `${book.title} - BookShareApp`,
      text: `Check out this ${book.standard} book for ₹${book.price} on BookShareApp! 📚

Book: ${book.title}
Standard: ${book.standard}
Condition: ${book.condition}
Price: ₹${book.price}
Location: ${book.location}
Seller: ${book.sellerName}`,
      url: bookUrl,
    }

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
        return
      } catch (err) {
      }
    }

    try {
      const shareText = `📚 ${shareData.title}\n\n${shareData.text}\n\n🔗 ${shareData.url}`
      await navigator.clipboard.writeText(shareText)

      MySwal.fire({
        title: "Link Copied! 📋",
        text: "Book details copied to clipboard!",
        icon: "success",
        background: theme === "dark" ? "#1e1b4b" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#1f2937",
        timer: 2000,
        showConfirmButton: false,
        customClass: {
          popup: "rounded-xl shadow-2xl",
        },
      })
    } catch (err) {
      console.error("Clipboard copy failed:", err)
    }
  }

  const handleContact = (type: "call" | "whatsapp") => {
    const number = book.seller?.mobile || book.seller?.whatsappNumber || book.sellerContact
    if (!number) {
      MySwal.fire({
        title: "Contact Info Not Available",
        text: "Seller's contact information is not available",
        icon: "info",
        background: theme === "dark" ? "#1e1b4b" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#1f2937",
        customClass: {
          popup: "rounded-xl shadow-2xl",
        },
      })
      return
    }

    if (type === "call") {
      const formatted = number.replace(/[^0-9]/g, "")
      window.location.href = `tel:+91${formatted}`
    } else {
      const formatted = number.replace(/[^0-9]/g, "")
      const message = encodeURIComponent(
        `Hi! I'm interested in your book "${book.title}" (${book.standard}) listed for ₹${book.price} on BookShareApp.`,
      )
      window.open(`https://wa.me/91${formatted}?text=${message}`, "_blank")
    }
  }

  const openLocation = () => {
    const location = book.location
    if (location) {
      const encodedLocation = encodeURIComponent(location)
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, "_blank")
    }
  }

  return (
    <Card
      onClick={() => onView(book)}
      className={`group relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl cursor-pointer ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-800/90 via-purple-900/20 to-slate-800/90 border-purple-500/30 hover:border-purple-400/50 shadow-purple-500/10"
          : "bg-gradient-to-br from-white via-purple-50/30 to-white border-purple-200/50 hover:border-purple-300/70 shadow-purple-500/5"
      } backdrop-blur-sm`}
    >
      <CardContent className="p-0">
        {/* Image Section */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={book.images?.[0] || "/placeholder.svg?height=400&width=320"}
            alt={book.title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110 cursor-pointer filter group-hover:brightness-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Admin Control Badge */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-gradient-to-r from-red-600 to-pink-600 text-white text-xs font-semibold backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Admin Control
            </Badge>
          </div>

          {/* Overlay Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
            <Badge
              className={`${
                theme === "dark"
                  ? "bg-purple-600/90 text-white border-purple-400/30"
                  : "bg-purple-500/90 text-white border-purple-300/30"
              } text-xs font-semibold backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105`}
            >
              {book.condition}
            </Badge>
            <div className="flex gap-2">
              {book.quantity === "some" && (
                <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-semibold backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105">
                  Partial
                </Badge>
              )}
              <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-semibold backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105">
                {book.standard}
              </Badge>
            </div>
          </div>

          {/* Admin Action Buttons Overlay */}
          <div className="absolute top-16 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <Button
              size="sm"
              variant="ghost"
              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white p-2 h-9 w-9 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110"
              onClick={(e) => {
                e.stopPropagation()
                handleAdminDelete()
              }}
            >
              <AlertTriangle className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className={`${
                theme === "dark"
                  ? "bg-black/70 hover:bg-purple-600/80 border-purple-400/30"
                  : "bg-white/80 hover:bg-purple-500/80 border-purple-300/30"
              } p-2 h-9 w-9 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110 border`}
              onClick={(e) => {
                e.stopPropagation()
                handleShare()
              }}
            >
              <Share2 className={`w-4 h-4 ${theme === "dark" ? "text-white" : "text-gray-700 hover:text-white"}`} />
            </Button>
          </div>

          {/* Views Counter */}
          <div className="absolute bottom-3 left-3">
            <div
              className={`flex items-center gap-2 ${
                theme === "dark" ? "bg-black/70 text-white" : "bg-white/80 text-gray-700"
              } backdrop-blur-md rounded-full px-3 py-1.5 shadow-lg transition-all duration-300 hover:scale-105`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold">{book.views || 0}</span>
            </div>
          </div>

          {/* Contact Buttons - Show on Hover */}
          <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <Button
              size="sm"
              variant="ghost"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-2 h-9 w-9 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110"
              onClick={(e) => {
                e.stopPropagation()
                handleContact("call")
              }}
            >
              <Phone className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-2 h-9 w-9 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110"
              onClick={(e) => {
                e.stopPropagation()
                handleContact("whatsapp")
              }}
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          {/* Title and Price */}
          <div className="space-y-2">
            <h3
              className={`${
                theme === "dark" ? "text-white" : "text-gray-900"
              } font-bold text-base sm:text-lg line-clamp-2 leading-tight transition-colors duration-300 group-hover:text-purple-400`}
            >
              {book.title}
            </h3>
            <p className="text-emerald-500 dark:text-emerald-400 font-bold text-xl sm:text-2xl">₹{book.price}</p>
          </div>

          {/* Location and Seller */}
          <div className="space-y-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                openLocation()
              }}
              className={`flex items-center ${
                theme === "dark" ? "text-gray-300 hover:text-purple-400" : "text-gray-600 hover:text-purple-600"
              } text-sm transition-colors duration-300 hover:scale-105`}
            >
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-purple-500" />
              <span className="truncate font-medium">{book.location}</span>
            </button>
            <div
              className={`flex items-center ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              } text-sm transition-colors duration-300`}
            >
              <User className="w-4 h-4 mr-2 flex-shrink-0 text-purple-500" />
              <span className="truncate font-medium">{book.sellerName}</span>
            </div>
          </div>

          {/* Description Preview */}
          {book.description && (
            <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              } text-sm line-clamp-2 leading-relaxed transition-colors duration-300`}
            >
              {book.description}
            </p>
          )}

          {/* Admin Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              size="sm"
              variant="outline"
              className={`flex-1 ${
                theme === "dark"
                  ? "border-purple-400/50 text-purple-300 hover:bg-purple-600/20 hover:border-purple-300 hover:text-purple-200"
                  : "border-purple-300/70 text-purple-600 hover:bg-purple-500/10 hover:border-purple-400 hover:text-purple-700"
              } text-sm h-10 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm`}
              onClick={(e) => {
                e.stopPropagation()
                onEdit(book)
              }}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white h-10 px-4 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-red-500/25"
              onClick={(e) => {
                e.stopPropagation()
                handleAdminDelete()
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
