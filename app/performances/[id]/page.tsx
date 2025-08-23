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

export default function PerformancePage({ params }: { params: Promise<{ id: string }> }) {
  const { t, language } = useLanguage()
  const [performance, setPerformance] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState<string>('')

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setId(resolvedParams.id)
    }
    getParams()
  }, [params])

  useEffect(() => {
    if (!id) return
    
    const fetchPerformance = async () => {
      setLoading(true)
      // Extract original ID if it's prefixed
      const originalId = id.startsWith('performance-') ? id.replace('performance-', '') : id
      
      try {
        const response = await fetch(`/api/events/${originalId}?language=${language}`, {
          cache: 'no-store'
        })
        if (response.ok) {
          const data = await response.json()
          setPerformance(data)
        }
      } catch (error) {
        console.error('Error fetching performance:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPerformance()
  }, [id, language])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!performance) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary-blue mb-4">{t('performanceNotFound') || 'Performance Not Found'}</h1>
          <p className="text-muted-foreground mb-6">{t('performanceNotFoundDesc') || "The performance you're looking for doesn't exist."}</p>
          <Link href="/program" className="text-primary-gold hover:underline">← {t('backToProgram') || 'Back to Program'}</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/performances">Performances</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{performance.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="mb-6 aspect-video relative overflow-hidden rounded-lg">
            <Image
              src={performance.imageUrl || "/placeholder.svg"}
              alt={performance.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <h1 className="mb-2 text-3xl font-bold text-secondary-blue md:text-4xl">{performance.title}</h1>
          <p className="mb-4 text-xl text-muted-foreground">
            {Array.isArray(performance.company) ? performance.company.join(' & ') : performance.company}
          </p>

          <div className="mb-6 flex flex-wrap gap-2">
            <Badge className="bg-primary-gold/20 text-secondary-blue">{performance.genre}</Badge>
            <Badge className="bg-muted">{performance.language}</Badge>
            <Badge className="bg-muted">{performance.duration}</Badge>
          </div>

          <div className="mb-8 space-y-4 rounded-lg bg-muted/30 p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary-gold" />
              <span className="font-medium">{performance.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary-gold" />
              <span className="font-medium">{performance.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary-gold" />
              <div>
                <div className="font-medium">{translations[language][performance.venue as keyof typeof translations[typeof language]] || performance.venue}</div>
              </div>
            </div>
          </div>

          <h2 className="mb-4 text-2xl font-semibold text-secondary-blue">{translations[language].synopsis}</h2>
          <div className="mb-8 space-y-4">
            {performance.synopsis ? performance.synopsis.split("\n\n").map((paragraph: string, index: number) => (
              <p key={index} className="text-muted-foreground">
                {paragraph}
              </p>
            )) : (
              <p className="text-muted-foreground">No synopsis available.</p>
            )}
          </div>

          {(performance.director !== "TBA" || performance.cast.length > 0) && (
            <>
              <h2 className="mb-4 text-2xl font-semibold text-secondary-blue">Cast & Crew</h2>
              <div className="mb-8 space-y-2">
                {performance.director !== "TBA" && (
                  <div className="flex">
                    <span className="w-24 font-medium">{translations[language].director}:</span>
                    <span className="text-muted-foreground">{performance.director}</span>
                  </div>
                )}
                {performance.cast.length > 0 && (
                  <div className="flex flex-col">
                    <span className="mb-2 w-24 font-medium">{translations[language].cast}:</span>
                    <ul className="ml-6 list-disc space-y-1">
                      {performance.cast.map((actor: string, index: number) => (
                        <li key={index} className="text-muted-foreground">
                          {actor}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <div className="sticky top-20 space-y-6 rounded-lg border p-6">
            <h2 className="text-xl font-semibold text-secondary-blue">{translations[language].bookYourTickets}</h2>
            <Separator />

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">{translations[language].date}:</span>
                <span>{performance.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{translations[language].time}:</span>
                <span>{performance.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{translations[language].venue}:</span>
                <span>{translations[language][performance.venue as keyof typeof translations[typeof language]] || performance.venue}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{translations[language].duration}:</span>
                <span>{performance.duration}</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Languages className="h-5 w-5 text-primary-gold" />
                <span className="text-sm">{performance.language}</span>
              </div>
              {performance.subtitles && (
                <div className="flex items-center gap-2">
                  <Subtitles className="h-5 w-5 text-primary-gold" />
                  <span className="text-sm">{translations[language].subtitles} {performance.subtitles}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary-gold" />
                <span className="text-sm">{translations[language].suitableForAges}</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <Button className="w-full" size="lg" asChild>
                <Link href="/ticket-reservation">{translations[language].bookTicket}</Link>
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                {translations[language].addToCalendar}
              </Button>
            </div>

            <div className="mt-6 rounded-lg bg-muted/30 p-4 text-center text-sm">
              <p className="font-medium">{translations[language].needAssistance}</p>
              <p className="text-muted-foreground">{translations[language].contactBoxOffice}</p>
              <p className="text-primary-gold">tickets@actingeurope.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
