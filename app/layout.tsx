
import { Inter } from "next/font/google"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import Providers from "./providers"
import LayoutWrapper from "@/components/layout-wrapper"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BookShareApp - Buy & Sell Used Navneet Books",
  description: "Platform for students to buy and sell used Navneet books at affordable prices",
  generator: "v0.dev",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "no",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  )
}
