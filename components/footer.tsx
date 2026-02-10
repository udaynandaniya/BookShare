// "use client"

// import { useTheme } from "next-themes"
// import { useLanguage } from "@/components/language-provider"
// import { useToast } from "@/hooks/use-toast"
// import Link from "next/link"
// import { motion } from "framer-motion"
// import { useEffect, useState } from "react"
// import {
//   ArrowUp,
//   Mail,
//   BookOpen,
//   Users,
//   MessageCircle,
//   Lightbulb,
//   AlertTriangle,
//   Heart,
//   ExternalLink,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"

// export function Footer() {
//   const { theme } = useTheme()
//   const { t } = useLanguage()
//   const { toast } = useToast()
//   const [showScroll, setShowScroll] = useState(false)

//   const handleFormClick = (formType: string) => {
//     let formUrl = ""
//     let toastMessage = ""

//     switch (formType) {
//       case "query":
//         formUrl =
//           "https://docs.google.com/forms/d/e/1FAIpQLSclRI95PV__qCDVn3VHFy-7rA5VmgXOuQcZ0BQyl3XTdNBqYA/viewform?usp=dialog"
//         toastMessage = "Contact form opened in new tab"
//         break
//       case "feature":
//         formUrl =
//           "https://docs.google.com/forms/d/e/1FAIpQLSfzo03N65BjzNxD0iARrd77ehI2Z58sI903Fdu74gZP3TyQBA/viewform?usp=dialog"
//         toastMessage = "Feature request form opened in new tab"
//         break
//       case "issue":
//         formUrl =
//           "https://docs.google.com/forms/d/e/1FAIpQLSdx1jWPNK_oailmgV_iV1jSUrsQ_lp-E_8ABsxK8pubHomWyA/viewform?usp=dialog"
//         toastMessage = "Report issue form opened in new tab"
//         break
//       case "feedback":
//         formUrl =
//           "https://docs.google.com/forms/d/e/1FAIpQLSdYkzw3GQgVlQyAE7TlXOHy9OCLuHLJJqAcCNX-rZc_l5pp2A/viewform?usp=sharing&ouid=116740770329831354136"
//         toastMessage = "Feedback form opened in new tab"
//         break
//     }

//     if (formUrl) {
//       toast({
//         title: "Form Opened",
//         description: toastMessage,
//         duration: 3000,
//       })
//       setTimeout(() => {
//         window.open(formUrl, "_blank")
//       }, 800)
//     }
//   }

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" })
//   }

//   useEffect(() => {
//     const handleScroll = () => {
//       setShowScroll(window.scrollY > 300)
//     }
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   const quickLinks = [
//     { href: "/", label: t("footer.home") || "Home", icon: BookOpen },
//     { href: "/dashboard", label: t("footer.browse") || "Browse Books", icon: BookOpen },
//     { href: "/sell", label: t("footer.sell") || "Sell Books", icon: Users },
//     { href: "/", label: t("footer.howItWorks") || "How It Works", icon: MessageCircle },
//   ]

//   const supportLinks = [
//     { label: t("footer.contactSupport") || "Contact Support", action: () => handleFormClick("query"), icon: MessageCircle },
//     { label: t("footer.requestFeature") || "Request Feature", action: () => handleFormClick("feature"), icon: Lightbulb },
//     { label: t("footer.reportIssue") || "Report Issue", action: () => handleFormClick("issue"), icon: AlertTriangle },
//     { label: t("footer.giveFeedback") || "Give Feedback", action: () => handleFormClick("feedback"), icon: Heart },
//   ]

//   return (
//     <>
//       <motion.footer
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className={`relative transition-all duration-500 ${
//           theme === "dark"
//             ? "bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900 text-white border-t border-purple-500/30"
//             : "bg-gradient-to-br from-white via-purple-50/20 to-white text-slate-900 border-t border-purple-200/50"
//         } backdrop-blur-sm`}
//       >
//         {/* MAIN CONTENT */}
//         <div className="mx-auto w-full max-w-6xl px-6 py-16">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 items-start">

//             {/* BRAND */}
//             <div className="flex h-full flex-col">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className={`p-3 rounded-xl ${theme === "dark"
//                   ? "bg-gradient-to-br from-purple-600 to-blue-600"
//                   : "bg-gradient-to-br from-purple-500 to-blue-500"}`}>
//                   <BookOpen className="h-6 w-6 text-white" />
//                 </div>
//                 <h2 className="text-xl font-bold">BookShareApp</h2>
//               </div>

//               <p className={`text-sm leading-relaxed mb-4 ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
//                 {t("footer.description") ||
//                   "Connect with students in your area to buy affordable used Navneet books or sell your completed ones. Save money, help others!"}
//               </p>

//               <div className="space-y-3">
//                 <div className="flex items-start gap-3 text-sm">
//                   <Mail className="h-[18px] w-[18px] mt-[2px] shrink-0 text-purple-500" />
//                   <a href="mailto:BookShareApp@gmail.com" className="hover:underline">
//                     BookShareApp@gmail.com
//                   </a>
//                 </div>
//               </div>
//             </div>

//             {/* QUICK LINKS */}
//             <div className="flex h-full flex-col">
//               <h3 className="text-base font-semibold mb-4 leading-none">
//                 {t("footer.quickLinks") || "Quick Links"}
//               </h3>
//               <ul className="space-y-2">
//                 {quickLinks.map((link, index) => (
//                   <li key={index}>
//                     <Link href={link.href} className="flex items-start gap-3 text-sm hover:translate-x-1 transition">
//                       <link.icon className="h-[18px] w-[18px] mt-[2px] shrink-0" />
//                       <span>{link.label}</span>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* SUPPORT */}
//             <div className="flex h-full flex-col">
//               <h3 className="text-base font-semibold mb-4 leading-none">
//                 {t("footer.support") || "Support & Help"}
//               </h3>
//               <ul className="space-y-2">
//                 {supportLinks.map((link, index) => (
//                   <li key={index}>
//                     <button
//                       onClick={link.action}
//                       className="flex items-start gap-3 text-sm text-left hover:translate-x-1 transition"
//                     >
//                       <link.icon className="h-[18px] w-[18px] mt-[2px] shrink-0" />
//                       <span>{link.label}</span>
//                       <ExternalLink className="h-3 w-3 mt-[4px] opacity-70" />
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* NOTICE */}
//             <div className="flex h-full flex-col">
//               <h3 className="text-base font-semibold mb-4 leading-none">
//                 {t("footer.importantNotice") || "Important Notice"}
//               </h3>

//               <div className={`mt-auto w-full p-4 rounded-lg border-l-4 ${
//                 theme === "dark"
//                   ? "bg-slate-800/40 border-amber-500 text-amber-200"
//                   : "bg-amber-50 border-amber-500 text-amber-800"
//               }`}>
//                 <p className="text-xs leading-relaxed">
//                   {t("footer.disclaimer") ||
//                     "Please verify all details before making any transaction. We are not responsible for fraudulent activities. Always meet in safe public places and verify books before payment."}
//                 </p>
//               </div>
//             </div>

//           </div>
//         </div>

//         {/* BOTTOM BAR */}
//         <div className={`border-t ${theme === "dark" ? "border-purple-500/30" : "border-purple-200/50"}`}>
//           <div className="mx-auto w-full max-w-6xl px-6 py-6">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

//               <div className="flex items-center gap-2 text-sm">
//                 <span>© {new Date().getFullYear()} BookShareApp. Made with</span>
//                 <Heart className="h-4 w-4 text-red-500" />
//                 <span>for students</span>
//               </div>

//               <div className="flex items-center gap-6 text-sm">
//                 <Link href="/privacy-policy" className="hover:underline">
//                   {t("footer.privacy") || "Privacy Policy"}
//                 </Link>
//                 <span className="opacity-50">|</span>
//                 <span className="text-xs">{t("footer.version") || "v2.0.0"}</span>
//               </div>

//             </div>
//           </div>
//         </div>
//       </motion.footer>

//       {showScroll && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="fixed bottom-8 right-8 z-50"
//         >
//           <Button onClick={scrollToTop} size="lg" className="rounded-full p-4">
//             <ArrowUp className="h-6 w-6" />
//           </Button>
//         </motion.div>
//       )}
//     </>
//   )
// }



"use client"

import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import {
  ArrowUp,
  Mail,
  BookOpen,
  Users,
  MessageCircle,
  Lightbulb,
  AlertTriangle,
  Heart,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const { theme } = useTheme()
  const { t } = useLanguage()
  const { toast } = useToast()
  const [showScroll, setShowScroll] = useState(false)

  /* ---------- Forms ---------- */

  const handleFormClick = (formType: string) => {
    let formUrl = ""
    let toastMessage = ""

    switch (formType) {
      case "query":
        formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSclRI95PV__qCDVn3VHFy-7rA5VmgXOuQcZ0BQyl3XTdNBqYA/viewform?usp=dialog"
        toastMessage = "Contact form opened"
        break
      case "feature":
        formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfzo03N65BjzNxD0iARrd77ehI2Z58sI903Fdu74gZP3TyQBA/viewform?usp=dialog"
        toastMessage = "Feature request opened"
        break
      case "issue":
        formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdx1jWPNK_oailmgV_iV1jSUrsQ_lp-E_8ABsxK8pubHomWyA/viewform?usp=dialog"
        toastMessage = "Issue report opened"
        break
      case "feedback":
        formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdYkzw3GQgVlQyAE7TlXOHy9OCLuHLJJqAcCNX-rZc_l5pp2A/viewform?usp=sharing"
        toastMessage = "Feedback form opened"
        break
    }

    if (formUrl) {
      toast({ title: "Opening form", description: toastMessage })
      window.open(formUrl, "_blank")
    }
  }

  /* ---------- Scroll button ---------- */

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 260)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  const quickLinks = [
    { href: "/", label: t("footer.home") || "Home", icon: BookOpen },
    { href: "/dashboard", label: t("footer.browse") || "Browse Books", icon: BookOpen },
    { href: "/sell", label: t("footer.sell") || "Sell Books", icon: Users },
    { href: "/", label: t("footer.howItWorks") || "How It Works", icon: MessageCircle },
  ]

  const supportLinks = [
    { label: t("footer.contactSupport") || "Contact Support", action: () => handleFormClick("query"), icon: MessageCircle },
    { label: t("footer.requestFeature") || "Request Feature", action: () => handleFormClick("feature"), icon: Lightbulb },
    { label: t("footer.reportIssue") || "Report Issue", action: () => handleFormClick("issue"), icon: AlertTriangle },
    { label: t("footer.giveFeedback") || "Give Feedback", action: () => handleFormClick("feedback"), icon: Heart },
  ]

  return (
    <>
      <footer
        className={`relative border-t ${
          theme === "dark"
            ? "bg-neutral-950 text-neutral-200 border-white/10"
            : "bg-white text-neutral-800 border-neutral-200"
        }`}
      >

        {/* MAIN GRID */}
        <div className="mx-auto max-w-7xl px-5 py-12 sm:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* BRAND */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-purple-600">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-lg font-semibold">BookShareApp</h2>
              </div>

              <p className="text-sm leading-relaxed opacity-80 mb-4">
                {t("footer.description") ||
                  "Connect with students to buy affordable used Navneet books or sell your completed ones. Save money and help others."}
              </p>

              <a
                href="mailto:BookShareApp@gmail.com"
                className="flex items-center gap-2 text-sm hover:underline"
              >
                <Mail className="h-4 w-4 text-purple-500" />
                navneethub@gmail.com
              </a>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide opacity-70">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition"
                    >
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* SUPPORT */}
            <div>
              <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide opacity-70">
                Support
              </h3>
              <ul className="space-y-2">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={link.action}
                      className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition"
                    >
                      <link.icon className="h-4 w-4" />
                      {link.label}
                      <ExternalLink className="h-3 w-3 opacity-60" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* NOTICE */}
            <div>
              <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide opacity-70">
                Important Notice
              </h3>

              <div className="p-4 rounded-lg border border-amber-500/40 bg-amber-500/10 text-xs leading-relaxed">
                {t("footer.disclaimer") ||
                  "Verify details before transactions. Meet in safe public places and check books before payment. We are not responsible for fraud."}
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-5 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">

            <div className="flex items-center gap-2">
              © {new Date().getFullYear()} BookShareApp • Made with
              <Heart className="h-4 w-4 text-red-500" />
              for students
            </div>

            <div className="flex items-center gap-5 text-xs opacity-80">
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
              <span>v2.0.0</span>
            </div>

          </div>
        </div>
      </footer>

      {/* SCROLL TO TOP */}
      {showScroll && (
        <motion.div
          initial={{ opacity: 0, scale: .8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-5 right-5 z-50"
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="rounded-full shadow-md bg-purple-600 hover:bg-purple-500 h-11 w-11"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </>
  )
}
