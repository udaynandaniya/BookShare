

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/components/language-provider"
import { BookOpen, Loader2 } from "lucide-react"
import { useSession } from "../context/SessionContext"

export default function LoginPage() {
  const { user, login } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })

  useEffect(() => {
    if (user) {
      router.replace("/")
    }
  }, [user, router])

  if (user) return <></>

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      })

      const data = await response.json()

      if (response.ok) {
        login(data.user)
        toast({
          description: "Logged in successfully!",
        })

        setTimeout(() => {
          router.push("/dashboard")
        }, 100)
      } else {
       toast({
  description: data.error || "Something went wrong. Please try again.",
  variant: "destructive", // red style
})

      }
    } catch (error) {
      toast({
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex justify-center py-8 px-4">
      <Card className="w-full max-w-md bg-black/40 backdrop-blur-md border-white/10 mt-8">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <BookOpen className="h-12 w-12 text-purple-400" />
          </div>
          <CardTitle className="text-2xl text-white">{t("login")}</CardTitle>
          <CardDescription className="text-gray-300">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                placeholder="your.email@gmail.com"
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
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                placeholder="Enter your password"
                required
              />
              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-gray-300">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-purple-400 hover:text-purple-300"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
