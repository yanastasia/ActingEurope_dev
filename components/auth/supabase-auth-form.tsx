"use client"

import React, { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { clientAuth } from "@/lib/supabase-client"
import { useLanguage } from "@/lib/language-context"
import { isAdminEmail, isScannerEmail, setAuthenticated } from "@/lib/auth"

interface SupabaseAuthFormProps {
  type: "login" | "signup"
}

export function SupabaseAuthForm({ type }: SupabaseAuthFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
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
      if (type === "signup") {
        // Validation
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match")
        }

        if (formData.password.length < 6) {
          throw new Error(t("passwordMustBe6Chars"))
        }

        // Check if user is admin (skip email verification for admins)
        const isAdmin = isAdminEmail(formData.email)
        
        // Sign up with Supabase
        const { data, error } = await clientAuth.signUp(
          formData.email,
          formData.password,
          {
            first_name: formData.name.split(' ')[0] || '',
            last_name: formData.name.split(' ').slice(1).join(' ') || '',
            full_name: formData.name,
            is_admin: isAdmin
          }
        )

        if (error) {
          throw new Error(error.message)
        }

        if (data.session) {
          // User is automatically signed in (autoconfirm enabled)
          const userRole = isAdmin ? "admin" : "user"
          setAuthenticated(formData.email, userRole)
          
          if (isAdmin) {
            toast({
              title: t("accountCreatedSuccessfully"),
              description: t("welcomeToActingEurope") + " " + t("asAdministrator"),
            })
            router.push("/admin")
          } else {
            toast({
              title: t("accountCreatedSuccessfully"),
              description: t("welcomeToActingEurope"),
            })
            router.push("/")
          }
        } else if (data.user && !data.session) {
          // Email confirmation required (fallback for when autoconfirm is disabled)
          if (isAdmin) {
            // Admin users don't need email verification - redirect immediately
            setAuthenticated(formData.email, "admin")
            toast({
              title: t("accountCreatedSuccessfully"),
              description: t("welcomeToActingEurope") + " " + t("asAdministrator"),
            })
            router.push("/admin")
          } else {
            setVerificationSent(true)
            toast({
              title: t("checkEmailConfirmation"),
              description: t("confirmationLinkSentDesc"),
            })
          }
        }
      } else {
        // Sign in with Supabase
        const { data, error } = await clientAuth.signIn(
          formData.email,
          formData.password
        )

        if (error) {
          throw new Error(error.message)
        }

        if (data.session) {
          // Set authentication state for login
          const isAdminUser = isAdminEmail(formData.email)
          const isScannerUser = isScannerEmail(formData.email)
          const userRole = isAdminUser ? "admin" : isScannerUser ? "scanner" : "user"
          
          console.log('Login Debug:', {
            email: formData.email,
            isAdminUser,
            isScannerUser,
            userRole,
            sessionUser: data.session.user.email
          })
          
          setAuthenticated(formData.email, userRole)
          
          toast({
            title: t("welcomeBack"),
            description: t("signedInSuccessfully"),
          })
          
          // Check for redirect parameter
          const redirectTo = searchParams.get('redirectTo')
          
          // Redirect based on user role and redirect parameter
          if (isAdminUser) {
            console.log('Redirecting admin user to /admin')
            // Dispatch custom event for admin page
            window.dispatchEvent(new CustomEvent('user-logged-in'))
            const adminRedirect = redirectTo && redirectTo.startsWith('/admin') ? redirectTo : '/admin'
            router.push(adminRedirect)
          } else if (isScannerUser) {
            console.log('Redirecting scanner user to /scanner')
            // Dispatch custom event for scanner page
            window.dispatchEvent(new CustomEvent('user-logged-in'))
            const scannerRedirect = redirectTo && redirectTo.startsWith('/scanner') ? redirectTo : '/scanner'
            router.push(scannerRedirect)
          } else {
            console.log('Redirecting regular user to /', { redirectTo })
            const userRedirect = redirectTo && !redirectTo.startsWith('/admin') && !redirectTo.startsWith('/scanner') ? redirectTo : '/'
            router.push(userRedirect)
          }
        }
      }
    } catch (error) {
      console.error("Auth error:", error)
      toast({
        title: t("error"),
        description: error instanceof Error ? error.message : t("unexpectedError"),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!formData.email) {
      toast({
        title: t("emailRequired"),
        description: t("enterEmailFirst"),
        variant: "destructive",
      })
      return
    }

    try {
      const { error } = await clientAuth.resetPassword(formData.email)
      if (error) {
        throw new Error(error.message)
      }

      toast({
        title: t("passwordResetSent"),
        description: t("checkEmailPasswordReset"),
      })
    } catch (error) {
      toast({
        title: t("error"),
        description: error instanceof Error ? error.message : t("failedToSendReset"),
        variant: "destructive",
      })
    }
  }

  if (verificationSent) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle>{t("checkYourEmail")}</CardTitle>
          <CardDescription>
            {t("confirmationLinkSent")} {formData.email}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            {t("clickLinkToVerify")}
          </p>
          <Button
            variant="outline"
            onClick={() => setVerificationSent(false)}
            className="w-full"
          >
            {t("backToSignUp")}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>{type === "login" ? t("signIn") : t("createAccount")}</CardTitle>
        <CardDescription>
          {type === "login"
            ? t("welcomeBackSignIn")
            : t("joinActingEuropeDiscover")}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {type === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">{t("fullName")}</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder={t("enterFullName")}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder={t("enterYourEmail")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t("password")}</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                placeholder={t("enterYourPassword")}
                minLength={6}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          {type === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder={t("confirmYourPassword")}
                minLength={6}
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {type === "login" ? t("signIn") : t("createAccount")}
          </Button>
          
          {type === "login" && (
            <Button
              type="button"
              variant="link"
              onClick={handleForgotPassword}
              className="text-sm"
            >
              {t("forgotPassword")}
            </Button>
          )}
          
          <div className="text-center text-sm">
            {type === "login" ? (
              <>
                {t("dontHaveAccount")}{" "}
                <Link href="/auth/signup" className="text-primary hover:underline">
                  {t("signUp")}
                </Link>
              </>
            ) : (
              <>
                {t("alreadyHaveAccount")}{" "}
                <Link href="/auth/login" className="text-primary hover:underline">
                  {t("signIn")}
                </Link>
              </>
            )}
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}