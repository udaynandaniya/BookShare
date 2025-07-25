

// //C:\Users\UDAYN\Downloads\navneethub\app\page.tsx
// "use client"

// import { useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { useSession } from "@/app/context/SessionContext"
// import { Hero } from "@/components/hero"
// import { HowItWorks } from "@/components/how-it-works"
// import { ImportantNotice } from "@/components/important-notice"
// import { FeedbackSection } from "@/components/feedback-section"
// import dynamic from "next/dynamic"

// const WhyChooseUs = dynamic(() => import("@/components/why-choose-us"), {
//   ssr: false,
//   loading: () => <div>Loading...</div>,
// })

// export default function HomePage() {
//   const { user } = useSession()
//   const router = useRouter()

//   useEffect(() => {
//     if (user) {
//       // 👇 Redirect logged-in users away from landing page (optional)
//       // router.push("/dashboard")
//     }
//   }, [user, router])

//   return (
//     <div>
//       <Hero />
//       <HowItWorks />
//       <WhyChooseUs />
//       <ImportantNotice />
//       <FeedbackSection />
//     </div>
//   )
// }


// //C:\Users\UDAYN\Downloads\navneethub\app\page.tsx


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
    // OPTIONAL: If you want to redirect logged-in users to dashboard
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
