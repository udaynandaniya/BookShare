
//C:\Users\UDAYN\Downloads\BookShareApp\components\book-detail-modal.tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, MapPin, Phone, MessageCircle, Clock, Package, X, Share2 } from "lucide-react"
import { useTheme } from "next-themes"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)

interface BookDetailModalProps {
  book: any
  isOpen: boolean
  onClose: () => void
  currentUser?: any
}

export function BookDetailModal({ book, isOpen, onClose, currentUser }: BookDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { theme } = useTheme()

  if (!book) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "Today"
    if (diffDays === 2) return "Yesterday"
    if (diffDays <= 7) return `${diffDays} days ago`
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  // Enhanced Call Function - Triggers mobile calling
  const openCall = () => {
    const number = book.sellerContact
    if (number) {
      const formatted = number.replace(/[^0-9]/g, "")
      // Direct call link for mobile devices
      window.location.href = `tel:+91${formatted}`
    } else {
      MySwal.fire({
        title: "Contact Not Available",
        text: "Seller's contact information is not available",
        icon: "warning",
        background: theme === "dark" ? "#1e1b4b" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#1f2937",
      })
    }
  }

  // Enhanced WhatsApp Function - Opens WhatsApp chat
  const openWhatsApp = () => {
    const number = book.sellerContact
    if (number) {
      const formatted = number.replace(/[^0-9]/g, "")
      const message = encodeURIComponent(
        `Hi! I'm interested in your book "${book.title}" (${book.standard}) listed for ₹${book.price} on BookShareApp.`,
      )
      // Open WhatsApp with pre-filled message
      window.open(`https://wa.me/91${formatted}?text=${message}`, "_blank")
    } else {
      MySwal.fire({
        title: "Contact Not Available",
        text: "Seller's contact information is not available",
        icon: "warning",
        background: theme === "dark" ? "#1e1b4b" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#1f2937",
      })
    }
  }

  // Enhanced Location Function - Opens Google Maps
  const openLocation = () => {
    const location = book.location
    if (location) {
      // Open Google Maps with location search
      const encodedLocation = encodeURIComponent(location)
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, "_blank")
    } else {
      MySwal.fire({
        title: "Location Not Available",
        text: "Location information is not available",
        icon: "warning",
        background: theme === "dark" ? "#1e1b4b" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#1f2937",
      })
    }
  }

  // Enhanced Share Function - Dynamic URL
  const handleShare = async () => {
    // Dynamic URL - deployment platform not decided (Vercel/Netlify)
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

    // Try native share API first (mobile devices)
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
        MySwal.fire({
          title: "Shared Successfully! 🎉",
          text: "Book details shared successfully",
          icon: "success",
          background: theme === "dark" ? "#1e1b4b" : "#ffffff",
          color: theme === "dark" ? "#ffffff" : "#1f2937",
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            popup: "rounded-xl shadow-2xl",
          },
        })
        return
      } catch (err) {
        // console.log("Native share failed:", err)
      }
    }

    // Fallback to clipboard copy
    try {
      const shareText = `📚 ${shareData.title}

${shareData.text}

🔗 ${shareData.url}`
      await navigator.clipboard.writeText(shareText)

      MySwal.fire({
        title: "Link Copied! 📋",
        html: `
          <div class="text-center space-y-3">
            <p class="text-base sm:text-lg">Book details copied to clipboard!</p>
            <div class="text-xs sm:text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"} bg-${theme === "dark" ? "gray-800" : "gray-100"} p-3 rounded-lg mx-2">
              <p class="font-semibold text-sm sm:text-base">${book.title}</p>
              <p class="text-xs sm:text-sm">${book.standard} • ${book.condition} • ₹${book.price}</p>
              <p class="text-xs sm:text-sm">📍 ${book.location}</p>
            </div>
            <p class="text-xs sm:text-sm ${theme === "dark" ? "text-purple-300" : "text-purple-600"} px-2">
              You can now paste this anywhere to share!
            </p>
          </div>
        `,
        icon: "success",
        background: theme === "dark" ? "#1e1b4b" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#1f2937",
        confirmButtonText: "Great!",
        confirmButtonColor: theme === "dark" ? "#7c3aed" : "#8b5cf6",
        customClass: {
          popup: "rounded-xl shadow-2xl max-w-sm sm:max-w-md",
          confirmButton: "rounded-lg px-4 sm:px-6 py-2 font-semibold text-sm sm:text-base",
        },
        width: "90%",
        padding: "1rem",
      })
    } catch (err) {
      console.error("Clipboard copy failed:", err)

      // Final fallback - show the link in a modal
      MySwal.fire({
        title: "Share This Book 📚",
        html: `
          <div class="text-center space-y-3 sm:space-y-4">
            <div class="text-xs sm:text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"} bg-${theme === "dark" ? "gray-800" : "gray-100"} p-3 sm:p-4 rounded-lg">
              <p class="font-semibold text-sm sm:text-lg mb-2">${book.title}</p>
              <p class="mb-2 text-xs sm:text-sm">${book.standard} • ${book.condition} • ₹${book.price}</p>
              <p class="mb-3 text-xs sm:text-sm">📍 ${book.location}</p>
              <div class="bg-${theme === "dark" ? "gray-700" : "white"} p-2 sm:p-3 rounded border text-xs break-all overflow-hidden">
                <div class="max-h-16 overflow-y-auto">
                  ${shareData.url}
                </div>
              </div>
            </div>
            <p class="text-xs sm:text-sm ${theme === "dark" ? "text-purple-300" : "text-purple-600"} px-2">
              Copy the link above to share this book!
            </p>
          </div>
        `,
        icon: "info",
        background: theme === "dark" ? "#1e1b4b" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#1f2937",
        confirmButtonText: "Got it!",
        confirmButtonColor: theme === "dark" ? "#7c3aed" : "#8b5cf6",
        customClass: {
          popup: "rounded-xl shadow-2xl max-w-sm sm:max-w-lg",
          confirmButton: "rounded-lg px-4 sm:px-6 py-2 font-semibold text-sm sm:text-base",
        },
        width: "95%",
        padding: "1rem",
      })
    }
  }

  const isOwnBook = currentUser && book.sellerEmail === currentUser.email
  const hasContact = book.sellerContact

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`w-[95vw] max-w-4xl max-h-[90vh] overflow-hidden ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900 border-purple-500/30"
            : "bg-gradient-to-br from-white via-purple-50/20 to-white border-purple-200/50"
        } border-2 p-0 rounded-2xl shadow-2xl backdrop-blur-sm`}
      >
        {/* Header - User Icon, Name, Timing Below Name */}
        <div
          className={`flex items-center justify-between p-3 sm:p-4 border-b ${
            theme === "dark"
              ? "border-purple-500/30 bg-gradient-to-r from-slate-800/50 to-purple-900/20"
              : "border-purple-200/50 bg-gradient-to-r from-purple-50/30 to-white/50"
          } backdrop-blur-sm`}
        >
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
            {/* User Icon */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
              <User className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>

            {/* Name and Timing */}
            <div className="min-w-0 flex-1">
              {/* Seller Name */}
              <h3
                className={`font-bold text-base sm:text-xl ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                } transition-colors duration-300 truncate`}
              >
                {book.sellerName}
              </h3>

              {/* Timing Below Name */}
              <div
                className={`flex items-center gap-2 text-sm sm:text-base mt-1 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                } transition-colors duration-300`}
              >
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 flex-shrink-0" />
                <span className="truncate">{formatDate(book.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className={`rounded-full w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 ${
              theme === "dark"
                ? "hover:bg-red-600/20 text-gray-300 hover:text-red-400"
                : "hover:bg-red-500/10 text-gray-600 hover:text-red-600"
            } transition-all duration-300`}
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] sm:max-h-[calc(90vh-100px)] custom-scrollbar">
          <div className="p-4 sm:p-6 space-y-6">
            {/* Book Title, Standard, Condition, Price - Keep as is */}
            <div>
              <h1
                className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                } mb-4 transition-colors duration-300 leading-tight`}
              >
                {book.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm sm:text-base px-4 py-2 font-semibold shadow-lg transition-all duration-300 hover:scale-105">
                  {book.standard}
                </Badge>
                <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm sm:text-base px-4 py-2 font-semibold shadow-lg transition-all duration-300 hover:scale-105 capitalize">
                  {book.condition}
                </Badge>
                {book.quantity === "some" && (
                  <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm sm:text-base px-4 py-2 font-semibold shadow-lg transition-all duration-300 hover:scale-105">
                    Partial Books
                  </Badge>
                )}
              </div>

              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent mb-6">
                ₹{book.price}
              </p>
            </div>


             {/* Book Description - Keep as is */}
            {book.description && (
              <div
                className={`${
                  theme === "dark" ? "bg-slate-800/30 border-slate-700/50" : "bg-white/50 border-gray-200/50"
                } rounded-xl p-4 sm:p-6 border backdrop-blur-sm`}
              >
                <p
                  className={`${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  } text-base sm:text-lg leading-relaxed transition-colors duration-300`}
                >
                  {book.description}
                </p>
              </div>
            )}

            {/* Specific Books - Keep as is */}
            {book.quantity === "some" && book.specificBooks && book.specificBooks.length > 0 && (
              <div
                className={`${
                  theme === "dark" ? "bg-slate-800/30 border-slate-700/50" : "bg-white/50 border-gray-200/50"
                } rounded-xl p-4 sm:p-6 border backdrop-blur-sm`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Package
                    className={`w-6 h-6 ${theme === "dark" ? "text-purple-400" : "text-purple-600"} flex-shrink-0`}
                  />
                  <span
                    className={`font-bold text-lg ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    } transition-colors duration-300`}
                  >
                    Specific Books Available:
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {book.specificBooks.map((bookName: string, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className={`text-sm px-3 py-1 font-medium transition-all duration-300 hover:scale-105 ${
                        theme === "dark"
                          ? "border-purple-400/50 text-purple-300 hover:bg-purple-600/10"
                          : "border-purple-300/70 text-purple-600 hover:bg-purple-500/10"
                      }`}
                    >
                      {bookName}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>


            {/* COMPACT Contact Section - Call, WhatsApp, Location, Share */}
            <div
              className={`${
                theme === "dark"
                  ? "bg-gradient-to-r from-slate-800/50 to-purple-900/20 border-purple-500/30"
                  : "bg-gradient-to-r from-purple-50/50 to-white/50 border-purple-200/50"
              } rounded-xl p-3 sm:p-4 border backdrop-blur-sm`}
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Call Icon + Contact Number - COMPACT */}
                <button
                  onClick={openCall}
                  className="flex flex-col items-center text-center space-y-1.5 p-2 rounded-lg hover:bg-blue-500/10 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className={`text-xs font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"} mb-0.5`}>
                      Call
                    </p>
                    <p
                      className={`text-xs sm:text-sm font-bold ${
                        theme === "dark" ? "text-blue-400" : "text-blue-600"
                      } transition-colors duration-300 break-all leading-tight`}
                    >
                      {hasContact ? `+91 ${book.sellerContact}` : "Not Available"}
                    </p>
                  </div>
                </button>

                {/* WhatsApp Icon + Contact Number - COMPACT */}
                <button
                  onClick={openWhatsApp}
                  className="flex flex-col items-center text-center space-y-1.5 p-2 rounded-lg hover:bg-green-500/10 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className={`text-xs font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"} mb-0.5`}>
                      WhatsApp
                    </p>
                    <p
                      className={`text-xs sm:text-sm font-bold ${
                        theme === "dark" ? "text-green-400" : "text-green-600"
                      } transition-colors duration-300 break-all leading-tight`}
                    >
                      {hasContact ? `+91 ${book.sellerContact}` : "Not Available"}
                    </p>
                  </div>
                </button>

                {/* Location Icon + Location - COMPACT */}
                <button
                  onClick={openLocation}
                  className="flex flex-col items-center text-center space-y-1.5 p-2 rounded-lg hover:bg-purple-500/10 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className={`text-xs font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"} mb-0.5`}>
                      Location
                    </p>
                    <p
                      className={`text-xs sm:text-sm font-bold ${
                        theme === "dark" ? "text-purple-400" : "text-purple-600"
                      } transition-colors duration-300 break-words leading-tight`}
                    >
                      {book.location}
                    </p>
                  </div>
                </button>

                {/* Share Button - COMPACT */}
                <button
                  onClick={handleShare}
                  className="flex flex-col items-center text-center space-y-1.5 p-2 rounded-lg hover:bg-pink-500/10 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <Share2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className={`text-xs font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"} mb-0.5`}>
                      Share
                    </p>
                    <p
                      className={`text-xs sm:text-sm font-bold ${
                        theme === "dark" ? "text-pink-400" : "text-pink-600"
                      } transition-colors duration-300 leading-tight`}
                    >
                      Share Book
                    </p>
                  </div>
                </button>
              </div>
            </div>

           
          {/* Images Section - Keep as is */}
          {book.images && book.images.length > 0 && (
            <div className="mt-6 px-4 sm:px-6 pb-6">
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 max-h-96 shadow-xl">
                  <Image
                    src={book.images[currentImageIndex] || "/placeholder.svg"}
                    alt={`${book.title} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {book.images.length > 1 && (
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md">
                      {currentImageIndex + 1} / {book.images.length}
                    </div>
                  )}
                </div>

                {/* Image Thumbnails */}
                {book.images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {book.images.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border-3 transition-all duration-300 hover:scale-105 ${
                          currentImageIndex === index
                            ? "border-purple-500 shadow-lg shadow-purple-500/25"
                            : theme === "dark"
                              ? "border-gray-600 hover:border-purple-400"
                              : "border-gray-300 hover:border-purple-500"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}







