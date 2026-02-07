

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { User, Loader2, Eye, EyeOff, Trash2 } from "lucide-react"
import { useSession } from "@/app/context/SessionContext"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)

export default function EditProfilePage() {
  const { t } = useLanguage()
  const { user, login } = useSession() // Using your SessionContext
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    location: "",
    currentPassword: "",
    newPassword: "",
  })

  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else {
      setFormData({
        fullName: user.name || "", // Using 'name' from your UserType
        mobile: user.mobile || "",
        location: "", // You might need to add this to your UserType if needed
        currentPassword: "",
        newPassword: "",
      })
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate mobile number
      if (!/^[0-9]{10}$/.test(formData.mobile)) {
        MySwal.fire({
          title: "Invalid Mobile Number",
          text: "Mobile number must be exactly 10 digits",
          icon: "error",
          background: "#1e1b4b",
          color: "#ffffff",
        })
        setIsLoading(false)
        return
      }

      // Validate password change
      if (formData.newPassword && !formData.currentPassword) {
        MySwal.fire({
          title: "Current Password Required",
          text: "Please enter your current password to change it",
          icon: "error",
          background: "#1e1b4b",
          color: "#ffffff",
        })
        setIsLoading(false)
        return
      }

      if (formData.newPassword && formData.newPassword.length < 6) {
        MySwal.fire({
          title: "Weak Password",
          text: "New password must be at least 6 characters long",
          icon: "error",
          background: "#1e1b4b",
          color: "#ffffff",
        })
        setIsLoading(false)
        return
      }

      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        // Update user context with new data using your login function
        login({
          id: result.user._id,
          name: result.user.fullName,
          email: result.user.email,
          mobile: result.user.mobile,
          isVerified: result.user.isVerified,
          isAdmin: result.user.isAdmin,
        })

        MySwal.fire({
          title: "Success!",
          text: "Profile updated successfully",
          icon: "success",
          background: "#1e1b4b",
          color: "#ffffff",
        }).then(() => {
          router.push("/dashboard/user")
        })
      } else {
        MySwal.fire({
          title: "Error!",
          text: result.message || "Failed to update profile",
          icon: "error",
          background: "#1e1b4b",
          color: "#ffffff",
        })
      }
    } catch (error) {
      console.error("Profile update error:", error)
      MySwal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        background: "#1e1b4b",
        color: "#ffffff",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    // First, check if user has any book listings
    let bookCount = 0
    try {
      const bookResponse = await fetch("/api/user/books/count")
      if (bookResponse.ok) {
        const bookData = await bookResponse.json()
        bookCount = bookData.count || 0
      }
    } catch (error) {
      console.error("Error fetching book count:", error)
    }

    const result = await MySwal.fire({
      title: "Delete Account?",
      html: `
      <div class="text-left space-y-3">
        <p class="text-red-200">⚠️ This action cannot be undone!</p>
        <div class="bg-red-900/30 p-3 rounded border border-red-500/30">
          <p class="font-semibold text-yellow-200 mb-2">What will be deleted:</p>
          <ul class="text-sm text-red-200 space-y-1">
            <li>• Your profile and account information</li>
            <li>• All your uploaded book listings ${bookCount > 0 ? `(${bookCount} books)` : ""}</li>
            <li>• All your book photos and descriptions</li>
          </ul>
        </div>
        ${
          bookCount > 0
            ? `<div class="bg-yellow-900/30 p-3 rounded border border-yellow-500/30">
            <p class="text-yellow-200 text-sm">
              📚 You currently have <strong>${bookCount} book listing${bookCount > 1 ? "s" : ""}</strong> that will be permanently removed from NavneetHub.
            </p>
          </div>`
            : ""
        }
        <p class="text-red-200 text-sm">Are you sure you want to permanently delete your account?</p>
      </div>
    `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText:
        bookCount > 0 ? `Yes, delete account & ${bookCount} book${bookCount > 1 ? "s" : ""}` : "Yes, delete my account",
      cancelButtonText: "Cancel",
      background: "#1e1b4b",
      color: "#ffffff",
      reverseButtons: true,
      width: "500px",
    })

    if (result.isConfirmed) {
      // Second confirmation with typing requirement
      const finalConfirm = await MySwal.fire({
        title: "Final Confirmation Required",
        html: `
        <div class="text-left space-y-3">
          <p class="text-red-200">To confirm permanent deletion of:</p>
          <ul class="text-sm text-red-200 bg-red-900/20 p-3 rounded">
            <li>• Your account</li>
            ${bookCount > 0 ? `<li>• ${bookCount} book listing${bookCount > 1 ? "s" : ""}</li>` : ""}
            <li>• All associated data</li>
          </ul>
          <p class="text-yellow-200 font-semibold">Type 'DELETE MY ACCOUNT' below:</p>
        </div>
      `,
   
     })

      if (finalConfirm.isConfirmed) {
        setIsLoading(true)
        try {
          const response = await fetch("/api/user/profile", {
            method: "DELETE",
          })

          const result = await response.json()

          if (response.ok) {
            MySwal.fire({
              title: "Account Deleted Successfully",
              html: `
              <div class="text-center space-y-3">
                <p class="text-green-200">✅ Your account has been permanently deleted</p>
                ${
                  bookCount > 0
                    ? `<p class="text-blue-200">📚 ${bookCount} book listing${bookCount > 1 ? "s have" : " has"} been removed</p>`
                    : ""
                }
                <p class="text-gray-300 text-sm">Thank you for using NavneetHub!</p>
              </div>
            `,
              icon: "success",
              background: "#1e1b4b",
              color: "#ffffff",
              allowOutsideClick: false,
              allowEscapeKey: false,
              confirmButtonText: "Go to Homepage",
            }).then(() => {
              // Clear user context and redirect to home page
              window.location.href = "/"
            })
          } else {
            MySwal.fire({
              title: "Deletion Failed",
              text: result.message || "Failed to delete account. Please try again.",
              icon: "error",
              background: "#1e1b4b",
              color: "#ffffff",
            })
          }
        } catch (error) {
          console.error("Account deletion error:", error)
          MySwal.fire({
            title: "Error!",
            text: "Something went wrong. Please try again or contact support.",
            icon: "error",
            background: "#1e1b4b",
            color: "#ffffff",
          })
        } finally {
          setIsLoading(false)
        }
      }
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 animate-spin text-purple-400" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-purple-500/30">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <User className="h-12 w-12 text-purple-400" />
              </div>
              <CardTitle className="text-2xl text-white">Edit Profile</CardTitle>
              <CardDescription className="text-purple-200">Update your account information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-white">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="bg-white/20 border-purple-400 text-white placeholder:text-gray-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile" className="text-white">
                    Mobile Number * (10 digits)
                  </Label>
                  <Input
                    id="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 10)
                      setFormData({ ...formData, mobile: value })
                    }}
                    className="bg-white/20 border-purple-400 text-white placeholder:text-gray-300"
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                    required
                  />
                </div>

                {/* Password Change Section */}
                <div className="border-t border-purple-400/30 pt-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Change Password (Optional)</h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="text-white">
                        Current Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          value={formData.currentPassword}
                          onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                          className="bg-white/20 border-purple-400 text-white placeholder:text-gray-300 pr-10"
                          placeholder="Enter current password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-white">
                        New Password (min 6 characters)
                      </Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={formData.newPassword}
                          onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                          className="bg-white/20 border-purple-400 text-white placeholder:text-gray-300 pr-10"
                          placeholder="Enter new password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delete Account Section */}
                <div className="border-t border-red-400/30 pt-6">
                  <h3 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h3>
                  <div className="bg-red-900/20 border border-red-400/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Trash2 className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="text-white font-medium mb-2">Delete Account</h4>
                        <p className="text-red-200 text-sm mb-4">
                          Permanently delete your account and all associated data including book listings. This action
                          cannot be undone.
                        </p>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={handleDeleteAccount}
                          disabled={isLoading}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/dashboard/user")}
                    className="flex-1 border-purple-400 text-purple-200 hover:bg-purple-600"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Profile"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
