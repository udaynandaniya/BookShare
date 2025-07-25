

"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { BookOpen, Search, Plus } from "lucide-react"
import { useTheme } from "next-themes"

export function Hero() {
  const { t } = useLanguage()
  const { theme, resolvedTheme } = useTheme()

  const isDark = (theme === "dark" || resolvedTheme === "dark")

  return (
    <section
      className={`relative overflow-hidden transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white"
          : "bg-gradient-to-br from-white via-purple-100 to-white text-gray-900"
      }`}
    >
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          isDark ? "bg-black/30" : "bg-white/40"
        }`}
      />
      <div className="relative container mx-auto px-6 py-28 lg:py-40">
        <div className="text-center max-w-5xl mx-auto">
          <div className="flex justify-center mb-10">
            <BookOpen
              className={`h-24 w-24 drop-shadow-lg ${
                isDark ? "text-purple-400" : "text-purple-700"
              }`}
            />
          </div>

          <h1
            className={`text-5xl md:text-7xl font-extrabold mb-8 bg-clip-text text-transparent drop-shadow ${
              isDark
                ? "bg-gradient-to-r from-purple-300 via-white to-purple-300"
                : "bg-gradient-to-r from-purple-700 via-purple-500 to-purple-700"
            }`}
          >
            {t("heroTitle")}
          </h1>

          <p
            className={`text-2xl md:text-3xl mb-6 max-w-3xl mx-auto leading-relaxed ${
              isDark ? "text-purple-100" : "text-purple-800"
            }`}
          >
            {t("heroSubtitle")}
          </p>

          <p
            className={`text-2xl mb-6 max-w-3xl mx-auto leading-relaxed ${
              isDark ? "text-purple-100" : "text-purple-800"
            }`}
          >
            {t("heroExtraText")}
          </p>

          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              asChild
              className={`text-xl px-10 py-4 rounded-2xl shadow-lg ${
                isDark
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-purple-500 hover:bg-purple-600 text-white"
              }`}
            >
              <Link href="/books">
                <Search className="mr-2 h-5 w-5" />
                {t("buyBooks")}
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className={`text-xl px-10 py-4 rounded-2xl shadow-md border ${
                isDark
                  ? "border-white/30 text-white hover:bg-white/10"
                  : "border-purple-300 text-purple-700 hover:bg-purple-100"
              }`}
            >
              <Link href="/sell">
                <Plus className="mr-2 h-5 w-5" />
                {t("sellBooks")}
              </Link>
            </Button>
          </div> */}
        </div>
      </div>
    </section>
  )
}
