"use client"

// this page should be used only as a splash page to decide where a user should be navigated to
// when logged in --> to /heists
// when not logged in --> to /login

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Clock8 } from "lucide-react"
import { useAuth } from "@/contexts"

export default function Home() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.push('/heists')
      } else {
        router.push('/login')
      }
    }
  }, [user, isLoading, router])

  return (
    <div className="center-content">
      <div className="page-content">
        <h1>
          P<Clock8 className="logo" strokeWidth={2.75} />cket Heist
        </h1>
        <div>Tiny missions. Big office mischief.</div>
        {isLoading && <div className="text-body mt-4">Loading...</div>}
      </div>
    </div>
  )
}
