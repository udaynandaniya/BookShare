
"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { Languages } from "lucide-react"
import { cn } from "@/lib/utils" // Optional: for conditional classes if needed

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setLanguage(language === "en" ? "gu" : "en")}
      className="flex items-center justify-center h-11 w-11 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 transition-colors"
    >
      <Languages className="h-6 w-6" />
      <span className="sr-only">
        {language === "en" ? "Switch to Gujarati" : "Switch to English"}
      </span>
    </Button>
  )
}
