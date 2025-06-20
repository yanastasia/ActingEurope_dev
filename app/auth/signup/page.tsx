import Link from "next/link"
import type { Metadata } from "next"
import { Suspense } from "react"
import { AuthForm } from "@/components/auth/auth-form"

export const metadata: Metadata = {
  title: "Sign Up | Acting Europe",
  description: "Create an account to book tickets and access exclusive content",
}

export default function SignupPage() {
  return (
    <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-secondary-blue">Join Acting Europe</h1>
        <p className="mt-2 text-muted-foreground">Create an account to book tickets and access exclusive content</p>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <AuthForm type="signup" />
      </Suspense>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="underline underline-offset-4 hover:text-primary-gold">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline underline-offset-4 hover:text-primary-gold">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
