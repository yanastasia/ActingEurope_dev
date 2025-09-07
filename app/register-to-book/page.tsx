"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { UserPlus, Mail, Lock, ArrowLeft, Ticket, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/providers/supabase-auth-provider"

export default function RegisterToBookPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t, language } = useLanguage()
  const { user, loading } = useAuth()
  const [isChecking, setIsChecking] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const eventId = searchParams.get('eventId')

  // Ensure component is mounted (client-side)
  useEffect(() => {
    setIsMounted(true)
  }, [])



  useEffect(() => {
    if (!loading) {
      if (user) {
        // User is authenticated, redirect to seat selection for specific event or tickets page
        if (eventId) {
          router.push(`/events/${eventId}/seat-selection`)
        } else {
          router.push('/tickets')
        }
      } else {
        // User is not authenticated, show registration prompt
        setIsChecking(false)
      }
    }
  }, [user, loading, router, eventId])

  // Show loading while checking authentication or mounting
  if (loading || isChecking || !isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{isMounted ? t('checkingAuthentication') : 'Checking authentication...'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-8 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {isMounted ? t('back') : 'Back'}
        </Button>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Ticket className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
                {isMounted ? t('registerToBookTitle') : 'Registration Required'}
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                {isMounted ? t('registerToBookSubtitle') : 'Create an account to book tickets for Acting Europe – Theatre Without Borders 2025'}
              </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Lock className="w-6 h-6 text-amber-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-amber-800 mb-2">
                    {isMounted ? t('registrationRequiredTitle') : 'Registration Required'}
                  </h3>
                  <p className="text-amber-700 leading-relaxed">
                    {isMounted ? t('registrationRequiredMessage') : 'To ensure the best experience and secure your tickets, please create an account or sign in.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <UserPlus className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-green-800 mb-2">
                    {isMounted ? t('createAccountTitle') : 'Create Your Account'}
                  </h3>
                  <p className="text-green-700 leading-relaxed mb-4">
                    {isMounted ? t('createAccountMessage') : 'Join thousands of theatre enthusiasts and secure your spot at Acting Europe 2025.'}
                  </p>
                  
                  <Link href={`/auth/signup${eventId ? `?redirectTo=${encodeURIComponent(`/register-to-book?eventId=${eventId}`)}` : ''}`}>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <UserPlus className="mr-2 h-4 w-4" />
                      {isMounted ? t('createAccount') : 'Create Account'}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Mail className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">
                    {isMounted ? t('alreadyHaveAccountTitle') : 'Already Have an Account?'}
                  </h3>
                  <p className="text-blue-700 leading-relaxed mb-4">
                    {isMounted ? t('alreadyHaveAccountMessage') : 'Sign in to your existing account to access your profile and book tickets.'}
                  </p>
                  
                  <Link href={`/auth/login${eventId ? `?redirectTo=${encodeURIComponent(`/register-to-book?eventId=${eventId}`)}` : ''}`}>
                    <Button variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-100">
                      <Mail className="mr-2 h-4 w-4" />
                      {isMounted ? t('signIn') : 'Sign In'}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                {isMounted ? t('whyRegisterTitle') : 'Why Register?'}
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{isMounted ? t('whyRegisterBenefit1') : 'Secure your preferred seats and showtimes'}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{isMounted ? t('whyRegisterBenefit2') : 'Receive exclusive updates and announcements'}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{isMounted ? t('whyRegisterBenefit3') : 'Access to special events and workshops'}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{isMounted ? t('whyRegisterBenefit4') : 'Connect with fellow theatre enthusiasts'}</span>
                </li>
              </ul>
            </div>

            <div className="text-center pt-4">
              <p className="text-gray-600 mb-4">
                {isMounted ? t('exploreWhileDeciding') : 'Take your time to explore while you decide:'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/program">
                  <Button variant="outline" className="w-full sm:w-auto">
                    {isMounted ? t('viewProgram') : 'View Program'}
                  </Button>
                </Link>
                <Link href="/participants">
                  <Button variant="outline" className="w-full sm:w-auto">
                    {isMounted ? t('participants') : 'Participants'}
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" className="w-full sm:w-auto">
                    {isMounted ? t('about') : 'About'}
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}