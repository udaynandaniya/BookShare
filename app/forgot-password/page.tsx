

"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import zxcvbn from "zxcvbn"


export default function ForgotPasswordPage() {
  const { toast } = useToast()
  const [tab, setTab] = useState<"old"|"otp">("old")

  // old-password flow
  const [emailOld, setEmailOld] = useState("")
  const [oldPwd, setOldPwd] = useState("")
  const [newPwdOld, setNewPwdOld] = useState("")
  const [loadingOld, setLoadingOld] = useState(false)

  // otp flow
  const [emailOtp, setEmailOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otpCode, setOtpCode] = useState("")
  const [otpVerified, setOtpVerified] = useState(false)
  const [newPwdOtp, setNewPwdOtp] = useState("")
  const [loadingOtp, setLoadingOtp] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)

  // cooldown logic
  useEffect(() => {
    if (resendTimer <= 0) return
    const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
    return () => clearTimeout(t)
  }, [resendTimer])

  const pwdStrong = (pwd: string) => zxcvbn(pwd).score >= 3

  async function submitOld() {
    if (!emailOld || !oldPwd || !newPwdOld) {
      return toast({ title: "Error", description: "All fields required", variant: "destructive" })
    }
    if (!pwdStrong(newPwdOld)) {
      return toast({ title: "Error", description: "New password too weak", variant: "destructive" })
    }
    setLoadingOld(true)
    const res = await fetch("/api/auth/reset-by-old", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailOld, oldPassword: oldPwd, newPassword: newPwdOld }),
    })
    const data = await res.json()
    setLoadingOld(false)

    if (!res.ok) {
      return toast({ title: "Error", description: data.error, variant: "destructive" })
    }
    toast({ title: "Success", description: "Password reset—please login." })
    setTimeout(() => window.location.href = "/login", 800)
  }

  async function doSendOtp() {
    if (!emailOtp) {
      return toast({ title: "Error", description: "Enter registered email", variant: "destructive" })
    }
    const res = await fetch("/api/auth/reset-by-otp/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailOtp }),
    })
    const data = await res.json()
    if (!res.ok) {
      return toast({ title: "Error", description: data.error, variant: "destructive" })
    }
    setOtpSent(true)
    setResendTimer(60)
    toast({ title: "OTP Sent", description: "Check your email" })
  }

  async function doVerifyOtp() {
    if (!otpCode) {
      return toast({ title: "Error", description: "Enter the OTP", variant: "destructive" })
    }
    const res = await fetch("/api/auth/reset-by-otp/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailOtp, otp: otpCode }),
    })
    const data = await res.json()
    if (!res.ok) {
      return toast({ title: "Error", description: data.error, variant: "destructive" })
    }
    setOtpVerified(true)
    toast({ title: "OTP Verified", description: "Now enter new password" })
  }

  async function doResetOtpPwd() {
    if (!pwdStrong(newPwdOtp)) {
      return toast({ title: "Error", description: "Password too weak", variant: "destructive" })
    }
    const res = await fetch("/api/auth/reset-by-otp/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailOtp, otp: otpCode, newPassword: newPwdOtp }),
    })
    const data = await res.json()
    if (!res.ok) {
      return toast({ title: "Error", description: data.error, variant: "destructive" })
    }
    toast({ title: "Success", description: "Password reset—please login." })
    setTimeout(() => window.location.href = "/login", 800)
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-purple-200 rounded-lg overflow-hidden">
          <TabsTrigger value="old" className="w-1/2">Use Old Password</TabsTrigger>
          <TabsTrigger value="otp" className="w-1/2">Reset via OTP</TabsTrigger>
        </TabsList>

        <TabsContent value="old" className="mt-4 space-y-3">
          <Label>Email</Label>
          <Input type="email" value={emailOld} onChange={e => setEmailOld(e.target.value)} />
          <Label>Old Password</Label>
          <Input type="password" value={oldPwd} onChange={e => setOldPwd(e.target.value)} />
          <Label>New Password</Label>
          <Input type="password" value={newPwdOld} onChange={e => setNewPwdOld(e.target.value)} />
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700"
            onClick={submitOld}
            disabled={loadingOld}
          >
            {loadingOld ? "Resetting…" : "Reset Password"}
          </Button>
        </TabsContent>

        <TabsContent value="otp" className="mt-4 space-y-3">
          <Label>Email</Label>
          <Input type="email" value={emailOtp} onChange={e => setEmailOtp(e.target.value)} />
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700"
            onClick={doSendOtp}
            disabled={otpSent && resendTimer > 0}
          >
            {otpSent
              ? `Resend OTP (${resendTimer}s)`
              : "Send OTP"}
          </Button>

          {otpSent && (
            <>
              <Label>OTP Code</Label>
              <Input type="text" value={otpCode} onChange={e => setOtpCode(e.target.value)} />
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={doVerifyOtp}
                disabled={otpVerified}
              >
                {otpVerified ? "OTP Verified" : "Verify OTP"}
              </Button>
            </>
          )}

          {otpVerified && (
            <>
              <Label>New Password</Label>
              <Input type="password" value={newPwdOtp} onChange={e => setNewPwdOtp(e.target.value)} />
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={doResetOtpPwd}
              >
                Reset Password
              </Button>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
