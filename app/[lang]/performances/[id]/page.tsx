'use client'

import { useState, useEffect } from 'react'
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin, Languages, Users, Subtitles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useLanguage, translations } from "@/lib/language-context"
import { notFound } from 'next/navigation'

// Helper function to translate subtitle languages
const translateSubtitleLanguages = (subtitles: string, language: string) => {
  if (!subtitles) return '';
  
  const languageMap: { [key: string]: { [key: string]: string } } = {
    en: {
      'English': translations.en.subtitlesEn,
      'Bulgarian': translations.en.subtitlesBg,
      'Macedonian': translations.en.subtitlesMk,
      'Serbian': translations.en.subtitlesSr
    },
    bg: {
      'English': translations.bg.subtitlesEn,
      'Bulgarian': translations.bg.subtitlesBg,
      'Macedonian': translations.bg.subtitlesMk,
      'Serbian': translations.bg.subtitlesSr
    },
    mk: {
      'English': translations.mk.subtitlesEn,
      'Bulgarian': translations.mk.subtitlesBg,
      'Macedonian': translations.mk.subtitlesMk,
      'Serbian': translations.mk.subtitlesSr
    },
    sr: {
      'English': translations.sr.subtitlesEn,
      'Bulgarian': translations.sr.subtitlesBg,
      'Macedonian': translations.sr.subtitlesMk,
      'Serbian': translations.sr.subtitlesSr
    }
  };
  
  // Split by comma and translate each language
  return subtitles.split(',').map(lang => {
    const trimmedLang = lang.trim();
    return languageMap[language]?.[trimmedLang] || trimmedLang;
  }).join(', ');
};

interface PerformancePageProps {
  params: Promise<{
    lang: string
    id: string
  }>
}

const supportedLanguages = ['en', 'bg', 'mk', 'sr']

export default function PerformancePage({ params }: PerformancePageProps) {
  const [resolvedParams, setResolvedParams] = useState<{ lang: string; id: string } | null>(null)
  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { setLanguage, t } = useLanguage()

  useEffect(() => {
    params.then(p => {
      // Validate language parameter
      if (!supportedLanguages.includes(p.lang)) {
        notFound()
        return
      }
      setResolvedParams(p)
      setLanguage(p.lang)
    })
  }, [params, setLanguage])

  useEffect(() => {
    if (!resolvedParams) return

    const fetchEvent = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/events/${resolvedParams.id}?language=${resolvedParams.lang}`)
        if (!response.ok) {
          if (response.status === 404) {
            notFound()
            return
          }
          throw new Error('Failed to fetch event')
        }
        const eventData = await response.json()
        setEvent(eventData)
      } catch (err) {
        console.error('Error fetching event:', err)
        setError('Failed to load event details')
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [resolvedParams])

  if (!resolvedParams) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">{t.error}</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  if (!event) {
    notFound()
    return null
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(resolvedParams.lang === 'en' ? 'en-US' : 
                                  resolvedParams.lang === 'bg' ? 'bg-BG' :
                                  resolvedParams.lang === 'mk' ? 'mk-MK' : 'sr-RS')
  }

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':')
    return `${hours}:${minutes}`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${resolvedParams.lang}`}>{t.home}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${resolvedParams.lang}/program`}>{t.program}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-muted-foreground">
            {event.title}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {event.poster_url && (
            <div className="relative aspect-[3/4] mb-6 rounded-lg overflow-hidden">
              <Image
                src={event.poster_url}
                alt={event.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          
          {event.description && (
            <div className="prose max-w-none mb-6">
              <p className="text-gray-700 leading-relaxed">{event.description}</p>
            </div>
          )}

          {(event.cast && event.cast.length > 0) && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Users className="h-5 w-5" />
                {t.cast}
              </h3>
              <div className="flex flex-wrap gap-2">
                {event.cast.map((actor: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {actor}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {event.director && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{t.director}</h3>
              <p className="text-gray-700">{event.director}</p>
            </div>
          )}

          {(event.company && event.company.length > 0) && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">{t.company}</h3>
              <div className="flex flex-wrap gap-2">
                {event.company.map((comp: string, index: number) => (
                  <Badge key={index} variant="outline">
                    {comp}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">{t.eventDetails}</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">{formatDate(event.event_date)}</p>
                  <p className="text-sm text-gray-600">{t.date}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">{formatTime(event.event_time)}</p>
                  <p className="text-sm text-gray-600">{t.time}</p>
                </div>
              </div>

              {event.venue && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">{event.venue.name}</p>
                    <p className="text-sm text-gray-600">{t.venue}</p>
                    {event.venue.address && (
                      <p className="text-sm text-gray-500">{event.venue.address}</p>
                    )}
                  </div>
                </div>
              )}

              {event.performance_language && (
                <div className="flex items-start gap-3">
                  <Languages className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">{event.performance_language}</p>
                    <p className="text-sm text-gray-600">{t.performanceLanguage}</p>
                  </div>
                </div>
              )}

              {event.subtitles && (
                <div className="flex items-start gap-3">
                  <Subtitles className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">{translateSubtitleLanguages(event.subtitles, resolvedParams.lang)}</p>
                    <p className="text-sm text-gray-600">{t.subtitles}</p>
                  </div>
                </div>
              )}

              {event.duration && (
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">{event.duration}</p>
                    <p className="text-sm text-gray-600">{t.duration}</p>
                  </div>
                </div>
              )}

              {event.genre && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t.genre}</p>
                  <Badge variant="secondary">{event.genre}</Badge>
                </div>
              )}

              <Separator />

              <div className="text-center">
                <p className="text-2xl font-bold text-primary mb-2">
                  {event.price} {t.currency}
                </p>
                <Button asChild className="w-full">
                  <Link href={`/${resolvedParams.lang}/ticket-reservation?event=${event.id}`}>
                    {t.bookTickets}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}