"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { verifyEmail } from "@/lib/client-user-verification"
import { setAuthenticated } from "@/lib/auth"
import { useLanguage } from "@/lib/language-context"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const { t } = useLanguage()

  const [verificationState, setVerificationState] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    async function verify() {
      if (!token) {
        setVerificationState("error")
        setMessage(t("noVerificationToken"))
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
          setMessage(result.message || t("verificationFailedGeneric"))
        }
      } catch (error) {
        setVerificationState("error")
        setMessage(t("errorDuringVerification"))
        console.error("Verification error:", error)
      }
    }

    verify()
  }, [token])

  return (
    <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12">
      <Card className="mx-auto w-full max-w-md border-primary-gold/20 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-secondary-blue">{t("emailVerification")}</CardTitle>
          <CardDescription>
            {verificationState === "loading"
              ? t("verifyingEmailAddress")
              : verificationState === "success"
                ? t("emailHasBeenVerified")
                : t("verificationFailed")}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {verificationState === "loading" ? (
            <div className="py-8">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary-gold" />
              <p className="mt-4 text-muted-foreground">{t("pleaseWaitVerifying")}</p>
            </div>
          ) : verificationState === "success" ? (
            <div className="py-8">
              <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
              <p className="mt-4">{t("emailSuccessfullyVerified")}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("accessAllFeatures")}
              </p>
            </div>
          ) : (
            <div className="py-8">
              <XCircle className="mx-auto h-12 w-12 text-red-500" />
              <p className="mt-4">{t("verificationFailedMessage")}</p>
              <p className="mt-2 text-sm text-muted-foreground">{message}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {verificationState === "loading" ? (
            <Button disabled>{t("pleaseWait")}</Button>
          ) : verificationState === "success" ? (
            <Button onClick={() => router.push("/profile")}>{t("goToYourProfile")}</Button>
          ) : (
            <Button variant="outline" asChild>
              <Link href="/auth/signup">{t("returnToSignUp")}</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
