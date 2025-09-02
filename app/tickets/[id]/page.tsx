"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import { Calendar, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SeatSelection from "@/components/seat-selection"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/language-context"

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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })
  const [attendeeNames, setAttendeeNames] = useState<string[]>([])
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [performance, setPerformance] = useState<any>(null)
  const [venues, setVenues] = useState<any[]>([])
  const [currentVenue, setCurrentVenue] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [bookingReference, setBookingReference] = useState("")
  const [loading, setLoading] = useState(true)

  // Load specific performance and venues
  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        setLoading(true)
        
        // Fetch all events and find the specific one
        const response = await fetch('/api/events')
        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }
        const eventsData = await response.json()
        
        // Find the performance by ID (extract numeric ID from performance-X format)
        const numericId = performanceId.replace('performance-', '')
        const foundEvent = eventsData.find((event: any) => event.id.toString() === numericId)
        
        if (!foundEvent) {
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
          price: getBGNPrice(foundEvent.price),
          rawPrice: foundEvent.price === "Free" ? 0 : Number.parseFloat(foundEvent.price.replace("€", "")),
          performanceLanguage: foundEvent.performanceLanguage,
          description: foundEvent.description,
        }

        setPerformance(mappedPerformance)
        try {
          const venueResponse = await fetch(`/api/venues/${venueIdToUse}`)
          if (venueResponse.ok) {
            const venueData = await venueResponse.json()
            setCurrentVenue(venueData)
          }
        } catch (venueError) {
          console.error('Error fetching venue:', venueError)
        }
      } catch (error) {
        console.error('Error fetching performance:', error)
        toast({
          title: t("error"),
          description: t("performanceNotFound") || "Performance not found",
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
      } catch (error) {
        console.error('Error fetching venues:', error)
        setVenues([])
      }
    }

    if (performanceId) {
      fetchPerformance()
      loadVenues()
    }
  }, [performanceId, router, toast, t])

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

  const handleSeatsSelected = (seats: string[]) => {
    setSelectedSeats(seats)
    // Initialize attendee names array with empty strings
    setAttendeeNames(new Array(seats.length).fill(""))
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: t("missingInformation"),
        description: t("pleaseCompleteForm"),
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
      const bookingData = {
        title: performance.title,
        date: performance.date,
        time: performance.time,
        venue: performance.venue,
        seats: selectedSeats,
        attendeeNames: attendeeNames,
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        price: performance.rawPrice,
      }

      // Save booking to database
      const dbBookingData = {
        userId: 1, // TODO: Replace with actual authenticated user ID
        eventId: performance.id as number,
        selectedSeats: selectedSeats.map((seatName, index) => ({
          id: index + 1,
          rowNumber: seatName.charCodeAt(0) - 64,
          seatNumber: parseInt(seatName.substring(1)),
        })),
        attendee_names: selectedSeats.map((seatName, index) => ({
          seatId: (index + 1).toString(),
          fullName: attendeeNames[index]
        })),
        totalAmount: selectedSeats.length * performance.rawPrice,
        customerEmail: formData.email,
        customerName: `${formData.firstName} ${formData.lastName}`.trim(),
      }

      // Save booking via API
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dbBookingData),
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
    } catch (error) {
      console.error("Booking error:", error)
      toast({
        title: t("bookingError"),
        description: error instanceof Error ? error.message : t("failedToCompleteBooking"),
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const resetBooking = () => {
    setStep(1)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    })
    setSelectedSeats([])
    setAttendeeNames([])
    setBookingReference("")
  }

  // Get venue ID from venue name
  const getVenueId = (venueName: string) => {
    const venue = venues.find((v) => v.name === venueName)
    return venue ? venue.id : venueName
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">{t("loading") || "Loading..."}</span>
        </div>
      </div>
    )
  }

  if (!performance) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary-blue mb-4">{t("performanceNotFound") || "Performance Not Found"}</h1>
          <Button onClick={() => router.push('/tickets')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("backToTickets") || "Back to Tickets"}
          </Button>
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
                onSeatsSelected={handleSeatsSelected}
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
                      key={seat}
                      className="rounded-md bg-primary-gold/20 px-2 py-1 text-sm font-medium text-secondary-blue"
                    >
                      {seat}
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
                    <div key={seat} className="flex items-center gap-3">
                      <div className="min-w-[60px] rounded-md bg-primary-gold/20 px-2 py-1 text-sm font-medium text-secondary-blue text-center">
                        {seat}
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

              {/* Customer Information Form */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t("firstName")} *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{t("lastName")} *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("email")} *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("phone")}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

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