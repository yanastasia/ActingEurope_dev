"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import { Calendar, ArrowLeft, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SeatSelection from "@/components/seat-selection"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/language-context"
import { isAdminEmail, getUserEmail } from "@/lib/auth"

import { Loader2 } from "lucide-react"

// Define Event interface
interface Event {
  id: number
  title: string
  eventType: string
  date: string
  time: string
  venue: string
  company: string[]
  description: string
  imageUrl: string
  isFeatured: boolean
  price: number
  tags: string[]
  performanceLanguage?: string
  subtitleLanguage?: string
}

export default function IndividualTicketPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const { t } = useLanguage()
  const performanceId = params.id as string

  // Helper function to fix company names
  const fixCompanyName = (companyName: string) => {
    return companyName
      .replace(/OSAIK "39 Monkeys"/g, 'OSAIK "36 Monkeys"')
      .replace(/ОСАИК "39 Маймуни"/g, 'ОСАИК "36 Маймуни"')
      .replace(/ОСАИК "39 Мајмуни"/g, 'ОСАИК "36 Мајмуни"')
      .replace(/ОСАИК "39 Мајмуна"/g, 'ОСАИК "36 Мајмуна"')
  }

  const [step, setStep] = useState(1) // 1: seat selection, 2: details form, 3: confirmation
  const [formData, setFormData] = useState({})
  const [attendeeNames, setAttendeeNames] = useState<string[]>([])
  const [selectedSeats, setSelectedSeats] = useState<{ id: number, name: string }[]>([])
  const [performance, setPerformance] = useState<any>(null)
  const [venues, setVenues] = useState<any[]>([])
  const [currentVenue, setCurrentVenue] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [bookingReference, setBookingReference] = useState("")
  
  // Check if current user is admin or sales
  const isAdminOrSales = () => {
    const email = getUserEmail() || ''
    return isAdminEmail(email) || email.toLowerCase() === 'sales@actingeurope.eu'
  }
  const [loading, setLoading] = useState(true)

  // Load specific performance and venues
  useEffect(() => {
    const abortController = new AbortController()
    
    const fetchPerformance = async () => {
      try {
        setLoading(true)
        
        // Fetch all events and find the specific one
        const response = await fetch('/api/events', {
          signal: abortController.signal
        })
        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }
        const eventsData = await response.json()
        
        // Find the performance by ID (extract numeric ID from performance-X or event-X format)
        const numericId = performanceId.replace(/^(performance-|event-)/, '')
        console.log('Looking for performance with ID:', numericId)
        console.log('Available events:', eventsData.map((e: any) => ({ id: e.id, title: e.title })))
        const foundEvent = eventsData.find((event: any) => event.id.toString() === numericId)
        console.log('Found event:', foundEvent)
        
        if (!foundEvent) {
          console.error('Performance not found. Looking for ID:', numericId, 'in events:', eventsData.map((e: any) => e.id))
          throw new Error('Performance not found')
        }

        const getBGNPrice = (euroPrice: string) => {
          if (!euroPrice || euroPrice === "Free") return "Free"
          const numericPrice = Number.parseFloat(euroPrice.replace("€", ""))
          return `${(numericPrice * 1.96).toFixed(2)} лв.`
        }

        // Fetch venue details - use venue_id if available, otherwise map venue name to ID
         let venueIdToUse = foundEvent.venue_id
         if (!venueIdToUse) {
           // Map venue names to IDs when venue_id is null
           const venueNameToId: Record<string, number> = {
             "Main Stage": 16,
             "Chamber Stage": 17
           }
           venueIdToUse = venueNameToId[foundEvent.venue as string] || 17
         }

        const mappedPerformance = {
          id: `performance-${foundEvent.id}`,
          title: foundEvent.title,
          company: foundEvent.company,
          date: foundEvent.date,
          time: foundEvent.time,
          venue: foundEvent.venue,
          venueId: venueIdToUse,
          imageUrl: foundEvent.imageUrl || "/placeholder.svg?height=200&width=300",
          price: getBGNPrice(`€${foundEvent.price}`),
          rawPrice: Number(foundEvent.price) || 0,
          performanceLanguage: foundEvent.performanceLanguage,
          description: foundEvent.description,
        }

        setPerformance(mappedPerformance)
        try {
          const venueResponse = await fetch(`/api/venues/${venueIdToUse}`, {
            signal: abortController.signal
          })
          if (venueResponse.ok) {
            const venueData = await venueResponse.json()
            setCurrentVenue(venueData)
          }
        } catch (venueError: unknown) {
          if (venueError instanceof DOMException && venueError.name === 'AbortError') return;
          console.error('Error fetching venue:', venueError)
        }
      } catch (error: unknown) {
        // Ignore aborts triggered by cleanup/unmount or StrictMode re-mount
        if (error instanceof DOMException && error.name === 'AbortError') return;
        
        console.error('Error fetching performance:', error)
        const errorMessage = error instanceof Error ? error.message : (t("performanceNotFound") || "Performance not found")
        toast({
          title: t("error"),
          description: errorMessage,
          variant: "destructive",
        })
        router.push('/tickets')
      } finally {
        setLoading(false)
      }
    }

    const loadVenues = async () => {
      try {
        const response = await fetch('/api/venues')
        if (!response.ok) {
          throw new Error('Failed to fetch venues')
        }
        const venuesData = await response.json()
        setVenues(venuesData)
      } catch (error: unknown) {
        console.error('Error fetching venues:', error)
        setVenues([])
      }
    }

    if (performanceId) {
      fetchPerformance()
      loadVenues()
    }
    
    return () => {
      try {
        abortController.abort()
      } catch (error: unknown) {
        // Ignore abort errors during cleanup
        console.debug('AbortController cleanup:', error)
      }
    }
  }, [performanceId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAttendeeNameChange = (index: number, value: string) => {
    setAttendeeNames((prev) => {
      const updated = [...prev]
      updated[index] = value
      return updated
    })
  }

  const handleSeatsSelected = (seats: { id: number, name: string }[]) => {
    setSelectedSeats(seats)
    // Initialize attendee names array with empty strings
    setAttendeeNames(new Array(seats.length).fill(""))
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Get user email from session
    const userEmail = await getUserEmail()
    if (!userEmail) {
      toast({
        title: t("authRequired") || "Authentication Required",
        description: t("pleaseLogin") || "Please log in to book tickets",
        variant: "destructive",
      })
      setIsProcessing(false)
      return
    }

    // Validate attendee names
    const emptyAttendeeNames = attendeeNames.some((name, index) => !name.trim())
    if (emptyAttendeeNames) {
      toast({
        title: t("missingInformation"),
        description: t("pleaseEnterAllAttendeeNames") || "Please enter names for all attendees",
        variant: "destructive",
      })
      setIsProcessing(false)
      return
    }

    try {
      if (!performance) {
        throw new Error("Performance not found")
      }

      // Prepare booking data for ticket generation
      const ticketData = {
        title: performance.title,
        date: performance.date,
        time: performance.time,
        venue: performance.venue,
        seats: selectedSeats.map(seat => seat.name),
        attendeeNames: attendeeNames,
        customerName: userEmail,
        email: userEmail,
        phone: "",
        price: performance.rawPrice,
      }

      // User is already authenticated via session, no need to create/sync user

      // Validate data before constructing booking object
      if (!performance || !performance.id) {
        throw new Error('Performance data is missing or invalid')
      }

      if (!selectedSeats || selectedSeats.length === 0) {
        throw new Error('No seats selected')
      }

      const eventId = parseInt(performance.id.toString().replace('performance-', ''))
      if (isNaN(eventId) || eventId <= 0) {
        throw new Error('Invalid event ID parsed from performance')
      }

      // Prepare booking data in the format expected by the API
      const apiBookingData = {
        event_id: eventId,
        seat_ids: selectedSeats.map(seat => seat.id),
        attendee_names: selectedSeats.map((seat, index) => ({
          seatId: seat.id.toString(),
          fullName: attendeeNames[index]
        })),
      }

      console.log('=== BOOKING REQUEST ===')
      console.log('API Booking data:', JSON.stringify(apiBookingData, null, 2))
      console.log('=======================')

      // Save booking via API
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiBookingData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save booking')
      }

      // Get booking response data
      const responseData = await response.json()
      const bookingRef = responseData.booking?.booking_reference || ''
      setBookingReference(bookingRef)

      // Show confirmation
      setStep(3)

      toast({
        title: t("bookingConfirmed"),
        description: t("bookingConfirmedDesc"),
      })
    } catch (error: unknown) {
      console.error("Booking error:", error)
      const errorMessage = error instanceof Error ? error.message : t("failedToCompleteBooking")
      toast({
        title: t("bookingError"),
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const resetBooking = () => {
    setStep(1)
    setFormData({})
    setSelectedSeats([])
    setAttendeeNames([])
    setBookingReference("")
  }

  // Get venue ID from venue name
  const getVenueId = (venueName: string) => {
    const venue = venues.find((v) => v.name === venueName)
    return venue ? venue.id : venueName
  }

  if (loading || !performance) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">{t("loading") || "Loading..."}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-secondary-blue text-center">
        </h1>
      </div>

      {/* Performance Info Card */}
      <Card className="mb-8 overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            <div className="relative h-64 md:h-auto md:w-1/3">
              <Image
                src={performance.imageUrl || "/placeholder.svg"}
                alt={performance.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <h2 className="mb-2 text-2xl font-bold text-secondary-blue">
                  {t(performance.title) || performance.title}
                </h2>
                <p className="mb-4 text-lg text-muted-foreground">
                  {Array.isArray(performance.company) 
                    ? performance.company.map((comp: string) => fixCompanyName(t(comp) || comp)).join(' & ') 
                    : fixCompanyName(t(performance.company) || performance.company)
                  }
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary-gold" />
                    <span className="font-medium">
                      {performance.date} {t("at")} {performance.time}
                    </span>
                  </div>
                  {currentVenue && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary-gold" />
                      <span className="font-medium">
                        {t(currentVenue.name) || currentVenue.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Steps */}
      <div className="mx-auto max-w-4xl">
        {/* Step Navigation */}
        {step > 1 && (
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => setStep(Math.max(1, step - 1))}
              className="mb-2"
            >
              ← {t("back")}
            </Button>
          </div>
        )}

        {/* Step 1: Seat Selection */}
        {step === 1 && (
          <div>
            {/* Back to tickets button at the top */}
             <div className="mb-6">
               <Button
                variant="ghost"
                onClick={() => router.push('/tickets')}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("back")}
              </Button>
             </div>
            
            <h3 className="mb-6 text-xl font-semibold text-secondary-blue">{t("selectSeats") || "Select Seats"}</h3>
            {performance && performance.venueId ? (
              <SeatSelection
                venueId={performance.venueId}
                eventId={performance.id.replace('performance-', '')}
                onSeatsSelected={handleSeatsSelected}
                isUserAdmin={isAdminOrSales()}
              />
            ) : (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <h3 className="mb-2 text-lg font-medium">{t("loadingSeats") || "Loading seats..."}</h3>
                <p className="mb-4 text-muted-foreground">{t("pleaseWait") || "Please wait while we load the seating chart."}</p>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Customer Details */}
        {step === 2 && (
          <div>
            <h3 className="mb-6 text-xl font-semibold text-secondary-blue">{t("yourDetails")}</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Selected Seats Summary */}
              <div className="rounded-lg border bg-card p-4">
                <div className="mb-2 font-medium">{t("selectedSeats")}</div>
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map((seat) => (
                    <div
                      key={seat.id}
                      className="rounded-md bg-primary-gold/20 px-2 py-1 text-sm font-medium text-secondary-blue"
                    >
                      {seat.name}
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-right text-sm">
                  <span className="font-medium">{t("total")}:</span>{" "}
                  {`${(performance.rawPrice * selectedSeats.length * 1.96).toFixed(2)} лв.`}
                </div>
              </div>

              {/* Attendee Names Section */}
              <div className="rounded-lg border bg-card p-4">
                <div className="mb-4 font-medium">{t("attendeeNames") || "Attendee Names"}</div>
                <div className="space-y-3">
                  {selectedSeats.map((seat, index) => (
                    <div key={seat.id} className="flex items-center gap-3">
                      <div className="min-w-[60px] rounded-md bg-primary-gold/20 px-2 py-1 text-sm font-medium text-secondary-blue text-center">
                        {seat.name}
                      </div>
                      <div className="flex-1">
                        <Input
                          placeholder={t("enterAttendeeName") || "Enter attendee name"}
                          value={attendeeNames[index] || ""}
                          onChange={(e) => handleAttendeeNameChange(index, e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* No additional customer information needed - using logged-in user's email */}

              <Button type="submit" className="w-full" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("processing") || "Processing..."}
                  </>
                ) : (
                  t("confirmBooking") || "Confirm Booking"
                )}
              </Button>
              

            </form>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="text-center">
            <div className="mb-6 rounded-lg border bg-green-50 p-6">
              <h3 className="mb-2 text-xl font-semibold text-green-800">
                {t("bookingConfirmed") || "Booking Confirmed!"}
              </h3>
              <p className="text-green-700">
                {t("bookingConfirmedDesc") || "Your booking has been confirmed and tickets have been sent to your email."}
              </p>
              {bookingReference && (
                <div className="mt-4">
                  <span className="font-medium">{t("bookingReference") || "Booking Reference"}: </span>
                  <span className="font-mono text-lg">{bookingReference}</span>
                </div>
              )}
            </div>
            
            <div className="space-x-4">
              <Button onClick={() => router.push('/tickets')}>
                {t("backToTickets") || "Back to Tickets"}
              </Button>
              <Button onClick={resetBooking} variant="outline">
                {t("bookAnother") || "Book Another"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}