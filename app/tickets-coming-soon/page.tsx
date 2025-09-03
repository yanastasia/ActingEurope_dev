"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { Calendar, Mail, Bell, ArrowLeft, UserPlus } from "lucide-react"
import Link from "next/link"

export default function TicketReservationPage() {
  const router = useRouter()
  const { t, language } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => router.push('/')}
          className="mb-8 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('back')}
        </Button>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
              {t('ticketReservationTitle')}
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              {t('ticketReservationSubtitle')}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Bell className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">
                    {t('ticketAvailabilityTitle')}
                  </h3>
                  <p className="text-blue-700 leading-relaxed">
                    {t('ticketAvailabilityMessage')}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <UserPlus className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-green-800 mb-2">
                    {t('stayUpdatedTitle')}
                  </h3>
                  <p className="text-green-700 leading-relaxed mb-4">
                    {t('registerForUpdatesMessage')}
                  </p>
                  
                  <Link href="/signup">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      {t('registerNow')}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <p className="text-gray-600 mb-4">
                {t('exploreWhileWaiting')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/program">
                  <Button variant="outline" className="w-full sm:w-auto">
                    {t('viewProgram')}
                  </Button>
                </Link>
                <Link href="/participants">
                  <Button variant="outline" className="w-full sm:w-auto">
                    {t('participants')}
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" className="w-full sm:w-auto">
                    {t('about')}
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