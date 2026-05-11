"use client"

import PublicRoute from '@/components/PublicRoute'

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <PublicRoute>
      <main className="public">
        {children}
      </main>
    </PublicRoute>
  )
}
