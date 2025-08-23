"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { isAdminEmail, setAuthenticated, isAdmin } from "@/lib/auth"
import { sendVerificationEmailAction } from "@/app/actions/email-actions"
// Removed direct database imports - now using API routes
import { useLanguage } from "@/lib/language-context"

interface AuthFormProps {
  type: "login" | "signup"
}

export function AuthForm({ type }: AuthFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [verificationSent, setVerificationSent] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)



    try {
      // Validation
      if (type === "signup" && formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match")
      }

      console.log("Form Data:", formData);

      if (type === "signup") {
        // Signup flow - call API
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            firstName: formData.name.split(' ')[0] || '',
            lastName: formData.name.split(' ').slice(1).join(' ') || ''
          })
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'Signup failed')
        }

        const user = result.user

        // Check if user is admin (skip email verification for admins)
        if (isAdminEmail(formData.email)) {
          // Admin users don't need email verification - log them in immediately
          setAuthenticated(user.email, user.isAdmin ? 'admin' : 'user')

          toast({
            title: "Account created successfully",
            description: "Welcome to Acting Europe as Administrator!",
          })

          // Redirect admin to admin panel
          router.push("/admin")
          return
        } else {
          // Regular users need email verification
          const verificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
          const verificationResult = await sendVerificationEmailAction(formData.email, verificationToken)

          if (!verificationResult.success) {
            throw new Error("Failed to send verification email. Please try again.")
          }

          // Show verification sent message
          setVerificationSent(true)

          toast({
            title: "Verification email sent",
            description: "Please check your email to verify your account.",
          })

          // Do not log in immediately after signup; wait for email verification
          router.push("/verify-email")
          return
        }  
      } else {
        // Login flow - call API
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'Login failed')
        }

        const user = result.user

        // Set authentication
        setAuthenticated(user.email, user.isAdmin ? 'admin' : 'user')

        // Check if user is admin
        const isAdminUser = isAdmin()

        // Success message
        toast({
          title: "Logged in successfully",
          description: `Welcome back to Acting Europe${isAdminUser ? " as Administrator" : ""}!`, 
        })

        // Redirect based on user role
        if (isAdminUser) {
          router.push("/admin")
          return
        } else {
          router.push("/")
          return
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (verificationSent) {
    return (
      <Card className="mx-auto w-full max-w-md border-primary-gold/20 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-secondary-blue">{t("verificationEmailSent")}</CardTitle>
          <CardDescription>{t("checkEmailToComplete")}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-6 rounded-full bg-green-100 p-3 inline-block">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="mb-4">
            {t("verificationEmailSentTo")} <strong>{formData.email}</strong>
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            {t("clickVerificationLink")}
          </p>
          <Button variant="outline" onClick={() => router.push("/")}>
            {t("returnToHome")}
          </Button>

        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            {t("didntReceiveEmail")}{" "}
            <button
              className="font-medium text-primary-gold hover:underline"
              onClick={async () => {
                setIsLoading(true)
                try {
                  const verificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                  await sendVerificationEmailAction(formData.email, verificationToken)
                  toast({
                     title: t("verificationEmailResent"),
                     description: t("checkEmailToComplete"),
                   })
                } catch (error) {
                  toast({
                    title: t("error"),
                    description: t("failedToResendEmail"),
                    variant: "destructive",
                  })
                } finally {
                  setIsLoading(false)
                }
              }}
              disabled={isLoading}
            >
              {isLoading ? t("sending") : t("resendVerificationEmail")}
            </button>
          </div>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="mx-auto w-full max-w-md border-primary-gold/20 shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-secondary-blue">
          {type === "login" ? t("welcomeBack") : t("joinActingEurope")}
        </CardTitle>
        <CardDescription>
          {type === "login"
            ? t("enterCredentials")
            : t("createAccountToBook")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">{t("fullName")}</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t("password")}</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">{showPassword ? t("hidePassword") : t("showPassword")}</span>
              </Button>
            </div>
          </div>

          {type === "signup" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <p className="text-[0.5rem] text-muted-foreground text-center mt-4">
                {t("signupDisclaimer")}
              </p>
            </>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {type === "login" ? t("signingIn") : t("creatingAccount")}
              </>
            ) : type === "login" ? (
              t("signIn")
            ) : (
              t("createAccount")
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm">
          {type === "login" ? (
            <>
              {t("dontHaveAccount")}{" "}
              <Link href="/auth/signup" className="font-medium text-primary-gold hover:underline">
                {t("signUp")}
              </Link>
            </>
          ) : (
            <>
              {t("alreadyHaveAccount")}{" "}
              <Link href="/auth/login" className="font-medium text-primary-gold hover:underline">
                {t("signIn")}
              </Link>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
