// //C:\Users\UDAYN\Downloads\navneethub\components\book-card.tsx
// "use client"

// import Link from "next/link"
// import Image from "next/image"
// import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { useLanguage } from "@/components/language-provider"
// import { formatPrice } from "@/lib/utils"
// import {
//   getBookConditionColor as getConditionColor,
//   getBookConditionText as getConditionLabel
// } from "@/lib/utils"

// import { MapPin, Phone, MessageCircle } from "lucide-react"

// interface Book {
//   _id: string
//   title: string
//   standard: string
//   condition: string
//   price: number
//   images: string[]
//   location: string
//   seller: {
//     fullName: string
//     mobile: string
//   }
//   whatsappNumber: string
// }

// interface BookCardProps {
//   book: Book
// }

// export function BookCard({ book }: BookCardProps) {
//   const { t } = useLanguage()

//   const handleWhatsApp = () => {
//     const message = encodeURIComponent(`Hi! I'm interested in your book "${book.title}" listed on NavneetHub.`)
//     window.open(`https://wa.me/91${book.whatsappNumber}?text=${message}`, "_blank")
//   }

//   const handleCall = () => {
//     window.open(`tel:+91${book.seller.mobile}`, "_self")
//   }

//   return (
//     <Card className="overflow-hidden hover:shadow-lg transition-shadow">
//       <Link href={`/books/${book._id}`}>
//         <div className="aspect-[4/3] relative overflow-hidden">
//           {book.images.length > 0 ? (
//             <Image
//               src={book.images[0] || "/placeholder.svg"}
//               alt={book.title}
//               fill
//               className="object-cover hover:scale-105 transition-transform"
//             />
//           ) : (
//             <div className="w-full h-full bg-muted flex items-center justify-center">
//               <span className="text-muted-foreground">{t("noImage") || "No Image"}</span>
//             </div>
//           )}
//         </div>
//       </Link>

//       <CardContent className="p-4">
//         <Link href={`/books/${book._id}`}>
//           <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary">{book.title}</h3>
//         </Link>

//         <div className="flex items-center gap-2 mb-2">
//           <Badge variant="secondary">Standard {book.standard}</Badge>
//           <Badge className={getConditionColor(book.condition)}>{getConditionLabel(book.condition)}</Badge>
//         </div>

//         <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
//           <MapPin className="h-4 w-4" />
//           <span>{book.location}</span>
//         </div>

//         <div className="text-2xl font-bold text-primary mb-3">{formatPrice(book.price)}</div>

//         <div className="text-sm text-muted-foreground mb-3">
//           {t("soldBy") || "Sold by"}: {book.seller.fullName}
//         </div>
//       </CardContent>

//       <CardFooter className="p-4 pt-0 flex gap-2">
//         <Button onClick={handleCall} variant="outline" size="sm" className="flex-1">
//           <Phone className="h-4 w-4 mr-2" />
//           {t("call") || "Call"}
//         </Button>
//         <Button onClick={handleWhatsApp} size="sm" className="flex-1">
//           <MessageCircle className="h-4 w-4 mr-2" />
//           {t("whatsapp") || "WhatsApp"}
//         </Button>
//       </CardFooter>
//     </Card>
//   )
// }







//C:\Users\UDAYN\Downloads\navneethub\components\book-card.tsx

"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { formatPrice } from "@/lib/utils"
import { getBookConditionColor as getConditionColor, getBookConditionText as getConditionLabel } from "@/lib/utils"
import { useTheme } from "next-themes"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

import { MapPin, Phone, MessageCircle, Share2 } from "lucide-react"

const MySwal = withReactContent(Swal)

interface Book {
  _id: string
  title: string
  standard: string
  condition: string
  price: number
  images: string[]
  location: string
  seller: {
    fullName: string
    mobile: string
  }
  whatsappNumber: string
}

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  const { t } = useLanguage()
  const { theme } = useTheme()

  // Enhanced WhatsApp function
  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const number = book.whatsappNumber || book.seller.mobile
    if (!number) {
      MySwal.fire({
        title: "Contact Not Available",
        text: "WhatsApp number is not available for this seller",
        icon: "warning",
        background: theme === "dark" ? "#1e1b4b" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#1f2937",
        customClass: {
          popup: "rounded-xl shadow-2xl",
        },
      })
      return
    }

    const formatted = number.replace(/[^0-9]/g, "")
    const message = encodeURIComponent(
      `Hi! I'm interested in your book "${book.title}" (${book.standard}) listed for ₹${book.price} on NavneetHub.`,
    )
    window.open(`https://wa.me/91${formatted}?text=${message}`, "_blank")
  }

  // Enhanced Call function - Direct mobile calling
  const handleCall = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const number = book.seller.mobile
    if (!number) {
      MySwal.fire({
        title: "Contact Not Available",
        text: "Phone number is not available for this seller",
        icon: "warning",
        background: theme === "dark" ? "#1e1b4b" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#1f2937",
        customClass: {
          popup: "rounded-xl shadow-2xl",
        },
      })
      return
    }

    const formatted = number.replace(/[^0-9]/g, "")
    // Direct call link for mobile devices
    window.location.href = `tel:+91${formatted}`
  }

  // Enhanced Location function - Open Google Maps
  const handleLocation = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (book.location) {
      const encodedLocation = encodeURIComponent(book.location)
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, "_blank")
    }
  }

  // Enhanced Share function - Dynamic URL
  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Dynamic URL based on current domain - deployment platform not decided
    const currentDomain = typeof window !== "undefined" ? window.location.origin : ""
    const bookUrl = `${currentDomain}/books/${book._id}`

    const shareData = {
      title: `${book.title} - NavneetHub`,
      text: `Check out this ${book.standard} book for ₹${book.price} on NavneetHub! 📚

Book: ${book.title}
Standard: ${book.standard}
Condition: ${book.condition}
Price: ₹${book.price}
Location: ${book.location}
Seller: ${book.seller.fullName}`,
      url: bookUrl,
    }

    // Try native share API first (mobile devices)
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
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
      MySwal.fire({
        title: "Share This Book 📚",
        text: `Copy this link: ${shareData.url}`,
        icon: "info",
        background: theme === "dark" ? "#1e1b4b" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#1f2937",
        customClass: {
          popup: "rounded-xl shadow-2xl",
        },
      })
    }
  }

  return (
    <Card
      className={`overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-800/90 via-purple-900/20 to-slate-800/90 border-purple-500/30 hover:border-purple-400/50 shadow-purple-500/10"
          : "bg-gradient-to-br from-white via-purple-50/30 to-white border-purple-200/50 hover:border-purple-300/70 shadow-purple-500/5"
      } backdrop-blur-sm`}
    >
      {/* Image Section with Share Button Overlay */}
      <div className="relative">
        <Link href={`/books/${book._id}`}>
          <div className="aspect-[4/3] relative overflow-hidden">
            {book.images.length > 0 ? (
              <Image
                src={book.images[0] || "/placeholder.svg"}
                alt={book.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 filter group-hover:brightness-110"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">{t("noImage") || "No Image"}</span>
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </Link>

        {/* Share Button Overlay */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <Button
            size="sm"
            variant="ghost"
            className={`${
              theme === "dark"
                ? "bg-black/70 hover:bg-pink-600/80 border-pink-400/30"
                : "bg-white/80 hover:bg-pink-500/80 border-pink-300/30"
            } p-2 h-8 w-8 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110 border`}
            onClick={handleShare}
          >
            <Share2 className={`w-3.5 h-3.5 ${theme === "dark" ? "text-white" : "text-gray-700 hover:text-white"}`} />
          </Button>
        </div>
      </div>

      <CardContent className="p-3 sm:p-4">
        <Link href={`/books/${book._id}`}>
          <h3
            className={`font-semibold text-base sm:text-lg mb-2 line-clamp-2 transition-colors duration-300 ${
              theme === "dark" ? "text-white hover:text-purple-400" : "text-gray-900 hover:text-purple-600"
            }`}
          >
            {book.title}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <Badge variant="secondary" className="text-xs">
            Standard {book.standard}
          </Badge>
          <Badge className={`${getConditionColor(book.condition)} text-xs`}>{getConditionLabel(book.condition)}</Badge>
        </div>

        {/* Location - Clickable */}
        <button
          onClick={handleLocation}
          className={`flex items-center gap-1 text-sm mb-3 transition-colors duration-300 hover:scale-105 ${
            theme === "dark" ? "text-gray-300 hover:text-purple-400" : "text-gray-600 hover:text-purple-600"
          }`}
        >
          <MapPin className="h-3.5 w-3.5 text-purple-500" />
          <span className="font-medium">{book.location}</span>
        </button>

        <div
          className={`text-xl sm:text-2xl font-bold mb-3 ${theme === "dark" ? "text-emerald-400" : "text-emerald-600"}`}
        >
          {formatPrice(book.price)}
        </div>

        <div className={`text-sm mb-3 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          {t("soldBy") || "Sold by"}: <span className="font-medium">{book.seller.fullName}</span>
        </div>
      </CardContent>

      {/* Compact Contact Buttons */}
      <CardFooter className="p-3 sm:p-4 pt-0 flex gap-2">
        <Button
          onClick={handleCall}
          variant="outline"
          size="sm"
          className={`flex-1 h-9 text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${
            theme === "dark"
              ? "border-blue-400/50 text-blue-300 hover:bg-blue-600/20 hover:border-blue-300 hover:text-blue-200"
              : "border-blue-300/70 text-blue-600 hover:bg-blue-500/10 hover:border-blue-400 hover:text-blue-700"
          }`}
        >
          <Phone className="h-3.5 w-3.5 mr-2" />
          {t("call") || "Call"}
        </Button>
        <Button
          onClick={handleWhatsApp}
          size="sm"
          className="flex-1 h-9 text-sm font-semibold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-green-500/25"
        >
          <MessageCircle className="h-3.5 w-3.5 mr-2" />
          {t("whatsapp") || "WhatsApp"}
        </Button>
      </CardFooter>
    </Card>
  )
}
