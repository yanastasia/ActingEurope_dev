'use client'

import { useEffect, useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, ExternalLink, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { notFound } from "next/navigation"
import { useLanguage } from '@/lib/language-context'
import { getTranslatedLocation, getTranslatedTag } from '@/lib/location-utils'

interface Theatre {
  id: number
  name: string
  description: string
  history: string
  city: string
  country: string
  foundedYear: number
  website?: string
  content_language: string
  translation_group?: string
  images: {
    id: number
    imageUrl: string
    caption?: string
    isPrimary: boolean
  }[]
  tags: string[]
}

interface ParticipantPageProps {
  params: Promise<{ lang: string; id: string }>
}



export default function TheatrePage({ params }: ParticipantPageProps) {
  const [theatre, setTheatre] = useState<Theatre | null>(null)
  const [loading, setLoading] = useState(true)
  const { language, t } = useLanguage()
  const [resolvedParams, setResolvedParams] = useState<{ lang: string; id: string } | null>(null)

  useEffect(() => {
    params.then(setResolvedParams)
  }, [params])

  useEffect(() => {
    if (!resolvedParams) return

    const { lang, id } = resolvedParams
    
    // Validate language
    if (!['en', 'bg', 'mk', 'sr'].includes(lang)) {
      notFound()
      return
    }

    const fetchTheatre = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/theatres/${id}?lang=${language}`)
        if (!response.ok) {
          if (response.status === 404) {
            notFound()
            return
          }
          throw new Error('Failed to fetch theatre')
        }
        const data = await response.json()
        setTheatre(data)
      } catch (error) {
        console.error('Error fetching theatre:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchTheatre()
  }, [resolvedParams, language])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded mb-8"></div>
          <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    )
  }

  if (!theatre || !resolvedParams) {
    notFound()
    return null
  }


  const primaryImage = theatre.images.find((img) => img.isPrimary)
  const galleryImages = theatre.images.filter((img) => !img.isPrimary)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href={`/${resolvedParams.lang}/participants`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('backToParticipants')}
          </Link>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Hero Image */}
          {primaryImage && (
            <div className="mb-8 aspect-video relative overflow-hidden rounded-lg">
              <Image
                src={primaryImage.imageUrl || "/placeholder.svg"}
                alt={theatre.name}
                fill
                className="object-cover"
                priority
              />
              {primaryImage.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-sm text-white">{primaryImage.caption}</p>
                </div>
              )}
            </div>
          )}

          {/* Theatre Info */}
          <div className="mb-8">
            <h1 className="mb-4 text-3xl font-bold text-secondary-blue md:text-4xl">{theatre.name}</h1>
            <div className="mb-4 flex flex-wrap gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>
                  {getTranslatedLocation(theatre.city, theatre.country, t)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{t('foundedIn')} {theatre.foundedYear}</span>
              </div>
              {theatre.website && (
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <a
                    href={theatre.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-gold"
                  >
                    {t('website')}
                  </a>
                </div>
              )}
            </div>
            <p className="text-lg text-muted-foreground">{theatre.description}</p>
          </div>

          <Separator className="my-8" />

          {/* History */}
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-secondary-blue">{t('theatreHistory')}</h2>
            <div className="prose max-w-none">
              {theatre.history.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Gallery */}
          {galleryImages.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-secondary-blue">{t('gallery')}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {galleryImages.map((image) => (
                  <div key={image.id} className="aspect-video relative overflow-hidden rounded-lg">
                    <Image
                      src={image.imageUrl || "/placeholder.svg"}
                      alt={image.caption || theatre.name}
                      fill
                      className="object-cover"
                    />
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                        <p className="text-sm text-white">{image.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="text-secondary-blue">{t('theatreInformation')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="mb-2 font-medium">{t('location')}</h3>
                <p className="text-sm text-muted-foreground">
                    {getTranslatedLocation(theatre.city, theatre.country, t)}
                  </p>
              </div>

              <div>
                <h3 className="mb-2 font-medium">{t('founded')}</h3>
                <p className="text-sm text-muted-foreground">{theatre.foundedYear}</p>
              </div>

              {theatre.website && (
                <div>
                  <h3 className="mb-2 font-medium">{t('website')}</h3>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <a href={theatre.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t('visitWebsite')}
                    </a>
                  </Button>
                </div>
              )}

              <Separator />

              <div>
                <h3 className="mb-2 font-medium">{t('theatreTags')}</h3>
                <div className="flex flex-wrap gap-1">
                  {theatre.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {getTranslatedTag(tag, t)}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button className="w-full" asChild>
                  <Link href={`/${resolvedParams.lang}/program`}>{t('viewFestivalProgram')}</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/register-to-book">{t('bookTickets')}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}