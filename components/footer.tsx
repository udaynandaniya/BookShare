

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
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const { theme } = useTheme()
  const { t } = useLanguage()
  const { toast } = useToast()
  const [showScroll, setShowScroll] = useState(false)

  const handleFormClick = (formType: string) => {
    let formUrl = ""
    let toastMessage = ""

    switch (formType) {
      case "query":
        formUrl =
          "https://docs.google.com/forms/d/e/1FAIpQLSclRI95PV__qCDVn3VHFy-7rA5VmgXOuQcZ0BQyl3XTdNBqYA/viewform?usp=dialog"
        toastMessage = "Contact form opened in new tab"
        break
      case "feature":
        formUrl =
          "https://docs.google.com/forms/d/e/1FAIpQLSfzo03N65BjzNxD0iARrd77ehI2Z58sI903Fdu74gZP3TyQBA/viewform?usp=dialog"
        toastMessage = "Feature request form opened in new tab"
        break
      case "issue":
        formUrl =
          "https://docs.google.com/forms/d/e/1FAIpQLSdx1jWPNK_oailmgV_iV1jSUrsQ_lp-E_8ABsxK8pubHomWyA/viewform?usp=dialog"
        toastMessage = "Report issue form opened in new tab"
        break
      case "feedback":
        formUrl =
          "https://docs.google.com/forms/d/e/1FAIpQLSdYkzw3GQgVlQyAE7TlXOHy9OCLuHLJJqAcCNX-rZc_l5pp2A/viewform?usp=sharing&ouid=116740770329831354136"
        toastMessage = "Feedback form opened in new tab"
        break
    }

    if (formUrl) {
      toast({
        title: "Form Opened",
        description: toastMessage,
        duration: 3000,
      })
      setTimeout(() => {
        window.open(formUrl, "_blank")
      }, 800)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const quickLinks = [
    { href: "/", label: t("footer.home") || "Home", icon: BookOpen },
    { href: "/dashboard", label: t("footer.browse") || "Browse Books", icon: BookOpen },
    { href: "/sell", label: t("footer.sell") || "Sell Books", icon: Users },
    { href: "/", label: t("footer.howItWorks") || "How It Works", icon: MessageCircle },
  ]

  const supportLinks = [
    {
      label: t("footer.contactSupport") || "Contact Support",
      action: () => handleFormClick("query"),
      icon: MessageCircle,
    },
    {
      label: t("footer.requestFeature") || "Request Feature",
      action: () => handleFormClick("feature"),
      icon: Lightbulb,
    },
    {
      label: t("footer.reportIssue") || "Report Issue",
      action: () => handleFormClick("issue"),
      icon: AlertTriangle,
    },
    {
      label: t("footer.giveFeedback") || "Give Feedback",
      action: () => handleFormClick("feedback"),
      icon: Heart,
    },
  ]

  return (
    <>
      <motion.footer
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`relative transition-all duration-500 ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900 text-white border-t border-purple-500/30"
            : "bg-gradient-to-br from-white via-purple-50/20 to-white text-slate-900 border-t border-purple-200/50"
        } backdrop-blur-sm`}
      >
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`p-3 rounded-xl ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-purple-600 to-blue-600"
                      : "bg-gradient-to-br from-purple-500 to-blue-500"
                  } shadow-xl transition-all duration-300 hover:scale-110 hover:rotate-3`}
                >
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  NavneetHub
                </h2>
              </div>
              <p
                className={`text-sm leading-relaxed mb-6 ${
                  theme === "dark" ? "text-slate-300" : "text-slate-600"
                } transition-colors duration-300`}
              >
                {t("footer.description") ||
                  "Connect with students in your area to buy affordable used Navneet books or sell your completed ones. Save money, help others!"}
              </p>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 group">
                  <Mail
                    className={`h-4 w-4 ${
                      theme === "dark" ? "text-purple-400" : "text-purple-600"
                    } transition-all duration-300 group-hover:scale-110`}
                  />
                  <a
                    href="mailto:navneethub@gmail.com"
                    className={`hover:underline transition-all duration-300 font-medium text-sm ${
                      theme === "dark" ? "text-slate-300 hover:text-purple-400" : "text-slate-600 hover:text-purple-600"
                    } hover:translate-x-1`}
                  >
                    navneethub@gmail.com
                  </a>
                </div>

                

                <div className="flex items-start gap-3 group">
                  <Clock
                    className={`h-4 w-4 mt-0.5 ${
                      theme === "dark" ? "text-emerald-400" : "text-emerald-600"
                    } transition-all duration-300 group-hover:scale-110`}
                  />
                  <div className="flex flex-col">
                    <span
                      className={`text-sm font-semibold ${
                        theme === "dark" ? "text-slate-200" : "text-slate-700"
                      } transition-colors duration-300`}
                    >
                      {t("footer.sessionCycle") || "Session Cycle"}
                    </span>
                    <span
                      className={`text-xs leading-relaxed ${
                        theme === "dark" ? "text-slate-400" : "text-slate-500"
                      } transition-colors duration-300`}
                    >
                      {t("footer.sessionDetails") ||
                        "Mar–Aug: Active session ends 1 Sep, new session from 2 Sep | Sep–Feb: Ends 1 Mar, new session from 2 Mar"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="lg:col-span-1"
            >
              <h3
                className={`text-lg font-bold mb-6 ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                } transition-colors duration-300`}
              >
                {t("footer.quickLinks") || "Quick Links"}
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 transition-all duration-300 hover:translate-x-2 group text-sm ${
                        theme === "dark"
                          ? "text-slate-300 hover:text-purple-400"
                          : "text-slate-600 hover:text-purple-600"
                      }`}
                    >
                      <link.icon className="h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:text-purple-500" />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="lg:col-span-1"
            >
              <h3
                className={`text-lg font-bold mb-6 ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                } transition-colors duration-300`}
              >
                {t("footer.support") || "Support & Help"}
              </h3>
              <ul className="space-y-3">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={link.action}
                      className={`flex items-center gap-3 transition-all duration-300 hover:translate-x-2 text-left group text-sm ${
                        theme === "dark"
                          ? "text-slate-300 hover:text-purple-400"
                          : "text-slate-600 hover:text-purple-600"
                      }`}
                    >
                      <link.icon className="h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:text-purple-500" />
                      <span className="font-medium">{link.label}</span>
                      <ExternalLink className="h-3 w-3 opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110" />
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            

            {/* Important Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="lg:col-span-1"
            >
              <h3
                className={`text-lg font-bold mb-6 ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                } transition-colors duration-300`}
              >
                {t("footer.importantNotice") || "Important Notice"}
              </h3>

              <div
                className={`p-4 rounded-lg border-l-4 transition-all duration-300 hover:scale-[1.02] ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-slate-800/50 to-amber-900/20 border-amber-500 text-amber-200"
                    : "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-500 text-amber-800"
                } backdrop-blur-sm shadow-lg`}
              >
                <p className="text-xs leading-relaxed font-medium">
                  {t("footer.disclaimer") ||
                    "Please verify all details before making any transaction. We are not responsible for any fraudulent activities. Always meet in safe public places and verify books before payment."}
                </p>
              </div>

              

              <div
                className={`mt-4 p-4 rounded-lg border-l-4 transition-all duration-300 hover:scale-[1.02] ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-blue-900/30 to-purple-900/20 border-blue-500 text-blue-200"
                    : "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-500 text-blue-700"
                } backdrop-blur-sm shadow-lg`}
              >
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-500" />
                  <div>
                    <p className="text-sm font-bold mb-2">{t("footer.autoCleanupTitle") || "Automatic Data Cleanup"}</p>
                    <p className="text-xs leading-relaxed font-medium">
                      {t("footer.autoCleanupDesc") ||
                        "Every 1 March and 1 Sep all user accounts and book listings are automatically removed to ensure fresh start and remove inactive users. New session begins July-February."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div
                  className={`text-center p-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-slate-800/50 to-purple-900/20"
                      : "bg-gradient-to-br from-white/50 to-purple-50/50"
                  } backdrop-blur-sm shadow-lg border border-purple-500/20`}
                >
                  <div
                    className={`text-xl font-bold ${
                      theme === "dark" ? "text-purple-400" : "text-purple-600"
                    } transition-colors duration-300`}
                  >
                    1 to 12
                  </div>
                  <div
                    className={`text-xs font-semibold ${
                      theme === "dark" ? "text-slate-400" : "text-slate-500"
                    } transition-colors duration-300`}
                  >
                    Standards
                  </div>
                </div>
                <div
                  className={`text-center p-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-slate-800/50 to-emerald-900/20"
                      : "bg-gradient-to-br from-white/50 to-emerald-50/50"
                  } backdrop-blur-sm shadow-lg border border-emerald-500/20`}
                >
                  <div
                    className={`text-xl font-bold ${
                      theme === "dark" ? "text-emerald-400" : "text-emerald-600"
                    } transition-colors duration-300`}
                  >
                    24/7
                  </div>
                  <div
                    className={`text-xs font-semibold ${
                      theme === "dark" ? "text-slate-400" : "text-slate-500"
                    } transition-colors duration-300`}
                  >
                    Available
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className={`border-t transition-all duration-300 ${
            theme === "dark"
              ? "border-purple-500/30 bg-gradient-to-r from-slate-900/50 to-purple-900/10"
              : "border-purple-200/50 bg-gradient-to-r from-white/50 to-purple-50/20"
          } backdrop-blur-sm`}
        >
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex items-center gap-2"
              >
                <span
                  className={`text-sm font-medium ${
                    theme === "dark" ? "text-slate-400" : "text-slate-500"
                  } transition-colors duration-300`}
                >
                  © {new Date().getFullYear()} NavneetHub. Made with
                </span>
                <Heart className="h-4 w-4 text-red-500 animate-pulse transition-all duration-300 hover:scale-125" />
                <span
                  className={`text-sm font-medium ${
                    theme === "dark" ? "text-slate-400" : "text-slate-500"
                  } transition-colors duration-300`}
                >
                  for students
                </span>
              </motion.div>
              

              {/* Additional Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex items-center gap-40 text-xl"
              >
                <Link
                  href="/privacy-policy"
                  className={`transition-all duration-300 font-medium hover:scale-105 ${
                    theme === "dark" ? "text-slate-400 hover:text-purple-400" : "text-slate-500 hover:text-purple-600"
                  }`}
                >
                  {t("footer.privacy") || "Privacy Policy"}
                </Link>
                <span
                  className={`${theme === "dark" ? "text-slate-600" : "text-slate-300"} transition-colors duration-300`}
                >
                  |
                </span>
                <span
                  className={`text-xs font-medium ${
                    theme === "dark" ? "text-slate-500" : "text-slate-400"
                  } transition-colors duration-300`}
                >
                  {t("footer.version") || "v2.0.0"}
                </span>
              </motion.div>

              
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 animate-pulse"></div>
      </motion.footer>

      {/* Scroll to Top Button */}
      {showScroll && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button
            onClick={scrollToTop}
            size="lg"
            className={`rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 hover:rotate-12 ${
              theme === "dark"
                ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-purple-500/25"
                : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-purple-500/25"
            } backdrop-blur-sm border border-white/20`}
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-6 w-6" />
          </Button>
        </motion.div>
      )}
    </>
  )
}
