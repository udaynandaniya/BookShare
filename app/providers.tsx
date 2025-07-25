//app\providers.tsx

"use client"

import { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "./context/SessionContext"


export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <LanguageProvider>
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
