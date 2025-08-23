"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { clientAuth } from "@/lib/supabase-client"
import { useLanguage } from "@/lib/language-context"

interface SupabaseAuthFormProps {
  type: "login" | "signup"
}

export function SupabaseAuthForm({ type }: SupabaseAuthFormProps) {
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
      if (type === "signup") {
        // Validation
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match")
        }

        if (formData.password.length < 6) {
          throw new Error("Password must be at least 6 characters")
        }

        // Sign up with Supabase
        const { data, error } = await clientAuth.signUp(
          formData.email,
          formData.password,
          {
            first_name: formData.name.split(' ')[0] || '',
            last_name: formData.name.split(' ').slice(1).join(' ') || '',
            full_name: formData.name
          }
        )

        if (error) {
          throw new Error(error.message)
        }

        if (data.user && !data.session) {
          // Email confirmation required
          setVerificationSent(true)
          toast({
            title: "Check your email",
            description: "We've sent you a confirmation link to verify your account.",
          })
        } else if (data.session) {
          // User is automatically signed in
          toast({
            title: "Account created successfully",
            description: "Welcome to Acting Europe!",
          })
          router.push("/profile")
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
          toast({
            title: "Welcome back!",
            description: "You have been successfully signed in.",
          })
          router.push("/profile")
        }
      }
    } catch (error) {
      console.error("Auth error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!formData.email) {
      toast({
        title: "Email required",
        description: "Please enter your email address first.",
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
        title: "Password reset sent",
        description: "Check your email for password reset instructions.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send reset email",
        variant: "destructive",
      })
    }
  }

  if (verificationSent) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle>Check Your Email</CardTitle>
          <CardDescription>
            We've sent a confirmation link to {formData.email}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Click the link in your email to verify your account and complete the signup process.
          </p>
          <Button
            variant="outline"
            onClick={() => setVerificationSent(false)}
            className="w-full"
          >
            Back to Sign Up
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>{type === "login" ? "Sign In" : "Create Account"}</CardTitle>
        <CardDescription>
          {type === "login"
            ? "Welcome back! Please sign in to your account."
            : "Join Acting Europe to discover amazing performances."}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {type === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
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
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
                minLength={6}
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {type === "login" ? "Sign In" : "Create Account"}
          </Button>
          
          {type === "login" && (
            <Button
              type="button"
              variant="link"
              onClick={handleForgotPassword}
              className="text-sm"
            >
              Forgot your password?
            </Button>
          )}
          
          <div className="text-center text-sm">
            {type === "login" ? (
              <>
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link href="/auth/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </>
            )}
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}