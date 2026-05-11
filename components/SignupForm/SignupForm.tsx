"use client"

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts'

export default function SignupForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { signup } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!email || !password) {
      setError('Email and password are required')
      return
    }

    setIsSubmitting(true)

    try {
      await signup(email, password)
      router.push('/heists')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-body mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 bg-lighter border border-lighter rounded-lg text-heading focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter your email"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-body mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 bg-lighter border border-lighter rounded-lg text-heading focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter your password"
          disabled={isSubmitting}
        />
      </div>

      {error && (
        <div className="p-3 bg-error/10 border border-error rounded-lg text-error text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Creating account...' : 'Sign Up'}
      </button>
    </form>
  )
}
