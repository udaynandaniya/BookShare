

"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/app/context/SessionContext"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { ImportantNotice } from "@/components/important-notice"
import { FeedbackSection } from "@/components/feedback-section"
import dynamic from "next/dynamic"
import { Footer } from "@/components/footer"

const WhyChooseUs = dynamic(() => import("@/components/why-choose-us"), {
  ssr: false,
  loading: () => <div></div>,
})

export default function HomePage() {
  const { user } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (user) router.push("/")
  }, [user, router])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <WhyChooseUs />
        <ImportantNotice />
        <FeedbackSection />
      </main>
      <Footer/>
    </>
  )
}
