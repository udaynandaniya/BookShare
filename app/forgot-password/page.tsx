

// "use client"

// import { useState, useEffect } from "react"
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { useToast } from "@/hooks/use-toast"
// import zxcvbn from "zxcvbn"


// export default function ForgotPasswordPage() {
//   const { toast } = useToast()
//   const [tab, setTab] = useState<"old"|"otp">("old")

//   // old-password flow
//   const [emailOld, setEmailOld] = useState("")
//   const [oldPwd, setOldPwd] = useState("")
//   const [newPwdOld, setNewPwdOld] = useState("")
//   const [loadingOld, setLoadingOld] = useState(false)
//   const [sendingOtp, setSendingOtp] = useState(false)


//   // otp flow
//   const [emailOtp, setEmailOtp] = useState("")
//   const [otpSent, setOtpSent] = useState(false)
//   const [otpCode, setOtpCode] = useState("")
//   const [otpVerified, setOtpVerified] = useState(false)
//   const [newPwdOtp, setNewPwdOtp] = useState("")
//   const [loadingOtp, setLoadingOtp] = useState(false)
//   const [resendTimer, setResendTimer] = useState(0)

//   // cooldown logic
//   // useEffect(() => {
//   //   if (resendTimer <= 0) return
//   //   const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
//   //   return () => clearTimeout(t)
//   // }, [resendTimer])

//   useEffect(() => {
//   if (resendTimer <= 0) return

//   const interval = setInterval(() => {
//     setResendTimer(prev => {
//       if (prev <= 1) {
//         clearInterval(interval)
//         return 0
//       }
//       return prev - 1
//     })
//   }, 1000)

//   return () => clearInterval(interval)
// }, [resendTimer])


//   const pwdStrong = (pwd: string) => zxcvbn(pwd).score >= 3

//   async function submitOld() {
//     if (!emailOld || !oldPwd || !newPwdOld) {
//       return toast({ title: "Error", description: "All fields required", variant: "destructive" })
//     }
//     if (!pwdStrong(newPwdOld)) {
//       return toast({ title: "Error", description: "New password too weak", variant: "destructive" })
//     }
//     setLoadingOld(true)
//     const res = await fetch("/api/auth/reset-by-old", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email: emailOld, oldPassword: oldPwd, newPassword: newPwdOld }),
//     })
//     const data = await res.json()
//     setLoadingOld(false)

//     if (!res.ok) {
//       return toast({ title: "Error", description: data.error, variant: "destructive" })
//     }
//     toast({ title: "Success", description: "Password reset—please login." })
//     setTimeout(() => window.location.href = "/login", 800)
//   }

//   // async function doSendOtp() {
//   //   if (!emailOtp) {
//   //     return toast({ title: "Error", description: "Enter registered email", variant: "destructive" })
//   //   }
//   //   const res = await fetch("/api/auth/reset-by-otp/send-otp", {
//   //     method: "POST",
//   //     headers: { "Content-Type": "application/json" },
//   //     body: JSON.stringify({ email: emailOtp }),
//   //   })
//   //   const data = await res.json()
//   //   if (!res.ok) {
//   //     return toast({ title: "Error", description: data.error, variant: "destructive" })
//   //   }
//   //   setOtpSent(true)
//   //   setResendTimer(60)
//   //   toast({ title: "OTP Sent", description: "Check your email" })
//   // }

//   async function doSendOtp() {
//   if (!emailOtp) {
//     return toast({ title: "Error", description: "Enter registered email", variant: "destructive" })
//   }

//   // 🚫 prevent double click
//   if (sendingOtp || resendTimer > 0) return

//   try {
//     setSendingOtp(true)

//     const res = await fetch("/api/auth/reset-by-otp/send-otp", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email: emailOtp }),
//     })

//     const data = await res.json()

//     if (!res.ok) {
//       setSendingOtp(false)
//       return toast({ title: "Error", description: data.error, variant: "destructive" })
//     }

//     // ✅ SUCCESS FEEDBACK
//     setOtpSent(true)
//     setResendTimer(60)   // lock button 60 sec

//     // toast({
//     //   title: "OTP Sent Successfully",
//     //   description: "Please check your email inbox",
//     // })

//   } catch (err) {
//     toast({ title: "Network Error", description: "Try again", variant: "destructive" })
//   } finally {
//     setSendingOtp(false)
//   }
// }


//   async function doVerifyOtp() {
//     if (!otpCode) {
//       return toast({ title: "Error", description: "Enter the OTP", variant: "destructive" })
//     }
//     const res = await fetch("/api/auth/reset-by-otp/verify-otp", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email: emailOtp, otp: otpCode }),
//     })
//     const data = await res.json()
//     if (!res.ok) {
//       return toast({ title: "Error", description: data.error, variant: "destructive" })
//     }
//     setOtpVerified(true)
//     toast({ title: "OTP Verified", description: "Now enter new password" })
//   }

//   async function doResetOtpPwd() {
//     if (!pwdStrong(newPwdOtp)) {
//       return toast({ title: "Error", description: "Password too weak", variant: "destructive" })
//     }
//     const res = await fetch("/api/auth/reset-by-otp/reset-password", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email: emailOtp, otp: otpCode, newPassword: newPwdOtp }),
//     })
//     const data = await res.json()
//     if (!res.ok) {
//       return toast({ title: "Error", description: data.error, variant: "destructive" })
//     }
//     toast({ title: "Success", description: "Password reset—please login." })
//     setTimeout(() => window.location.href = "/login", 800)
//   }

//   return (
//     <div className="max-w-md mx-auto p-4 space-y-4">
//       <Tabs value={tab} onValueChange={setTab}>
//         <TabsList className="bg-purple-200 rounded-lg overflow-hidden">
//           <TabsTrigger value="old" className="w-1/2">Use Old Password</TabsTrigger>
//           <TabsTrigger value="otp" className="w-1/2">Reset via OTP</TabsTrigger>
//         </TabsList>

//         <TabsContent value="old" className="mt-4 space-y-3">
//           <Label>Email</Label>
//           <Input type="email" value={emailOld} onChange={e => setEmailOld(e.target.value)} />
//           <Label>Old Password</Label>
//           <Input type="password" value={oldPwd} onChange={e => setOldPwd(e.target.value)} />
//           <Label>New Password</Label>
//           <Input type="password" value={newPwdOld} onChange={e => setNewPwdOld(e.target.value)} />
//           <Button
//             className="w-full bg-purple-600 hover:bg-purple-700"
//             onClick={submitOld}
//             disabled={loadingOld}
//           >
//             {loadingOld ? "Resetting…" : "Reset Password"}
//           </Button>
//         </TabsContent>

//         <TabsContent value="otp" className="mt-4 space-y-3">
//           <Label>Email</Label>
//           <Input type="email" value={emailOtp} onChange={e => setEmailOtp(e.target.value)} />
//           {/* <Button
//             className="w-full bg-purple-600 hover:bg-purple-700"
//             onClick={doSendOtp}
//             disabled={otpSent && resendTimer > 0}
//           >
//             {otpSent
//               ? `Resend OTP (${resendTimer}s)`
//               : "Send OTP"}
//           </Button> */}

//           <Button
//   className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-60"
//   onClick={doSendOtp}
//   disabled={sendingOtp || resendTimer > 0}
// >
//   {sendingOtp
//     ? "Sending OTP..."
//     : resendTimer > 0
//       ? `OTP Sent ✓ (${resendTimer}s)`
//       : "Send OTP"}
// </Button>

// {otpSent && resendTimer > 0 && (
//   <p className="text-sm text-green-600">
//     OTP sent to your email. Please check inbox or spam folder.
//   </p>
// )}


//           {otpSent && (
//             <>
//               <Label>OTP Code</Label>
//               <Input type="text" value={otpCode} onChange={e => setOtpCode(e.target.value)} />
//               <Button
//                 className="w-full bg-purple-600 hover:bg-purple-700"
//                 onClick={doVerifyOtp}
//                 disabled={otpVerified}
//               >
//                 {otpVerified ? "OTP Verified" : "Verify OTP"}
//               </Button>
//             </>
//           )}

//           {otpVerified && (
//             <>
//               <Label>New Password</Label>
//               <Input type="password" value={newPwdOtp} onChange={e => setNewPwdOtp(e.target.value)} />
//               <Button
//                 className="w-full bg-purple-600 hover:bg-purple-700"
//                 onClick={doResetOtpPwd}
//               >
//                 Reset Password
//               </Button>
//             </>
//           )}
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }


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
  const [resettingOldPwd, setResettingOldPwd] = useState(false)

  // otp flow
  const [emailOtp, setEmailOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otpCode, setOtpCode] = useState("")
  const [otpVerified, setOtpVerified] = useState(false)
  const [newPwdOtp, setNewPwdOtp] = useState("")
  const [sendingOtp, setSendingOtp] = useState(false)
  const [verifyingOtp, setVerifyingOtp] = useState(false)
  const [resettingOtpPwd, setResettingOtpPwd] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)

  // cooldown countdown
  useEffect(() => {
    if (resendTimer <= 0) return

    const interval = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [resendTimer])

  const pwdStrong = (pwd: string) => zxcvbn(pwd).score >= 3

  // OLD PASSWORD RESET
  async function submitOld() {
    if (!emailOld || !oldPwd || !newPwdOld) {
      return toast({ title: "Error", description: "All fields required", variant: "destructive" })
    }
    if (!pwdStrong(newPwdOld)) {
      return toast({ title: "Error", description: "New password too weak", variant: "destructive" })
    }

    try {
      setResettingOldPwd(true)

      const res = await fetch("/api/auth/reset-by-old", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailOld, oldPassword: oldPwd, newPassword: newPwdOld }),
      })

      const data = await res.json()
      if (!res.ok) {
        return toast({ title: "Error", description: data.error, variant: "destructive" })
      }

      toast({ title: "Success", description: "Password reset Successfully — please login." })
      setTimeout(() => window.location.href = "/login", 1000)

    } finally {
      setResettingOldPwd(false)
    }
  }

  // SEND OTP
  async function doSendOtp() {
    if (!emailOtp) {
      return toast({ title: "Error", description: "Enter registered email", variant: "destructive" })
    }
    if (sendingOtp || resendTimer > 0) return

    try {
      setSendingOtp(true)

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

      toast({ title: "OTP Sent", description: "Check your email inbox" })

    } finally {
      setSendingOtp(false)
    }
  }

  // VERIFY OTP
  async function doVerifyOtp() {
    if (!otpCode) {
      return toast({ title: "Error", description: "Enter the OTP", variant: "destructive" })
    }

    try {
      setVerifyingOtp(true)

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

    } finally {
      setVerifyingOtp(false)
    }
  }

  // RESET PASSWORD USING OTP
  async function doResetOtpPwd() {
    if (!pwdStrong(newPwdOtp)) {
      return toast({ title: "Error", description: "Password too weak", variant: "destructive" })
    }

    try {
      setResettingOtpPwd(true)

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

    } finally {
      setResettingOtpPwd(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-purple-200 rounded-lg overflow-hidden">
          <TabsTrigger value="old" className="w-1/2">Use Old Password</TabsTrigger>
          <TabsTrigger value="otp" className="w-1/2">Reset via OTP</TabsTrigger>
        </TabsList>

        {/* OLD PASSWORD TAB */}
        <TabsContent value="old" className="mt-4 space-y-3">
          <Label>Email</Label>
          <Input type="email" value={emailOld} onChange={e => setEmailOld(e.target.value)} />

          <Label>Old Password</Label>
          <Input type="password" value={oldPwd} onChange={e => setOldPwd(e.target.value)} />

          <Label>New Password</Label>
          <Input type="password" value={newPwdOld} onChange={e => setNewPwdOld(e.target.value)} />

          <Button
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-60"
            onClick={submitOld}
            disabled={resettingOldPwd}
          >
            {resettingOldPwd ? "Resetting Password..." : "Reset Password"}
          </Button>
        </TabsContent>

        {/* OTP TAB */}
        <TabsContent value="otp" className="mt-4 space-y-3">
          <Label>Email</Label>
          <Input type="email" value={emailOtp} onChange={e => setEmailOtp(e.target.value)} />

          <Button
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-60"
            onClick={doSendOtp}
            disabled={sendingOtp || resendTimer > 0}
          >
            {sendingOtp
              ? "Sending OTP..."
              : resendTimer > 0
                ? `OTP Sent ✓ (${resendTimer}s)`
                : "Send OTP"}
          </Button>

          {otpSent && resendTimer > 0 && (
            <p className="text-sm text-green-600">
              OTP sent to your email. Please check inbox or spam folder.
            </p>
          )}

          {otpSent && (
            <>
              <Label>OTP Code</Label>
              <Input
                type="text"
                maxLength={6}
                inputMode="numeric"
                value={otpCode}
                onChange={e => setOtpCode(e.target.value.replace(/\D/g, ""))}
              />

              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-60"
                onClick={doVerifyOtp}
                disabled={verifyingOtp || otpVerified}
              >
                {verifyingOtp
                  ? "Verifying OTP..."
                  : otpVerified
                    ? "OTP Verified ✓"
                    : "Verify OTP"}
              </Button>
            </>
          )}

          {otpVerified && (
            <>
              <Label>New Password</Label>
              <Input type="password" value={newPwdOtp} onChange={e => setNewPwdOtp(e.target.value)} />

              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-60"
                onClick={doResetOtpPwd}
                disabled={resettingOtpPwd}
              >
                {resettingOtpPwd ? "Updating Password..." : "Reset Password"}
              </Button>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

