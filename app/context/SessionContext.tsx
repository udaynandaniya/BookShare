


//C:\Users\UDAYN\Downloads\navneethub\app\context\SessionContext.tsx
"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"
import { useRouter } from "next/navigation"

type UserType = {
  id: string
  name: string
  email: string
  mobile: string
  isVerified: boolean
  isAdmin?: boolean
}

type SessionContextType = {
  user: UserType | null
  login: (user: UserType) => void
  logout: () => void
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null)
  const router = useRouter()

  // ✅ Only load session if user is not set yet
  useEffect(() => {
    if (!user) {
      const getSession = async () => {
        try {
          const res = await fetch("/api/auth/session", { cache: "no-store" })
          if (res.ok) {
            const data = await res.json()
            setUser(data.user)
          } else {
            setUser(null)
          }
        } catch {
          setUser(null)
        }
      }
      getSession()
    }
  }, [user])

  const login = (user: UserType) => setUser(user)

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    setUser(null)
    router.push("/login")
  }

  return (
    <SessionContext.Provider value={{ user, login, logout }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider")
  }
  return context
}
