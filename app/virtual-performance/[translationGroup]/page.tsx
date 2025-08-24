'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, MapPin, Languages, Users, Subtitles, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguage, translations } from '@/lib/language-context'
import { useToast } from '@/hooks/use-toast'

interface VirtualPerformance {
  id: number
  translationGroup: string
  title: string
  description?: string
  eventType: string
  eventDate: string
  eventTime: string
  price: number
  imageUrl?: string
  posterUrl?: string
  genre?: string
  company: string[]
  director?: string
  cast: string[]
  synopsis?: string
  subtitles?: string
  duration?: string
  isFeatured: boolean
  theatre: {
    id: number
    name: string
    city: string
    country: string
  }
  venue?: {
    id: number
    name: string
    description?: string
    address?: string
    city?: string
    capacity?: number
  }
  venueId?: number
  languageVariants: {
    id: number
    language: string
    title: string
  }[]
  primaryLanguage: string
}

export default function VirtualPerformancePage() {
  const params = useParams()
  const router = useRouter()
  const { t, language } = useLanguage()
  const { toast } = useToast()
  const [virtualPerformance, setVirtualPerformance] = useState<VirtualPerformance | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const translationGroup = params.translationGroup as string

  useEffect(() => {
    const fetchVirtualPerformance = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/virtual-performance/${translationGroup}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch virtual performance')
        }
        
        const data = await response.json()
        setVirtualPerformance(data)
      } catch (err) {
        console.error('Error fetching virtual performance:', err)
        setError('Failed to load performance details')
        toast({
          title: 'Error',
          description: 'Failed to load performance details',
          variant: 'destructive'
        })
      } finally {
        setLoading(false)
      }
    }

    if (translationGroup) {
      fetchVirtualPerformance()
    }
  }, [translationGroup, toast])

  const handleBookTicket = () => {
    router.push('/ticket-reservation')
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-gold mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading performance details...</p>
        </div>
      </div>
    )
  }

  if (error || !virtualPerformance) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary-blue mb-4">Performance Not Found</h1>
          <p className="text-muted-foreground mb-6">{error || 'The performance you\'re looking for doesn\'t exist.'}</p>
          <Link href="/program" className="text-primary-gold hover:underline">
            <ArrowLeft className="inline h-4 w-4 mr-1" />
            Back to Program
          </Link>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Link href="/program" className="text-primary-gold hover:underline flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Program
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Performance Info */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{virtualPerformance.eventType}</Badge>
              {virtualPerformance.genre && <Badge variant="outline">{virtualPerformance.genre}</Badge>}
              {virtualPerformance.isFeatured && <Badge className="bg-primary-gold text-white">Featured</Badge>}
            </div>
            
            <h1 className="text-4xl font-bold text-secondary-blue">{virtualPerformance.title}</h1>
            
            {virtualPerformance.company && virtualPerformance.company.length > 0 && (
              <p className="text-xl text-primary-gold">
                {Array.isArray(virtualPerformance.company) 
                  ? virtualPerformance.company.map((comp: string) => t(comp) || comp).join(' & ') 
                  : (t(virtualPerformance.company) || virtualPerformance.company)}
              </p>
            )}
          </div>

          {/* Performance Image */}
          {(virtualPerformance.posterUrl || virtualPerformance.imageUrl) && (
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src={virtualPerformance.posterUrl || virtualPerformance.imageUrl || '/placeholder.svg'}
                alt={virtualPerformance.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Synopsis */}
          {virtualPerformance.synopsis && (
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-secondary-blue">Synopsis</h2>
              <p className="text-muted-foreground leading-relaxed">{virtualPerformance.synopsis}</p>
            </div>
          )}

          {/* Cast and Crew */}
          <div className="grid gap-4 md:grid-cols-2">
            {virtualPerformance.director && (
              <div>
                <h3 className="font-semibold text-secondary-blue mb-2">Director</h3>
                <p className="text-muted-foreground">{virtualPerformance.director}</p>
              </div>
            )}
            
            {virtualPerformance.cast && virtualPerformance.cast.length > 0 && (
              <div>
                <h3 className="font-semibold text-secondary-blue mb-2">Cast</h3>
                <p className="text-muted-foreground">{virtualPerformance.cast.join(', ')}</p>
              </div>
            )}
          </div>

          {/* Language Variants */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="h-5 w-5" />
                Available Languages
              </CardTitle>
              <CardDescription>
                This performance is available in multiple languages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {virtualPerformance.languageVariants.map((variant) => (
                  <Badge 
                    key={variant.id} 
                    variant={variant.language === virtualPerformance.primaryLanguage ? "default" : "outline"}
                  >
                    {variant.language.toUpperCase()}: {variant.title}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary-gold" />
                  <span className="text-sm">{formatDate(virtualPerformance.eventDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary-gold" />
                  <span className="text-sm">{formatTime(virtualPerformance.eventTime)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary-gold" />
                  <div className="text-sm">
                    <div>{virtualPerformance.venue?.name || 'Venue TBA'}</div>
                    <div className="text-muted-foreground">
                      {translations[language][virtualPerformance.theatre.name as keyof typeof translations[typeof language]] || virtualPerformance.theatre.name}, {virtualPerformance.theatre.city}
                    </div>
                  </div>
                </div>
                {virtualPerformance.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary-gold" />
                    <span className="text-sm">{t('duration')}: {virtualPerformance.duration}</span>
                  </div>
                )}
                {virtualPerformance.subtitles && (
                  <div className="flex items-center gap-2">
                    <Subtitles className="h-5 w-5 text-primary-gold" />
                    <span className="text-sm">{t('subtitles')}{virtualPerformance.subtitles}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary-gold" />
                  <span className="text-sm">Suitable for ages 12+</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Button className="w-full" size="lg" onClick={handleBookTicket}>
                  Book Ticket
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  Add to Calendar
                </Button>
              </div>

              <div className="mt-6 rounded-lg bg-muted/30 p-4 text-center text-sm">
                <p className="font-medium">Need assistance?</p>
                <p className="text-muted-foreground">Contact our box office at:</p>
                <p className="text-primary-gold">tickets@actingeurope.com</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}