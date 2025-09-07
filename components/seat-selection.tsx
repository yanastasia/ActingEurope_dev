"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/language-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// Removed database-storage import - now using API
import { isAdmin, isAuthenticated } from "@/lib/auth"

interface SeatSelectionProps {
  venueId: number | string
  eventId?: number | string
  onSeatsSelected: (seats: { id: number, name: string }[]) => void
  isUserAdmin?: boolean
}

interface Venue {
  id: string
  name: string
  description: string
  rows: VenueRow[]
  sections?: VenueSection[]
}

interface VenueSection {
  id: string
  sectionName: string
  sectionType: string
  rows: VenueRow[]
}

interface VenueRow {
  rowNumber: number
  seats: VenueSeat[]
}

interface VenueSeat {
  id: number
  seatNumber: number
  isAccessible: boolean
  isBooked?: boolean
}

export default function SeatSelection({ venueId, eventId, onSeatsSelected, isUserAdmin = false }: SeatSelectionProps) {
  const { toast } = useToast()
  const { t } = useLanguage()
  const [selectedSeats, setSelectedSeats] = useState<{ id: number, name: string }[]>([])
  const [venue, setVenue] = useState<Venue | null>(null)
  const [loading, setLoading] = useState(true)

  const admin = isAdmin()
  const loggedIn = isAuthenticated()

  // Helper function to group seats by row for event seats API
  const groupSeatsByRow = (seats: any[]) => {
    const rowMap = new Map()
    
    seats.forEach(seat => {
      if (!rowMap.has(seat.row_number)) {
        rowMap.set(seat.row_number, {
          rowNumber: seat.row_number,
          seats: []
        })
      }
      
      rowMap.get(seat.row_number).seats.push({
        id: seat.id,
        seatNumber: seat.seat_number,
        isAccessible: seat.is_accessible,
        isBooked: !seat.is_available // Convert is_available to isBooked
      })
    })
    
    return Array.from(rowMap.values()).sort((a, b) => a.rowNumber - b.rowNumber)
  }

  useEffect(() => {
    const loadVenue = async () => {
      try {
        // Use event seats API if eventId is provided, otherwise fallback to venues API
        const apiUrl = eventId ? `/api/events/${eventId}/seats` : `/api/venues/${venueId}`
        const response = await fetch(apiUrl)
        
        if (response.ok) {
          const data = await response.json()
          
          let transformedVenue: Venue
          
          if (eventId) {
            // Transform event seats API response
            transformedVenue = {
              id: venueId.toString(),
              name: data.event?.title || "Theatre",
              description: "",
              rows: [],
              sections: data.sections?.map((section: any) => ({
                id: section.section.id.toString(),
                sectionName: section.section.name,
                sectionType: section.section.type,
                rows: groupSeatsByRow(section.seats)
              })) || []
            }
          } else {
            // Transform venues API response
            transformedVenue = {
              id: data.id,
              name: data.name,
              description: data.description || "",
              rows: data.sections?.[0]?.rows || [],
              sections: data.sections || []
            }
          }
          
          setVenue(transformedVenue)
        } else {
          // Fallback to default venue if API fails
          const defaultVenue: Venue = {
            id: venueId.toString(),
            name: "Main Theatre",
            description: "Main theatre venue",
            rows: [
              { 
                rowNumber: 1, 
                seats: Array.from({ length: 10 }, (_, i) => ({ 
                  id: (1 * 10) + i + 1,
                  seatNumber: i + 1, 
                  isAccessible: i === 0 || i === 9,
                  isBooked: false 
                }))
              },
              { 
                rowNumber: 2, 
                seats: Array.from({ length: 10 }, (_, i) => ({ 
                  id: (2 * 10) + i + 1,
                  seatNumber: i + 1, 
                  isAccessible: i === 0 || i === 9,
                  isBooked: false 
                }))
              },
              { 
                rowNumber: 3, 
                seats: Array.from({ length: 10 }, (_, i) => ({ 
                  id: (3 * 10) + i + 1,
                  seatNumber: i + 1, 
                  isAccessible: i === 0 || i === 9,
                  isBooked: false 
                }))
              },
              { 
                rowNumber: 4, 
                seats: Array.from({ length: 10 }, (_, i) => ({ 
                  id: (4 * 10) + i + 1,
                  seatNumber: i + 1, 
                  isAccessible: i === 0 || i === 9,
                  isBooked: false 
                }))
              },
              { 
                rowNumber: 5, 
                seats: Array.from({ length: 10 }, (_, i) => ({ 
                  id: (5 * 10) + i + 1,
                  seatNumber: i + 1, 
                  isAccessible: i === 0 || i === 9,
                  isBooked: false 
                }))
              }
            ]
          }
          setVenue(defaultVenue)
        }
      } catch (error) {
        console.error("Error loading venue:", error)
      } finally {
        setLoading(false)
      }
    }

    loadVenue()
  }, [venueId, eventId])

  // Update the toggleSeat function to handle admin reservations
  const toggleSeat = (seatId: string) => {
    // Find the actual seat data from venue to get the database ID
    let seatDbId: number | null = null
    if (venue) {
      for (const section of venue.sections || []) {
        for (const row of section.rows) {
          for (const seat of row.seats) {
            if (`${row.rowNumber}-${seat.seatNumber}` === seatId) {
              seatDbId = seat.id
              break
            }
          }
          if (seatDbId) break
        }
        if (seatDbId) break
      }
      
      // If not found in sections, check main rows
      if (!seatDbId) {
        for (const row of venue.rows) {
          for (const seat of row.seats) {
            if (`${row.rowNumber}-${seat.seatNumber}` === seatId) {
              seatDbId = seat.id
              break
            }
          }
          if (seatDbId) break
        }
      }
    }
    
    if (!seatDbId) {
      console.error('Could not find seat ID for:', seatId)
      return
    }
    
    const seatObj = { id: seatDbId, name: seatId }
    const isSelected = selectedSeats.some(seat => seat.name === seatId)
    
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((seat) => seat.name !== seatId))
    } else {
      if (!isUserAdmin && selectedSeats.length >= 2) {
        toast({
          title: t("maxSeatsReached"),
          description: t("maxSeatsReachedDesc"),
          variant: "destructive",
        })
        return
      }
      setSelectedSeats([...selectedSeats, seatObj])
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
          if (!row.seats || row.seats.length === 0) {
            return (
              <div key={row.rowNumber} className="flex items-center justify-center">
                <div className="mr-4 w-8 text-right font-medium flex-shrink-0">{row.rowNumber}</div>
                <div className="flex justify-center">
                  <div className="text-sm text-muted-foreground italic">No seats in this row</div>
                </div>
              </div>
            )
          }

          return (
            <div key={row.rowNumber} className="flex items-center justify-center">
              <div className="mr-4 w-8 text-right font-medium flex-shrink-0">{row.rowNumber}</div>
              <div className="flex justify-center gap-1 max-w-fit">
                {row.seats.map((seat) => {
                  const seatId = `${row.rowNumber}-${seat.seatNumber}`
                  const isSelected = selectedSeats.some(seat => seat.name === seatId)
                  const isBooked = seat.isBooked || false
                  const isAccessible = seat.isAccessible

                  return (
                    <button
                      key={seatId}
                      className={`h-7 w-7 rounded-t-md text-xs font-medium transition-colors relative ${
                        isBooked
                          ? "cursor-not-allowed bg-slate-300 text-slate-600 border-2 border-slate-400"
                          : isAccessible
                            ? isSelected
                              ? "bg-blue-600 text-white border-2 border-blue-800"
                              : "bg-blue-100 text-blue-800 border-2 border-blue-300 hover:bg-blue-200"
                            : isSelected
                              ? "bg-primary-gold text-white"
                              : "bg-muted hover:bg-primary-gold/30"
                      }`}
                      onClick={(event) => {
                        if (isUserAdmin && event.type === "contextmenu") {
                          event.preventDefault()
                          handleReserveSeat(seatId, isBooked)
                        } else if (!isBooked && (!isAccessible || isUserAdmin)) {
                          toggleSeat(seatId)
                        } else if (isAccessible && !isUserAdmin) {
                          toast({
                            title: "Accessible Seat",
                            description: "This seat is reserved for people with disabilities. Please contact staff if you need assistance.",
                            variant: "default",
                          })
                        }
                      }}
                      onContextMenu={(event) => {
                        if (isUserAdmin) {
                          event.preventDefault()
                          handleReserveSeat(seatId, isBooked)
                        }
                      }}
                      disabled={isBooked && !isUserAdmin}
                      aria-label={`${t("seat")} ${seatId}${isAccessible ? ' (Accessible)' : ''}`}
                      title={isAccessible ? 'Accessible seat for people with disabilities' : ''}
                    >
                      {seat.seatNumber}
                      {isAccessible && (
                        <span className="absolute -top-1 -right-1 text-[8px] bg-blue-600 text-white rounded-full w-3 h-3 flex items-center justify-center">
                          ♿
                        </span>
                      )}
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

  // Use actual sections from venue data or create default section
  const sections = venue.sections && venue.sections.length > 0 
    ? venue.sections.map(section => ({
        id: section.id,
        name: section.sectionName || section.sectionType,
        type: section.sectionType,
        rows: section.rows || [],
      }))
    : [
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
        <div className="mb-2 text-sm font-medium">
          {venue.name === "Main Stage" ? t("mainStage") : 
           venue.name === "Chamber Stage" ? t("chamberStage") : 
           venue.name}
        </div>
        <p className="text-sm text-muted-foreground">
          {t("selectedSeats")}: {selectedSeats.length > 0 ? selectedSeats.map(seat => seat.name).join(", ") : t("none")}
          {isUserAdmin ? (
            <span className="ml-2 text-primary-gold">(Admin: Unlimited seats)</span>
          ) : (
            <span className="ml-2 text-gray-600">({selectedSeats.length}/2 seats)</span>
          )}
        </p>
      </div>

      {/* Confirm Selection Button - moved to top right */}
       <div className="flex justify-end mb-2">
         <Button onClick={handleConfirm}>{t("confirmSelection")}</Button>
       </div>

      <div className="mx-auto max-w-4xl">
        {/* Stage */}
        <div className="mb-6 mx-auto max-w-xs rounded-md bg-primary-gold/20 border border-primary-gold/30 p-3 text-center">
          <div className="text-sm font-medium text-secondary-blue">
            {t("stage")}
          </div>
        </div>

        {/* Legend */}
        <div className="mb-6 flex justify-center gap-4 text-xs">
          <div className="flex items-center">
            <div className="mr-1 h-4 w-4 rounded-sm bg-muted"></div>
            <span>{t("available")}</span>
          </div>
          <div className="flex items-center">
            <div className="mr-1 h-4 w-4 rounded-sm bg-primary-gold"></div>
            <span>{t("selected")}</span>
          </div>
          <div className="flex items-center">
            <div className="mr-1 h-4 w-4 rounded-sm bg-slate-300 border border-slate-400"></div>
            <span>{t("unavailable")}</span>
          </div>
        </div>

        {sections.length > 1 ? (
          <Tabs defaultValue={sections[0].id.toString()}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              {sections.map((section) => (
                <TabsTrigger key={section.id} value={section.id.toString()}>
                  {section.name === "Regular" ? t("regularSeating") : 
                   section.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {sections.map((section) => (
              <TabsContent key={section.id} value={section.id.toString()}>
                <div className="mb-4 text-center">
                  <h3 className="text-lg font-medium text-secondary-blue">
                    {section.name === "Regular" ? t("regularSeating") : 
                     section.name}
                  </h3>
                </div>
                {renderSeatMap(section.rows)}
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div>
            <div className="mb-4 text-center">
              <h3 className="text-lg font-medium text-secondary-blue">
                {sections[0].name === "Regular" ? t("regularSeating") : 
                 sections[0].name}
              </h3>
            </div>
            {renderSeatMap(sections[0].rows)}
          </div>
        )}



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
