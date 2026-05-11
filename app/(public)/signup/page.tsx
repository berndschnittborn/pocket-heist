"use client"

import SignupForm from '@/components/SignupForm'

export default function SignupPage() {
  return (
    <div className="center-content">
      <div className="page-content flex flex-col items-center">
        <h2 className="form-title">Signup for an Account</h2>
        <SignupForm />
      </div>
    </div>
  )
}