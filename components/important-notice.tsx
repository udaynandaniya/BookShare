

"use client"

import { useLanguage } from "@/components/language-provider"
import { AlertTriangle } from "lucide-react"

export function ImportantNotice() {
  const { t } = useLanguage()

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-red-900 border-y border-red-600">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="p-6 bg-red-700 rounded-full">
            <AlertTriangle className="h-16 w-16 text-red-300" />
          </div>
        </div>
        <h3 className="text-3xl font-bold mb-6 text-red-300 flex items-center justify-center gap-3">
          <AlertTriangle className="h-8 w-8" />
          {t("importantNotice") || "Important Notice"}
          <AlertTriangle className="h-8 w-8" />
        </h3>
        <div className="bg-red-800 p-8 rounded-2xl border border-red-600">
          <p className="text-red-200 text-xl leading-relaxed font-medium">
            {t("importantNoticeContent") ||
              "Please verify all details before making any transaction. We are not responsible for any fraudulent activities. Always meet in safe public places and verify books before payment."}
          </p>
        </div>
      </div>
    </section>
  )
}
