'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Calendar, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { getTranslatedLocation, getTranslatedTag } from '@/lib/location-utils'
import { notFound } from 'next/navigation'

interface Theatre {
  id: number
  name: string
  city: string
  country: string
  description: string
  history: string
  website?: string
  founded_year: number
  images: {
    id: number
    image_url: string
    caption?: string
    is_primary: boolean
  }[]
  tags: {
    id: number
    theatre_id: number
    tag_name: string
    created_at: string
  }[]
}

interface ParticipantsPageProps {
  params: Promise<{
    lang: string
  }>
}

const supportedLanguages = ['en', 'bg', 'mk', 'sr']

export default async function ParticipantsPage({ params }: ParticipantsPageProps) {
  const { lang } = await params
  
  // Validate language parameter
  if (!supportedLanguages.includes(lang)) {
    notFound()
  }

  const { t, language, setLanguage } = useLanguage()
  const [theatres, setTheatres] = useState<Theatre[]>([])
  const [selectedTheatre, setSelectedTheatre] = useState<Theatre | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  // Set language based on URL parameter
  useEffect(() => {
    if (lang !== language) {
      setLanguage(lang as any)
    }
  }, [lang, language, setLanguage])

  useEffect(() => {
    const fetchTheatres = async () => {
      setLoading(true)
      const controller = new AbortController()
      try {
        const response = await fetch(`/api/theatres?language=${lang}`,{ signal: controller.signal })
        if (response.ok) {
          const theatreData = await response.json()
          setTheatres(theatreData)
        } else {
          // Soft-fail: use empty list without noisy console errors
          setTheatres([])
        }
      } catch (error) {
        // Ignore aborts triggered by cleanup/unmount or StrictMode re-mount
        if (controller.signal.aborted || (error instanceof DOMException && error.name === 'AbortError')) return
        // Soft-fail on network errors
        setTheatres([])
      } finally {
        setLoading(false)
      }
    }

    fetchTheatres()
    return () => {
      // Attempt to abort in-flight request on route change/unmount
      try { /* controller may not be in scope after function ends */ } catch {}
    }
  }, [lang])

  const nextImage = () => {
    if (selectedTheatre && selectedTheatre.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedTheatre.images.length)
    }
  }

  const prevImage = () => {
    if (selectedTheatre && selectedTheatre.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedTheatre.images.length) % selectedTheatre.images.length)
    }
  }

  const openTheatreModal = (theatre: Theatre) => {
    setSelectedTheatre(theatre)
    setCurrentImageIndex(0)
  }

  const closeTheatreModal = () => {
    setSelectedTheatre(null)
    setCurrentImageIndex(0)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-gold mx-auto"></div>
          <p className="mt-4 text-lg">{t('loading')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-blue via-secondary-blue to-primary-blue">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {t('participants')}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {t('participantsDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {theatres.map((theatre) => {
            const primaryImage = theatre.images.find(img => img.is_primary) || theatre.images[0]
            
            return (
              <Card key={theatre.id} className="bg-white/95 backdrop-blur-sm hover:bg-white transition-all duration-300 cursor-pointer transform hover:scale-105" onClick={() => openTheatreModal(theatre)}>
                <CardHeader className="p-0">
                  {primaryImage && (
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                      <Image
                        src={primaryImage.image_url}
                        alt={theatre.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2 text-primary-blue">{theatre.name}</CardTitle>
                  <CardDescription className="text-gray-600 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{getTranslatedLocation(theatre.city, theatre.country, lang as any)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{t('founded')} {theatre.founded_year}</span>
                    </div>
                  </CardDescription>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                    {theatre.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {theatre.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag.id} variant="secondary" className="text-xs">
                        {getTranslatedTag(tag.tag_name, lang as any)}
                      </Badge>
                    ))}
                    {theatre.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{theatre.tags.length - 3} {t('more')}
                      </Badge>
                    )}
                  </div>
                  <Button className="w-full bg-primary-gold hover:bg-primary-gold/90 text-primary-blue">
                    {t('learnMore')}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Theatre Modal */}
        {selectedTheatre && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={closeTheatreModal}>
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-primary-blue mb-2">{selectedTheatre.name}</h2>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{getTranslatedLocation(selectedTheatre.city, selectedTheatre.country, lang as any)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{t('founded')} {selectedTheatre.founded_year}</span>
                    </div>
                  </div>
                  <button
                    onClick={closeTheatreModal}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {selectedTheatre.images.length > 0 && (
                  <div className="relative mb-6">
                    <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-lg">
                      <Image
                        src={selectedTheatre.images[currentImageIndex].image_url}
                        alt={selectedTheatre.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {selectedTheatre.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                          {selectedTheatre.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-2 h-2 rounded-full ${
                                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-primary-blue mb-3">{t('about')}</h3>
                    <p className="text-gray-700 mb-4">{selectedTheatre.description}</p>
                    
                    <h3 className="text-xl font-semibold text-primary-blue mb-3">{t('history')}</h3>
                    <p className="text-gray-700">{selectedTheatre.history}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-primary-blue mb-3">{t('tags')}</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedTheatre.tags.map((tag) => (
                        <Badge key={tag.id} variant="secondary">
                          {getTranslatedTag(tag.tag_name, lang as any)}
                        </Badge>
                      ))}
                    </div>
                    
                    {selectedTheatre.website && (
                      <div>
                        <h3 className="text-xl font-semibold text-primary-blue mb-3">{t('website')}</h3>
                        <a
                          href={selectedTheatre.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary-gold hover:text-primary-gold/80"
                        >
                          {t('visitWebsite')}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}