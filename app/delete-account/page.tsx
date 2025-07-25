"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/components/language-provider"
import { useToast } from "@/hooks/use-toast"
import { AlertTriangle, Loader2 } from "lucide-react"
import { useSession } from "../context/SessionContext"


export default function DeleteAccountPage() {
  const { t } = useLanguage()
  const { user, logout } = useSession()
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!confirmDelete) {
      toast({
        title: t("error"),
        description: "Please confirm that you want to delete your account",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/user/delete-account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        toast({
          title: "Account deleted",
          description: "Your account has been permanently deleted",
        })
        await logout()
        router.push("/")
      } else {
        const result = await response.json()
        toast({
          title: t("error"),
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: t("error"),
        description: "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 animate-spin text-purple-400" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-black/40 backdrop-blur-md border-white/10 border-red-500/20">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <AlertTriangle className="h-12 w-12 text-red-400" />
              </div>
              <CardTitle className="text-2xl text-red-400">Delete Account</CardTitle>
              <CardDescription className="text-gray-300">This action is permanent and cannot be undone</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                <h3 className="text-red-400 font-semibold mb-2">Warning:</h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Your account will be permanently deleted</li>
                  <li>• All your book listings will be removed</li>
                  <li>• This action cannot be undone</li>
                  <li>• You will lose access to all your data</li>
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    Enter your password to confirm *
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="confirm"
                    checked={confirmDelete}
                    onCheckedChange={(checked) => setConfirmDelete(checked as boolean)}
                    className="border-white/20"
                  />
                  <Label htmlFor="confirm" className="text-white text-sm">
                    I understand that this action is permanent and cannot be undone
                  </Label>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/dashboard")}
                    className="flex-1 border-white/20 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="destructive" className="flex-1" disabled={isLoading || !confirmDelete}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      "Delete Account"
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
