

"use client"

import { usePathname } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import React from "react"

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const hideHeaderRoutes = ["/"]
  const hideFooterRoutes = ["/"]

  const showHeader = !hideHeaderRoutes.includes(pathname)
  const showFooter = !hideFooterRoutes.includes(pathname)

  return (
    <div className="min-h-screen flex flex-col">
      {showHeader && <Header />}
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  )
}
