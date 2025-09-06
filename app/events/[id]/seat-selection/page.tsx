"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"
import { ArrowLeft, MapPin, Calendar, Clock, Users, Ticket } from "lucide-react"
import { useAuth } from "@/components/providers/supabase-auth-provider"
import { toast } from "@/hooks/use-toast"
import { isAdminEmail } from "@/lib/auth"

interface Seat {
  id: number
  row_number: number
  seat_number: number
  is_available: boolean
  is_accessible: boolean
}

interface Section {
  section: {
    id: number
    name: string
    type: string
  }
  seats: Seat[]
}

interface EventData {
  event: {
    id: number
    title: string
    translation_group: string | null
  }
  sections: Section[]
  total_seats: number
  available_seats: number
  booked_seats: number
}

interface Event {
  id: number
  title: string
  date: string
  time: string
  price: string
  venue: string
  theatreName: string
  theatreCity: string
  theatreCountry: string
}

export default function SeatSelectionPage() {
  const params = useParams()
  const router = useRouter()
  const { t } = useLanguage()
  const { user } = useAuth()
  const [event, setEvent] = useState<Event | null>(null)
  const [eventData, setEventData] = useState<EventData | null>(null)
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])
  const [loading, setLoading] = useState(true)
  const [reserving, setReserving] = useState(false)

  const maxSeats = user?.email && isAdminEmail(user.email) ? 999 : 2

  const fetchEventAndSeats = useCallback(async () => {
    try {
      setLoading(true)
      
      // Fetch seats data
      const seatsResponse = await fetch(`/api/events/${params.id}/seats`)
      
      if (seatsResponse.ok) {
        const seatsData = await seatsResponse.json()
        setEventData(seatsData)
      }

      // Fetch event details
      const eventResponse = await fetch(`/api/events/${params.id}`)
      
      if (eventResponse.ok) {
        const eventDetails = await eventResponse.json()
        setEvent(eventDetails)
      }

      if (!seatsResponse.ok || !eventResponse.ok) {
        toast({
          title: "Error",
          description: "Failed to load event details",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load event details",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }, [params.id])

  useEffect(() => {
    fetchEventAndSeats()
  }, [fetchEventAndSeats])

  const handleSeatSelect = (seat: Seat) => {
    if (!seat.is_available) return

    const isSelected = selectedSeats.some(s => s.id === seat.id)
    
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id))
    } else {
      if (selectedSeats.length >= maxSeats) {
        toast({
          title: "Seat limit reached",
          description: user?.email && isAdminEmail(user.email) 
            ? "You can select unlimited seats as an admin" 
            : `You can only select up to ${maxSeats} seats per event`,
          variant: "destructive"
        })
        return
      }
      setSelectedSeats([...selectedSeats, seat])
    }
  }

  const handleReservation = async () => {
    if (selectedSeats.length === 0) {
      toast({
        title: "No seats selected",
        description: "Please select at least one seat to continue",
        variant: "destructive"
      })
      return
    }

    if (!user) {
      router.push('/auth/login')
      return
    }

    setReserving(true)
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          event_id: params.id,
          seat_ids: selectedSeats.map(seat => seat.id)
        })
      })

      if (response.ok) {
        const booking = await response.json()
        toast({
          title: "Reservation successful!",
          description: `Your booking reference is ${booking.booking_reference}`
        })
        router.push(`/profile?tab=upcoming`)
      } else {
        const error = await response.json()
        toast({
          title: "Reservation failed",
          description: error.message || "Failed to reserve seats",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reserve seats",
        variant: "destructive"
      })
    } finally {
      setReserving(false)
    }
  }

  const getSeatColor = (seat: Seat) => {
    if (!seat.is_available) return "bg-red-300 cursor-not-allowed"
    if (selectedSeats.some(s => s.id === seat.id)) return "bg-blue-500 text-white"
    if (seat.is_accessible) return "bg-green-200 hover:bg-green-300"
    return "bg-gray-200 hover:bg-gray-300"
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-muted-foreground">{t("loading")}</p>
        </div>
      </div>
    )
  }

  if (!event || !eventData) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-muted-foreground">Event not found</p>
        </div>
      </div>
    )
  }

  // Helper function to extract numeric price from string
  const getPriceValue = (priceString: string): number => {
    if (priceString === 'Free' || priceString === 'TBA') return 0
    // Extract number from string like "€25" or "25"
    const match = priceString.match(/\d+(\.\d+)?/)
    return match ? parseFloat(match[0]) : 0
  }

  const totalPrice = selectedSeats.length * getPriceValue(event.price)

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back button */}
      <Button 
        variant="ghost" 
        onClick={() => router.back()}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t('back')}
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Event Info */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{event.title}</CardTitle>
              <CardDescription>{event.theatreName}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {event.time}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {event.venue}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Available: {eventData.available_seats} / {eventData.total_seats}
                </div>
              </div>

              {selectedSeats.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">{t("selectedSeats")}</h4>
                  <div className="space-y-1">
                    {selectedSeats.map(seat => {
                      const sectionData = eventData.sections.find(s => 
                        s.seats.some(seatInSection => seatInSection.id === seat.id)
                      )
                      return (
                        <div key={seat.id} className="text-sm">
                          {sectionData?.section.name} - Row {seat.row_number}, Seat {seat.seat_number}
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{t("total")}:</span>
                      <span className="font-bold">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}

              <Button 
                onClick={handleReservation}
                disabled={selectedSeats.length === 0 || reserving}
                className="w-full"
              >
                <Ticket className="w-4 h-4 mr-2" />
                {reserving ? t("reserving") : t("reserveSeats")}
              </Button>

              <div className="text-xs text-muted-foreground">
                {user?.email && isAdminEmail(user.email) 
                  ? "As an admin, you can select unlimited seats" 
                  : `You can select up to ${maxSeats} seats per event`
                }
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Seat Map */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t("selectSeats")}</CardTitle>
              <CardDescription>
                {t("clickSeatsToSelect")} - {selectedSeats.length}/{maxSeats === 999 ? '∞' : maxSeats} {t("selected")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Legend */}
              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <span>{t("available")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span>{t("selected")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-300 rounded"></div>
                  <span>{t("unavailable")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-200 rounded"></div>
                  <span>{t("accessible")}</span>
                </div>
              </div>

              {/* Stage */}
              <div className="text-center mb-8">
                <div className="bg-gray-800 text-white py-2 px-4 rounded mx-auto inline-block">
                  {t("stage")}
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-8">
                {eventData.sections && eventData.sections.length > 0 ? (
                  eventData.sections.map(sectionData => (
                    <div key={sectionData.section.id}>
                    <h3 className="font-medium mb-4">
                      {sectionData.section.name} 
                      <Badge variant="outline" className="ml-2">
                        {sectionData.section.type}
                      </Badge>
                    </h3>
                    
                    {/* Group seats by row */}
                    {Object.entries(
                      sectionData.seats.reduce((acc, seat) => {
                        if (!acc[seat.row_number]) acc[seat.row_number] = []
                        acc[seat.row_number].push(seat)
                        return acc
                      }, {} as Record<number, Seat[]>)
                    ).map(([rowNumber, seats]) => (
                      <div key={rowNumber} className="flex items-center gap-2 mb-2">
                        <div className="w-8 text-sm font-medium text-center">
                          {rowNumber}
                        </div>
                        <div className="flex gap-1">
                          {seats
                            .sort((a, b) => a.seat_number - b.seat_number)
                            .map(seat => (
                            <button
                              key={seat.id}
                              onClick={() => handleSeatSelect(seat)}
                              disabled={!seat.is_available}
                              className={`w-8 h-8 text-xs rounded transition-colors ${
                                getSeatColor(seat)
                              }`}
                              title={`Row ${seat.row_number}, Seat ${seat.seat_number}${seat.is_accessible ? ' (Accessible)' : ''}${!seat.is_available ? ' (Unavailable)' : ''}`}
                            >
                              {seat.seat_number}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No seats available for this event.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}