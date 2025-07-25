
// app/dashboard/page.tsx
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useSession } from "../context/SessionContext"

export default function DashboardRedirector() {
  const { user } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (user === null) {
      router.push("/login")
    } else if (user.isAdmin) {
      router.push("/dashboard/admin")
    } else {
      router.push("/dashboard/user")
    }
  }, [user, router])

  return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
    </div>
  )
}
