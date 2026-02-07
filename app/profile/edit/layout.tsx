

import type React from "react"
import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "Edit Profile - NavneetHub",
  description: "Update your account information",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function EditProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
