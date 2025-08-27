'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { useLanguage } from '@/lib/language-context'

type VerificationState = 'loading' | 'success' | 'error'

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { t } = useLanguage()
  const [state, setState] = useState<VerificationState>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = searchParams.get('token')
    
    if (!token) {
      setState('error')
      setMessage('No verification token provided')
      return
    }

    // Verify the email
    const verifyEmail = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token })
        })

        const result = await response.json()

        if (response.ok && result.success) {
          setState('success')
          setMessage(result.message || 'Email verified successfully!')
          
          toast({
            title: 'Email Verified',
            description: 'Your email has been verified successfully. You can now sign in.',
          })
          
          // Redirect to login after 3 seconds
          setTimeout(() => {
            router.push('/auth/login')
          }, 3000)
        } else {
          setState('error')
          setMessage(result.error || 'Verification failed')
          
          toast({
            title: 'Verification Failed',
            description: result.error || 'Unable to verify your email. Please try again.',
            variant: 'destructive'
          })
        }
      } catch (error) {
        console.error('Verification error:', error)
        setState('error')
        setMessage('An unexpected error occurred')
        
        toast({
          title: 'Error',
          description: 'An unexpected error occurred. Please try again.',
          variant: 'destructive'
        })
      }
    }

    verifyEmail()
  }, [searchParams, router, toast])

  const renderContent = () => {
    switch (state) {
      case 'loading':
        return (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg">Verifying your email...</p>
            <p className="text-sm text-muted-foreground">Please wait while we confirm your email address.</p>
          </div>
        )
      
      case 'success':
        return (
          <div className="flex flex-col items-center space-y-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <p className="text-lg font-semibold text-green-700">Email Verified Successfully!</p>
            <p className="text-sm text-muted-foreground text-center">{message}</p>
            <p className="text-sm text-muted-foreground">You will be redirected to the login page in a few seconds...</p>
            <Button asChild>
              <Link href="/auth/login">Sign In Now</Link>
            </Button>
          </div>
        )
      
      case 'error':
        return (
          <div className="flex flex-col items-center space-y-4">
            <XCircle className="h-12 w-12 text-red-500" />
            <p className="text-lg font-semibold text-red-700">Verification Failed</p>
            <p className="text-sm text-muted-foreground text-center">{message}</p>
            <div className="flex space-x-2">
              <Button asChild variant="outline">
                <Link href="/auth/signup">Try Signing Up Again</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/login">Go to Login</Link>
              </Button>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-secondary-blue">Email Verification</h1>
        <p className="mt-2 text-muted-foreground">Confirming your email address</p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Verify Your Email</CardTitle>
          <CardDescription>
            We're confirming your email address to complete your registration.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  )
}