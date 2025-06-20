"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SeatSelection from "@/components/seat-selection"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/language-context"
import { db } from "@/lib/database-storage"
import { generateAndSendTicket, type GenerateTicketResult } from "@/lib/user-verification"
import { Loader2 } from "lucide-react"

export default function TicketsPage() {
  const { toast } = useToast()
  const { t } = useLanguage()
  const [selectedPerformance, setSelectedPerformance] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [allPerformances, setAllPerformances] = useState<any[]>([])
  const [venues, setVenues] = useState<any[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [bookingReference, setBookingReference] = useState("")

  // Get events and venues from localStorage
  useEffect(() => {
    // Load events
    const events = db.getEvents()

    // Convert the price to BGN
    const getBGNPrice = (euroPrice: string) => {
      if (!euroPrice) return "Free"
      const numericPrice = Number.parseFloat(euroPrice.replace("€", ""))
      return `${(numericPrice * 1.96).toFixed(2)} лв.`
    }

    // Update the event mapping
    const performances = events
      .filter((event: any) => event.type === "performance")
      .map((event: any) => ({
        id: event.id,
        title: event.title,
        company: event.company || "Acting Europe Festival",
        date: event.date,
        time: event.time,
        venue: event.venue,
        imageUrl: event.imageUrl || "/placeholder.svg?height=200&width=300",
        price: event.price ? getBGNPrice(event.price) : "Free",
        rawPrice: event.price,
      }))

    setAllPerformances(performances)

    // Load venues
    setVenues(db.getVenues())

    // Listen for database updates
    const handleDatabaseUpdate = () => {
      const updatedEvents = db.getEvents()

      // Convert the price to BGN
      const getBGNPrice = (euroPrice: string) => {
        if (!euroPrice) return "Free"
        const numericPrice = Number.parseFloat(euroPrice.replace("€", ""))
        return `${(numericPrice * 1.96).toFixed(2)} лв.`
      }

      const updatedPerformances = updatedEvents
        .filter((event: any) => event.type === "performance")
        .map((event: any) => ({
          id: event.id,
          title: event.title,
          company: event.company || "Acting Europe Festival",
          date: event.date,
          time: event.time,
          venue: event.venue,
          imageUrl: event.imageUrl || "/placeholder.svg?height=200&width=300",
          price: event.price ? getBGNPrice(event.price) : "Free",
          rawPrice: event.price,
        }))

      setAllPerformances(updatedPerformances)
      setVenues(db.getVenues())
    }

    window.addEventListener("databaseUpdated", handleDatabaseUpdate)

    return () => {
      window.removeEventListener("databaseUpdated", handleDatabaseUpdate)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePerformanceSelect = (id: string) => {
    setSelectedPerformance(id)
    setStep(2)
  }

  const handleSeatsSelected = (seats: string[]) => {
    setSelectedSeats(seats)
    setStep(3)
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

    try {
      // Get selected performance data
      const selectedPerformanceData = allPerformances.find((p) => p.id === selectedPerformance)

      if (!selectedPerformanceData) {
        throw new Error("Performance not found")
      }

      // Prepare booking data for ticket generation
      const bookingData = {
        title: selectedPerformanceData.title,
        date: selectedPerformanceData.date,
        time: selectedPerformanceData.time,
        venue: selectedPerformanceData.venue,
        seats: selectedSeats,
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        price: selectedPerformanceData.rawPrice,
      }

      // Generate and send ticket
      const result: GenerateTicketResult = await generateAndSendTicket(bookingData)

      if (!result.success) {
        throw new Error(result.message || "Failed to generate ticket")
      }

      // Save booking reference
      setBookingReference(result.bookingReference || "")

      // Save booking to database
      const booking = {
        id: `ticket-${Date.now()}`,
        performanceId: selectedPerformance,
        seats: selectedSeats,
        customer: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        date: new Date().toISOString(),
        bookingReference: result.bookingReference,
      }

      db.addBooking(booking)

      // Show confirmation
      setStep(4)
      setShowConfirmation(true)

      toast({
        title: t("bookingConfirmed"),
        description: t("bookingConfirmedDesc"),
      })
    } catch (error) {
      console.error("Booking error:", error)
      toast({
        title: "Booking Error",
        description: error instanceof Error ? error.message : "Failed to complete booking",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const resetBooking = () => {
    setSelectedPerformance(null)
    setStep(1)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    })
    setSelectedSeats([])
    setShowConfirmation(false)
    setBookingReference("")
  }

  // Update the price display in the tickets page
  const selectedPerformanceData = selectedPerformance ? allPerformances.find((p) => p.id === selectedPerformance) : null

  // Get venue ID from venue name
  const getVenueId = (venueName: string) => {
    const venue = venues.find((v) => v.name === venueName)
    return venue ? venue.id : venueName
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-center text-4xl font-bold text-secondary-blue">{t("bookTickets")}</h1>

      <Tabs defaultValue="performances" className="mx-auto max-w-4xl">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="performances">{t("Performances")}</TabsTrigger>
          <TabsTrigger value="workshops">{t("workshops")}</TabsTrigger>
        </TabsList>

        <TabsContent value="performances">
          <div className="mb-8 rounded-lg bg-muted/30 p-4">
            {step > 1 && selectedPerformanceData && (
              <div className="mb-4">
                <Button variant="ghost" className="mb-2" onClick={() => setStep(Math.max(1, step - 1))}>
                  ← {t("back")}
                </Button>
                <div className="flex items-center justify-between rounded-lg border bg-card p-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded">
                      <Image
                        src={selectedPerformanceData.imageUrl || "/placeholder.svg"}
                        alt={selectedPerformanceData.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-blue">{selectedPerformanceData.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedPerformanceData.date} • {selectedPerformanceData.time} •{" "}
                        {selectedPerformanceData.venue}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-secondary-blue">{selectedPerformanceData.price}</div>
                    <div className="text-sm text-muted-foreground">{t("perTicket")}</div>
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <>
                <h2 className="mb-4 text-xl font-semibold text-secondary-blue">{t("availablePerformances")}</h2>
                {allPerformances.length > 0 ? (
                  <div className="space-y-4">
                    {allPerformances.map((performance) => (
                      <Card key={performance.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="relative h-48 md:h-auto md:w-1/3">
                              <Image
                                src={performance.imageUrl || "/placeholder.svg"}
                                alt={performance.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex flex-1 flex-col justify-between p-4">
                              <div>
                                <h3 className="mb-1 text-lg font-semibold text-secondary-blue">{performance.title}</h3>
                                <p className="mb-2 text-sm text-muted-foreground">{performance.company}</p>
                                <div className="mb-4 space-y-1 text-sm">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-primary-gold" />
                                    <span>
                                      {performance.date} at {performance.time}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="font-medium">{t("venue")}:</span> {performance.venue}
                                  </div>
                                  <div>
                                    <span className="font-medium">{t("price")}:</span> {performance.price}
                                  </div>
                                </div>
                              </div>
                              <Button onClick={() => handlePerformanceSelect(performance.id)}>{t("bookTicket")}</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <h3 className="mb-2 text-lg font-medium">{t("noPerformancesYet")}</h3>
                    <p className="mb-4 text-muted-foreground">{t("noPerformancesYetDesc")}</p>
                  </div>
                )}
              </>
            )}

            {step === 2 && selectedPerformanceData && (
              <div>
                <h3 className="mb-4 text-lg font-semibold text-secondary-blue">{t("selectSeats")}</h3>
              <SeatSelection venueId={selectedPerformanceData.venueId} onSeatsSelected={handleSeatsSelected} />
              </div>
            )}

            {step === 3 && selectedPerformanceData && (
              <div>
                <h3 className="mb-4 text-lg font-semibold text-secondary-blue">{t("yourDetails")}</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                      {`${(Number.parseFloat(selectedPerformanceData.rawPrice.replace("€", "")) * selectedSeats.length * 1.96).toFixed(2)} лв.`}
                    </div>
                  </div>

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
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
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
                      <p className="text-xs text-muted-foreground">Your tickets will be sent to this email address</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        {t("phone")} ({t("optional")})
                      </Label>
                      <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isProcessing}>
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        t("completeBooking")
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {step === 4 && showConfirmation && selectedPerformanceData && (
              <div className="rounded-lg border bg-card p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-secondary-blue">{t("bookingConfirmed")}</h3>
                <p className="mb-4 text-muted-foreground">{t("bookingConfirmationEmail")}</p>

                <div className="mb-6 rounded-lg border bg-muted/30 p-4 text-left">
                  <div className="mb-2 font-medium">{t("bookingDetails")}</div>
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="font-medium">{t("performance")}:</span> {selectedPerformanceData.title}
                    </div>
                    <div>
                      <span className="font-medium">{t("date")}:</span> {selectedPerformanceData.date}
                    </div>
                    <div>
                      <span className="font-medium">{t("time")}:</span> {selectedPerformanceData.time}
                    </div>
                    <div>
                      <span className="font-medium">{t("venue")}:</span> {selectedPerformanceData.venue}
                    </div>
                    <div>
                      <span className="font-medium">{t("seats")}:</span> {selectedSeats.join(", ")}
                    </div>
                    <div>
                      <span className="font-medium">{t("total")}:</span>{" "}
                      {`${(Number.parseFloat(selectedPerformanceData.rawPrice.replace("€", "")) * selectedSeats.length * 1.96).toFixed(2)} лв.`}
                    </div>
                    {bookingReference && (
                      <div>
                        <span className="font-medium">Booking Reference:</span> {bookingReference}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <Button onClick={resetBooking}>{t("bookAnotherTicket")}</Button>
                  <Button variant="outline">{t("downloadTicket")}</Button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="workshops">
          <div className="rounded-lg border p-6 text-center">
            <h3 className="mb-2 text-lg font-semibold text-secondary-blue">{t("workshopsComingSoon")}</h3>
            <p className="text-muted-foreground">{t("workshopsComingSoonDesc")}</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
