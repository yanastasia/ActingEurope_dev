"use client"

import type React from "react"

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
import { db } from "@/lib/database-storage"
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

        // For signup, send verification email
        if (type === "signup") {
        const existingUser = db.getUsers().find((u: any) => u.email === formData.email)
        if (existingUser) {
          throw new Error("Email already in use")
        }

        const newUser = {
          id: Math.random().toString(36).substring(2, 15),
          email: formData.email,
          password: formData.password, // Storing plain text password for now
          role: "user",
          emailVerified: false,
        }
        db.addUser(newUser)

        // Send verification email
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
      } else {
        // Login flow
        // Check if user exists
          console.log("Form Data:", formData);
          const users = db.getUsers();
          const user = users.find((u: any) => u.email === formData.email);
          console.log("User found:", user);

          if (!user) {
            console.log("No user found with this email.");
            toast({
              title: "Login Failed",
              description: "No user found with this email.",
              variant: "destructive",
            });
            return;
          }

          console.log("Comparing passwords:", formData.password, user.password);
          if (user.password !== formData.password) {
            console.log("Incorrect password.");
            toast({
              title: "Login Failed",
              description: "Incorrect password.",
              variant: "destructive",
            });
            return;
          }

        // Set authentication
        setAuthenticated(user.email, user.role)

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
          <CardTitle className="text-2xl font-bold text-secondary-blue">Verification Email Sent</CardTitle>
          <CardDescription>Please check your email to complete your registration</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-6 rounded-full bg-green-100 p-3 inline-block">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="mb-4">
            We've sent a verification email to <strong>{formData.email}</strong>
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Please click the verification link in the email to complete your registration. The link will expire in 24
            hours.
          </p>
          <Button variant="outline" onClick={() => router.push("/")}>
            Return to Home
          </Button>
          <Button variant="destructive" onClick={() => db.clearAllData()} className="mt-4">
            Clear All Data (for testing)
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            Didn't receive the email?{" "}
            <button
              className="font-medium text-primary-gold hover:underline"
              onClick={async () => {
                setIsLoading(true)
                try {
                  const verificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                  await sendVerificationEmailAction(formData.email, verificationToken)
                  toast({
                    title: "Verification email resent",
                    description: "Please check your email to verify your account.",
                  })
                } catch (error) {
                  toast({
                    title: "Error",
                    description: "Failed to resend verification email. Please try again.",
                    variant: "destructive",
                  })
                } finally {
                  setIsLoading(false)
                }
              }}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Resend verification email"}
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
          {type === "login" ? "Sign In" : "Create Account"}
        </CardTitle>
        <CardDescription>
          {type === "login"
            ? "Enter your credentials to access your account"
            : "Register to book tickets and access exclusive content"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
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
            <Label htmlFor="email">Email</Label>
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
            <Label htmlFor="password">Password</Label>
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
                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
              </Button>
            </div>
          </div>

          {type === "signup" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
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
                {type === "login" ? "Signing in..." : "Creating account..."}
              </>
            ) : type === "login" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm">
          {type === "login" ? (
            <>
              Don't have an account?{" "}
              <Link href="/auth/signup" className="font-medium text-primary-gold hover:underline">
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link href="/auth/login" className="font-medium text-primary-gold hover:underline">
                Sign in
              </Link>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
