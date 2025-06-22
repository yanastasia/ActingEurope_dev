"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/language-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ds, DatabaseStorage, Event } from "@/lib/database-storage"
import { isAdmin, isAuthenticated } from "@/lib/auth"

interface SeatSelectionProps {
  venueId: number | string
  onSeatsSelected: (seats: string[]) => void
  isUserAdmin?: boolean
}

interface Venue {
  id: string
  name: string
  description: string
  rows: VenueRow[]
}

interface VenueRow {
  rowNumber: number
  seatCount: number
}

export default function SeatSelection({ venueId, onSeatsSelected, isUserAdmin = false }: SeatSelectionProps) {
  const { toast } = useToast()
  const { t } = useLanguage()
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [venue, setVenue] = useState<Venue | null>(null)
  const [loading, setLoading] = useState(true)

  const admin = isAdmin()
  const loggedIn = isAuthenticated()

  useEffect(() => {
    const loadVenue = async () => {
      try {
        // Load venues from database
        const venues = await ds.getVenues()
        // Find the venue by id or name
        const foundVenue = venues.find((v: Venue) => v.id === venueId.toString() || v.name === venueId)

        if (foundVenue) {
          setVenue(foundVenue)
        } else {
          // Use first venue as fallback
          setVenue(venues[0] || null)
        }
      } catch (error) {
        console.error("Error loading venue:", error)
      } finally {
        setLoading(false)
      }
    }

    loadVenue()

    // Listen for database updates
    const handleDatabaseUpdate = async (event: CustomEvent<any>) => {
      const currentDbInstance = (event as CustomEvent).detail as DatabaseStorage;
      const updatedVenues = await currentDbInstance.getVenues();
      setVenue(updatedVenues.find((v: Venue) => v.id === venueId.toString() || v.name === venueId) || null);
    }

    window.addEventListener("databaseUpdated", handleDatabaseUpdate as unknown as EventListener)

    return () => {
      window.removeEventListener("databaseUpdated", handleDatabaseUpdate as unknown as EventListener)
    }
  }, [venueId])

  // Update the toggleSeat function to handle admin reservations
  const toggleSeat = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId))
    } else {
      if (!isUserAdmin && selectedSeats.length >= 5) {
        toast({
          title: t("maxSeatsReached"),
          description: t("maxSeatsReachedDesc"),
          variant: "destructive",
        })
        return
      }
      setSelectedSeats([...selectedSeats, seatId])
    }
  }

  // Add a function to handle admin seat reservation
  const handleReserveSeat = (seatId: string, isUnavailable: boolean) => {
    if (!isUserAdmin) return

    // Toggle the seat's availability
    const [rowNum, seatNum] = seatId.split("-").map(Number)

    // In a real app, this would update a database
    // For this demo, we'll just show a toast notification
    toast({
      title: isUnavailable ? "Seat Released" : "Seat Reserved",
      description: `Seat ${seatId} has been ${isUnavailable ? "made available" : "reserved for sponsors"}`,
    })
  }

  const handleConfirm = () => {
    if (selectedSeats.length === 0) {
      toast({
        title: t("noSeatsSelected"),
        description: t("pleaseSelectSeats"),
        variant: "destructive",
      })
      return
    }

    onSeatsSelected(selectedSeats)
  }

  const renderSeatMap = (rows: VenueRow[]) => {
    return (
      <div className="space-y-2">
        {rows.map((row) => {
          // Skip rows with 0 seats
          if (row.seatCount === 0) {
            return (
              <div key={row.rowNumber} className="flex items-center">
                <div className="mr-2 w-6 text-center font-medium">{row.rowNumber}</div>
                <div className="flex flex-1 justify-center">
                  <div className="text-sm text-muted-foreground italic">No seats in this row</div>
                </div>
              </div>
            )
          }

          // Generate seats for the row
          const seats = Array.from({ length: row.seatCount }, (_, i) => ({
            rowNumber: row.rowNumber,
            seatNumber: i + 1,
            isAvailable: Math.random() > 0.1, // 90% availability for demo
          }))

          return (
            <div key={row.rowNumber} className="flex items-center">
              <div className="mr-2 w-6 text-center font-medium">{row.rowNumber}</div>
              <div className="flex flex-1 justify-center gap-1">
                {seats.map((seat) => {
                  const seatId = `${seat.rowNumber}-${seat.seatNumber}`
                  const isSelected = selectedSeats.includes(seatId)
                  const isUnavailable = !seat.isAvailable

                  return (
                    <button
                      key={seatId}
                      className={`h-7 w-7 rounded-t-md text-xs font-medium transition-colors ${
                        isUnavailable
                          ? "cursor-not-allowed bg-gray-200 text-gray-400"
                          : isSelected
                            ? "bg-primary-gold text-white"
                            : "bg-muted hover:bg-primary-gold/30"
                      }`}
                      onClick={(event) => {
                        if (isUserAdmin && event.type === "contextmenu") {
                          event.preventDefault()
                          handleReserveSeat(seatId, isUnavailable)
                        } else if (!isUnavailable) {
                          toggleSeat(seatId)
                        }
                      }}
                      onContextMenu={(event) => {
                        if (isUserAdmin) {
                          event.preventDefault()
                          handleReserveSeat(seatId, isUnavailable)
                        }
                      }}
                      disabled={isUnavailable && !isUserAdmin}
                      aria-label={`${t("seat")} ${seatId}`}
                    >
                      {seat.seatNumber}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-gold border-t-transparent mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Loading seating chart...</p>
        </div>
      </div>
    )
  }

  if (!venue) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">Venue not found</p>
      </div>
    )
  }

  // Split rows into sections (for demonstration purposes)
  // In a real app, you might have actual sections defined in your venue data
  const sections = [
    {
      id: "1",
      name: venue.name === "Main Stage" ? t("regularSeating") : t("mainSeating"),
      type: "regular",
      rows: venue.rows,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mb-2 text-lg font-semibold text-secondary-blue">{t("selectYourSeats")}</div>
        <div className="mb-2 text-sm font-medium">{venue.name}</div>
        <p className="text-sm text-muted-foreground">
          {t("selectedSeats")}: {selectedSeats.length > 0 ? selectedSeats.join(", ") : t("none")}
          {isUserAdmin && <span className="ml-2 text-primary-gold">(Admin: Unlimited seats)</span>}
        </p>
      </div>

      <div className="mx-auto max-w-4xl">
        {/* Stage */}
        <div className="mb-8 rounded-md bg-primary-gold/20 p-2 text-center text-sm font-medium text-secondary-blue">
          {t("stage")}
        </div>

        {sections.length > 1 ? (
          <Tabs defaultValue={sections[0].id.toString()}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              {sections.map((section) => (
                <TabsTrigger key={section.id} value={section.id.toString()}>
                  {section.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {sections.map((section) => (
              <TabsContent key={section.id} value={section.id.toString()}>
                <div className="mb-4 text-center">
                  <h3 className="text-lg font-medium text-secondary-blue">{section.name}</h3>
                </div>
                {renderSeatMap(section.rows)}
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div>
            <div className="mb-4 text-center">
              <h3 className="text-lg font-medium text-secondary-blue">{sections[0].name}</h3>
            </div>
            {renderSeatMap(sections[0].rows)}
          </div>
        )}

        {/* Legend */}
        <div className="mb-6 flex justify-center gap-4 text-xs mt-6">
          <div className="flex items-center">
            <div className="mr-1 h-4 w-4 rounded-sm bg-muted"></div>
            <span>{t("available")}</span>
          </div>
          <div className="flex items-center">
            <div className="mr-1 h-4 w-4 rounded-sm bg-primary-gold"></div>
            <span>{t("selected")}</span>
          </div>
          <div className="flex items-center">
            <div className="mr-1 h-4 w-4 rounded-sm bg-gray-200"></div>
            <span>{t("unavailable")}</span>
          </div>
        </div>

        <div className="flex justify-center">
          <Button onClick={handleConfirm}>{t("confirmSelection")}</Button>
        </div>
      </div>
      {isUserAdmin && (
        <div className="mt-4 rounded-md bg-muted p-3 text-sm">
          <p className="font-medium text-secondary-blue">Admin Instructions:</p>
          <p className="text-muted-foreground">Right-click on a seat to reserve it for sponsors (free of charge).</p>
        </div>
      )}
    </div>
  )
}
