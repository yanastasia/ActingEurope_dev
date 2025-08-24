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

export default function PerformancesPage() {
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
        const response = await fetch(`/api/events?language=${language}`)
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
  }, [language])

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
  }, [searchTerm, selectedGenre, selectedVenue, performances])

  const genres = [...new Set(performances.map(p => p.genre))]
  const venues = [...new Set(performances.map(p => p.venue))]

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-muted-foreground">Loading performances...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-blue mb-2">{t("performances")}</h1>
        <p className="text-muted-foreground">Discover amazing theatrical performances from across Europe</p>
      </div>

      {/* Filters */}
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search performances..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedGenre} onValueChange={setSelectedGenre}>
          <SelectTrigger>
            <SelectValue placeholder="Select genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            {genres.map(genre => (
              <SelectItem key={genre} value={genre}>{genre}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedVenue} onValueChange={setSelectedVenue}>
          <SelectTrigger>
            <SelectValue placeholder="Select venue" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Venues</SelectItem>
            {venues.map(venue => (
              <SelectItem key={venue} value={venue}>{venue}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button 
          variant="outline" 
          onClick={() => {
            setSearchTerm("")
            setSelectedGenre("all")
            setSelectedVenue("all")
          }}
        >
          Clear Filters
        </Button>
      </div>

      {/* Performances Grid */}
      {filteredPerformances.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No performances found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria or check back later.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPerformances.map((performance) => (
            <Card key={performance.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <Image
                  src={performance.imageUrl || "/placeholder.svg"}
                  alt={performance.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{performance.title}</CardTitle>
                  <Badge className="bg-primary-gold/20 text-secondary-blue">
                    {performance.genre}
                  </Badge>
                </div>
                <CardDescription>
                  {performance.theatreName 
                    ? (t(performance.theatreName) || performance.theatreName)
                    : (Array.isArray(performance.company) 
                      ? performance.company.join(' & ') 
                      : performance.company)}
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
                    <Link href={`/performances/${performance.id}`}>
                      View Details
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/ticket-reservation">
                      Book Tickets
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