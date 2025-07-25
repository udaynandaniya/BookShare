"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function FeatureRequestPage() {
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Open Google Form in new tab
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSfzayNk_6hxOC0tly4HZ_IuHftMisLqCLc8LKdh28KuwMH_Cw/viewform",
      "_blank",
    )

    // Show success toast
    toast({
      title: "Feature Request Form Opened",
      description: "Please fill out the form in the new tab to submit your feature request.",
    })

    // Redirect back to home page
    router.push("/")
  }, [router, toast])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Opening Feature Request Form...</h1>
        <p className="text-gray-600">Please check the new tab that opened.</p>
      </div>
    </div>
  )
}
