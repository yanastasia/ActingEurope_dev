"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { verifyEmail } from "@/lib/client-user-verification"
import { setAuthenticated } from "@/lib/auth"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [verificationState, setVerificationState] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    async function verify() {
      if (!token) {
        setVerificationState("error")
        setMessage("No verification token provided")
        return
      }

      try {
        const result = await verifyEmail(token)

        if (result.success) {
          setVerificationState("success")
          setEmail(result.email || "")

          // Automatically log the user in
          if (result.email) {
            const userRole = result.role || "client" // Default to 'client' if role is undefined
            setAuthenticated(result.email, userRole as "super_admin" | "admin" | "seller" | "client")
          }
        } else {
          setVerificationState("error")
          setMessage(result.message || "Verification failed")
        }
      } catch (error) {
        setVerificationState("error")
        setMessage("An error occurred during verification")
        console.error("Verification error:", error)
      }
    }

    verify()
  }, [token])

  return (
    <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12">
      <Card className="mx-auto w-full max-w-md border-primary-gold/20 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-secondary-blue">Email Verification</CardTitle>
          <CardDescription>
            {verificationState === "loading"
              ? "Verifying your email address..."
              : verificationState === "success"
                ? "Your email has been verified"
                : "Verification failed"}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {verificationState === "loading" ? (
            <div className="py-8">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary-gold" />
              <p className="mt-4 text-muted-foreground">Please wait while we verify your email address...</p>
            </div>
          ) : verificationState === "success" ? (
            <div className="py-8">
              <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
              <p className="mt-4">Your email address has been successfully verified!</p>
              <p className="mt-2 text-sm text-muted-foreground">
                You can now access all features of the Acting Europe platform.
              </p>
            </div>
          ) : (
            <div className="py-8">
              <XCircle className="mx-auto h-12 w-12 text-red-500" />
              <p className="mt-4">Verification failed</p>
              <p className="mt-2 text-sm text-muted-foreground">{message}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {verificationState === "loading" ? (
            <Button disabled>Please wait...</Button>
          ) : verificationState === "success" ? (
            <Button onClick={() => router.push("/profile")}>Go to Your Profile</Button>
          ) : (
            <Button variant="outline" asChild>
              <Link href="/auth/signup">Return to Sign Up</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
