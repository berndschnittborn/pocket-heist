"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  email: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Restore user from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('pocket-heist-auth')
      if (stored) {
        setUser(JSON.parse(stored))
      }
    } catch {
      localStorage.removeItem('pocket-heist-auth')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Mock validation - check if fields are non-empty
    if (!email || !password) {
      throw new Error('Email and password are required')
    }

    // Mock delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 500))

    const userData = { email }
    setUser(userData)
    localStorage.setItem('pocket-heist-auth', JSON.stringify(userData))
  }

  const signup = async (email: string, password: string) => {
    // Mock validation - check if fields are non-empty
    if (!email || !password) {
      throw new Error('Email and password are required')
    }

    // Mock delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 500))

    const userData = { email }
    setUser(userData)
    localStorage.setItem('pocket-heist-auth', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('pocket-heist-auth')
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
