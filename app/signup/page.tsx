
"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/components/language-provider"
import { BookOpen, Loader2 } from "lucide-react"
import { useSession } from "../context/SessionContext"


export default function SignupPage() {
  const { user } = useSession()
  const router = useRouter()

   useEffect(() => {
    if (user) {
      router.replace("/") // Redirect to home or dashboard
    }
  }, [user, router])

  if (user) return null

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const { toast } = useToast()
  const { t } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: t("error"),
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
       const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // <--- THIS IS REQUIRED!
    body: JSON.stringify({
      fullName: formData.fullName,
      mobile: formData.mobile,
      email: formData.email,
      password: formData.password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: t("success"),
          description: "Account created successfully! Please check your email for OTP.",
        })
        router.push(`/verify-otp?email=${encodeURIComponent(formData.email)}`)
      } else {
        toast({
          // title: t(""),
          description: data.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        // title: t("error"),
        description: "Error while registering..",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className=" bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex justify-center py-8 px-4">
      <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-black/40 backdrop-blur-md border-white/10 mt-8">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <BookOpen className="h-12 w-12 text-purple-400" />
          </div>
          <CardTitle className="text-2xl text-white">{t("signup")}</CardTitle>
          <CardDescription className="text-gray-300">
            Create your account to start buying and selling books
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile" className="text-white">
                Mobile Number
              </Label>
              <Input
                id="mobile"
                type="tel"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                placeholder="9876543210"
                pattern="[6-9][0-9]{9}"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email (Gmail only)
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                placeholder="your.email@gmail.com"
                pattern=".*@gmail\.com$"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                placeholder="Enter password"
                minLength={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                placeholder="Confirm password"
                minLength={6}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Already have an account?{" "}
              <Link href="/login" className="text-purple-400 hover:text-purple-300">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
