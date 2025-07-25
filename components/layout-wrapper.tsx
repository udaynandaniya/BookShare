// //components\layout-wrapper.tsx

// "use client"

// import { usePathname } from "next/navigation"
// import { Header } from "./header"
// import { Footer } from "./footer"
// import React from "react"

// const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
//   const pathname = usePathname()

//   // Add any paths where you want to hide the footer
//   const hideFooterRoutes = ["/"] // Add more routes if needed

//   const showFooter = !hideFooterRoutes.includes(pathname)

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <main className="flex-1">{children}</main>
//       {showFooter && <Footer />}
//     </div>
//   )
// }

// export default LayoutWrapper


 //components\layout-wrapper.tsx

"use client"

import { usePathname } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import React from "react"

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Define routes where header/footer should be hidden
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
