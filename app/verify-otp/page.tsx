// // app\verify-otp\page.tsx
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/components/language-provider"
import { BookOpen, Loader2 } from "lucide-react"
import { useSession } from "../context/SessionContext"

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const { toast } = useToast()
  const { t } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  const { login } = useSession()

  useEffect(() => {
    // Avoid premature redirect before hydration
    if (email === null) return
    if (!email) {
      router.push("/signup")
    }
  }, [email, router])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      })

      const data = await response.json()

      if (response.ok) {
        login(data.user) // ✅ Log in
        toast({
          title: t("success"),
          description: "Email verified successfully!",
        })
        router.push("/dashboard") // ✅ Updated destination
      } else {
        toast({
          title: t("error"),
          description: data.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: t("error"),
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setIsResending(true)

    try {
      const response = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: t("success"),
          description: "OTP sent successfully!",
        })
      } else {
        toast({
          title: t("error"),
          description: data.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: t("error"),
        description: "Failed to resend OTP. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black/40 backdrop-blur-md border-white/10">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <BookOpen className="h-12 w-12 text-purple-400" />
          </div>
          <CardTitle className="text-2xl text-white">Verify Email</CardTitle>
          <CardDescription className="text-gray-300">Enter the 6-digit OTP sent to {email}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-white">
                OTP
              </Label>
              <Input
                id="otp"
                aria-label="One-Time Password"
                autoFocus
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-center text-2xl tracking-widest"
                placeholder="000000"
                maxLength={6}
                pattern="[0-9]{6}"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Email"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300 mb-2">Didn't receive the OTP?</p>
            <Button
              variant="outline"
              onClick={handleResendOTP}
              disabled={isResending}
              className="border-white/20 text-white hover:bg-white/10"
            >
              {isResending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resending...
                </>
              ) : (
                "Resend OTP"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
