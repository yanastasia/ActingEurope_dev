'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Calendar, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'

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

export default function ParticipantsPage() {
  const { t, language } = useLanguage()
  const [theatres, setTheatres] = useState<Theatre[]>([])
  const [selectedTheatre, setSelectedTheatre] = useState<Theatre | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTheatres = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/theatres?language=${language}`)
        if (response.ok) {
          const theatreData = await response.json()
          setTheatres(theatreData)
        } else {
          console.error('Failed to fetch theatres')
        }
      } catch (error) {
        console.error('Error fetching theatres:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTheatres()
  }, [language])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p>{t('loading')} {t('participants').toLowerCase()}...</p>
        </div>
      </div>
    )
  }

  const openModal = (theatre: Theatre) => {
    setSelectedTheatre(theatre)
    setCurrentImageIndex(0)
  }

  const closeModal = () => {
    setSelectedTheatre(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedTheatre && selectedTheatre.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === selectedTheatre.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedTheatre && selectedTheatre.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedTheatre.images.length - 1 : prev - 1
      )
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-secondary-blue">{t('participants')}</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          {t('participantsDescription')}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {theatres.map((theatre) => (
          <Card key={theatre.id} className="overflow-hidden transition-all hover:shadow-lg cursor-pointer" onClick={() => openModal(theatre)}>
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={theatre.images.find((img) => img.is_primary)?.image_url || "/placeholder.svg"}
                alt={theatre.name}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="flex items-center gap-1 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {theatre.city}, {theatre.country}
                  </span>
                </div>
              </div>
            </div>

            <CardHeader className="p-4">
              <CardTitle className="line-clamp-2 text-xl text-secondary-blue">{theatre.name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {t('founded')} {theatre.founded_year}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-4 pt-0">
              <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">{theatre.description}</p>

              <div className="mb-4 flex flex-wrap gap-1">
                {theatre.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag.tag_name}
                  </Badge>
                ))}
                {theatre.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{theatre.tags.length - 3} {t('more')}
                  </Badge>
                )}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); openModal(theatre); }}>
                  {t('learnMore')}
                </Button>
                {theatre.website && (
                  <Button variant="ghost" size="sm" asChild onClick={(e) => e.stopPropagation()}>
                    <a href={theatre.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal */}
      {selectedTheatre && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={closeModal}>
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
              >
                ✕
              </button>
              
              {/* Image Gallery */}
              <div className="relative h-64 md:h-96">
                <Image
                  src={selectedTheatre.images[currentImageIndex]?.image_url || '/placeholder.svg'}
                  alt={selectedTheatre.name}
                  fill
                  className="object-cover"
                />
                {selectedTheatre.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </>
                )}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
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
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl font-bold">{selectedTheatre.name}</h2>
                  {selectedTheatre.website && (
                    <Link href={selectedTheatre.website} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {t('visitWebsite')}
                      </Button>
                    </Link>
                  )}
                </div>
                
                <div className="flex items-center gap-4 mb-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedTheatre.city}, {selectedTheatre.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{t('founded')} {selectedTheatre.founded_year}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">{t('about')}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedTheatre.description}
                  </p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">{t('history')}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedTheatre.history}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">{t('tags')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTheatre.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag.tag_name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-16 rounded-lg bg-muted/30 p-8 text-center">
        <h2 className="mb-4 text-2xl font-semibold text-secondary-blue">{t('culturalExchange')}</h2>
        <p className="mx-auto max-w-3xl text-muted-foreground">
          {t('culturalExchangeDesc')}
        </p>
      </div>
    </div>
  )
}
