"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/lib/language-context"
import { Calendar, Clock, MapPin, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Language } from "@/lib/language-context"

// Helper function to fix company names
const fixCompanyName = (name: string): string => {
  return name
    .replace(/OSAIK "39 Monkeys"/g, 'OCAAC "36 Monkeys"')
    .replace(/ОСАИК "39 Маймуни"/g, 'ОСАИК „36 Маймуни"')
    .replace(/ОСАИК "39 Мајмуни"/g, 'ОСАУК „36 Мајмуни"')
    .replace(/ОСАУК "39 мајмуна"/g, 'ОСАУК „36 мајмуна"')
}

interface Performance {
  id: string
  title: string
  company: string[]
  theatreName?: string
  director: string
  date: string
  time: string
  venue: string
  imageUrl: string
  genre: string
  language: string
  duration: string
  synopsis: string
}

interface PerformancesPageProps {
  params: {
    lang: Language
  }
}

export default function PerformancesPage({ params }: PerformancesPageProps) {
  const router = useRouter()
  const { t, language } = useLanguage()
  const [performances, setPerformances] = useState<Performance[]>([])
  const [filteredPerformances, setFilteredPerformances] = useState<Performance[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [selectedVenue, setSelectedVenue] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch performances from API
    const fetchPerformances = async () => {
      try {
        const response = await fetch(`/api/events?language=${params.lang}`)
        if (response.ok) {
          const data = await response.json()
          setPerformances(data)
          setFilteredPerformances(data)
        }
      } catch (error) {
        console.error('Error fetching performances:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPerformances()
  }, [params.lang])

  useEffect(() => {
    // Filter performances based on search and filters
    let filtered = performances

    if (searchTerm) {
      filtered = filtered.filter(performance => 
        performance.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (performance.theatreName && performance.theatreName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        performance.company.some(comp => comp.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedGenre !== "all") {
      filtered = filtered.filter(performance => performance.genre === selectedGenre)
    }

    if (selectedVenue !== "all") {
      filtered = filtered.filter(performance => performance.venue === selectedVenue)
    }

    setFilteredPerformances(filtered)
  }, [performances, searchTerm, selectedGenre, selectedVenue])

  const genres = [...new Set(performances.map(p => p.genre))]
  const venues = [...new Set(performances.map(p => p.venue))]

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-gold mx-auto"></div>
          <p className="mt-4 text-muted-foreground">{t('loading')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold text-secondary-blue md:text-4xl">
          {t('performances')}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t('performancesDescription')}
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t('searchPerformances')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedGenre} onValueChange={setSelectedGenre}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder={t('selectGenre')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allGenres')}</SelectItem>
              {genres.map(genre => (
                <SelectItem key={genre} value={genre}>{genre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedVenue} onValueChange={setSelectedVenue}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder={t('selectVenue')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allVenues')}</SelectItem>
              {venues.map(venue => (
                <SelectItem key={venue} value={venue}>{t(venue) || venue}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Performance Cards */}
      {filteredPerformances.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">{t('noPerformancesFound')}</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPerformances.map((performance) => (
            <Card key={performance.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={performance.imageUrl}
                  alt={performance.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="line-clamp-2">{performance.title}</CardTitle>
                  <Badge className="bg-primary-gold/20 text-secondary-blue">
                    {performance.genre}
                  </Badge>
                </div>
                <CardDescription>
                  {performance.theatreName 
                    ? fixCompanyName(t(performance.theatreName) || performance.theatreName)
                    : (Array.isArray(performance.company) 
                      ? fixCompanyName(performance.company.join(' & ')) 
                      : fixCompanyName(performance.company))}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {performance.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {performance.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {t(performance.venue) || performance.venue}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href={`/${params.lang}/performances/${performance.id}`}>
                      {t('viewDetails')}
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/tickets">
                      {t('bookTickets')}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}