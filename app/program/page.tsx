"use client"

import { useState, useEffect } from "react"
import { Calendar, Filter, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"
// Removed static import - now using API

// Define Event interface locally
interface Event {
  id: string
  title: string
  eventType: "performance" | "workshop" | "discussion"
  date: string
  time: string
  venue: string
  company: string[]
  description: string
  imageUrl: string
  posterUrl: string
  isFeatured: boolean
  tags: string[]
}
import Link from "next/link"

export default function ProgramPage() {
  const { t } = useLanguage()
  const [selectedDate, setSelectedDate] = useState<string>("All Dates")
  const [selectedVenue, setSelectedVenue] = useState("All Venues")
  const [selectedType, setSelectedType] = useState("All Types")
  const [events, setEvents] = useState<Event[]>([])
  const [dates, setDates] = useState<string[]>(["All Dates"])
  const [venues, setVenues] = useState<string[]>(["All Venues"])
  const [types, setTypes] = useState<string[]>(["All Types"])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events')
        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }
        const eventsData = await response.json()
        
        const mappedPerformances: Event[] = eventsData.map((event: any) => ({
          id: `performance-${event.id}`,
          title: event.title,
          eventType: event.eventType as "performance" | "workshop" | "discussion",
          date: event.date,
          time: event.time,
          venue: event.venue,
          company: event.company,
          description: event.synopsis,
          imageUrl: event.imageUrl,
          posterUrl: event.posterUrl,
          isFeatured: event.isFeatured,
          tags: [event.genre, event.language, event.duration].filter(Boolean) as string[],
        }))

        setEvents(mappedPerformances)
        const uniqueDates = ["All Dates", ...new Set(mappedPerformances.map(e => e.date))]
        console.log('Available dates for dropdown:', uniqueDates)
        setDates(uniqueDates)
        setVenues(["All Venues", ...new Set(mappedPerformances.map(e => e.venue))])
        setTypes(["All Types", ...new Set(mappedPerformances.map(e => e.eventType))])
      } catch (error) {
        console.error('Error fetching events:', error)
        setEvents([])
      }
    }

    fetchEvents()
  }, [])

  const filteredEvents = events.filter((event) => {
    return (
      (selectedDate === "All Dates" || event.date === selectedDate) &&
      (selectedVenue === "All Venues" || event.venue === selectedVenue) &&
      (selectedType === "All Types" || event.eventType === selectedType)
    )
  })

  // Sort events chronologically by date and time
  const sortedEvents = filteredEvents.sort((a, b) => {
    // First sort by date
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    if (dateA.getTime() !== dateB.getTime()) {
      return dateA.getTime() - dateB.getTime()
    }
    // If dates are the same, sort by time
    const [hoursA, minutesA] = a.time.split(':').map(Number)
    const [hoursB, minutesB] = b.time.split(':').map(Number)
    const timeA = hoursA * 60 + minutesA // Convert to minutes for comparison
    const timeB = hoursB * 60 + minutesB
    return timeA - timeB
  })

  const eventsByDate = sortedEvents.reduce((acc, event) => {
    if (!acc[event.date]) acc[event.date] = []
    acc[event.date].push(event)
    return acc
  }, {} as Record<string, Event[]>)

  // Sort dates chronologically
  const sortedDates = Object.keys(eventsByDate).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime()
  })

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "performance":
        return "bg-primary-gold/20 text-secondary-blue border-primary-gold/30"
      case "workshop":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "discussion":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-center text-4xl font-bold text-secondary-blue">{t("program")}</h1>

      <div className="mb-8 rounded-lg bg-muted/30 p-4">
        <div className="mb-4 flex items-center">
          <Filter className="mr-2 h-5 w-5 text-primary-gold" />
          <h2 className="text-lg font-semibold text-secondary-blue">{t("filterEvents")}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger><SelectValue placeholder={t("selectDate")} /></SelectTrigger>
            <SelectContent>
              {dates.map(date => <SelectItem key={date} value={date}>{date === "All Dates" ? t("allDates") : date}</SelectItem>)}
            </SelectContent>
          </Select>

          <Select value={selectedVenue} onValueChange={setSelectedVenue}>
            <SelectTrigger><SelectValue placeholder={t("selectVenue")} /></SelectTrigger>
            <SelectContent>
              {venues.map(venue => <SelectItem key={venue} value={venue}>{venue === "All Venues" ? t("allVenues") : venue}</SelectItem>)}
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger><SelectValue placeholder={t("selectType")} /></SelectTrigger>
            <SelectContent>
              {types.map(type => <SelectItem key={type} value={type}>{type === "All Types" ? t("allTypes") : t(type.toLowerCase())}</SelectItem>)}
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setSelectedDate("All Dates")
              setSelectedVenue("All Venues")
              setSelectedType("All Types")
            }}
            className="bg-secondary-blue hover:bg-secondary-blue/90 text-white border-secondary-blue px-3 py-2 text-sm"
          >
            Reset
          </Button>
        </div>
      </div>

      <Tabs defaultValue="list" className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">{t("listView")}</TabsTrigger>
          <TabsTrigger value="calendar">{t("calendarView")}</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          {sortedDates.map((date) => {
            const dateEvents = eventsByDate[date].sort((a, b) => {
              const [hoursA, minutesA] = a.time.split(':').map(Number)
              const [hoursB, minutesB] = b.time.split(':').map(Number)
              const timeA = hoursA * 60 + minutesA
              const timeB = hoursB * 60 + minutesB
              return timeA - timeB
            })
            return (
              <div key={date} className="mb-8">
                <div className="mb-4 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary-gold" />
                  <h2 className="text-xl font-semibold text-secondary-blue">{date}</h2>
                </div>
                <div className="space-y-4">
                  {dateEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                                              <div className="border-r border-b p-4 md:w-1/4 md:border-b-0 flex flex-row items-center justify-around">
                        <div className="flex flex-col items-start justify-start space-y-2">
                          <p className="font-semibold text-secondary-blue">{event.time}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="mr-1 h-4 w-4" />
                            {event.venue}
                          </div>
                          <Badge className={`${getBadgeColor(event.eventType)}`}>
                            {t(event.eventType)}
                          </Badge>
                        </div>
                        <div className="flex-shrink-0">
                          {(event.eventType === "performance" && 'posterUrl' in event && event.posterUrl) ? (
                            <img
                              src={event.posterUrl as string}
                              alt={`${event.title} poster`}
                              className="mb-2 h-20 w-12 sm:h-24 sm:w-16 md:h-28 md:w-20 lg:h-32 lg:w-24 rounded-md object-cover"
                            />
                          ) : (event.imageUrl && event.imageUrl.trim() !== "") ? (
                            <img
                              src={event.imageUrl}
                              alt={`${event.title} poster`}
                              className="mb-2 h-20 w-12 sm:h-24 sm:w-16 md:h-28 md:w-20 lg:h-32 lg:w-24 rounded-md object-cover"
                            />
                          ) : (
                            <div className="mb-2 h-20 w-12 sm:h-24 sm:w-16 md:h-28 md:w-20 lg:h-32 lg:w-24 bg-gray-200 rounded-md flex items-center justify-center text-muted-foreground text-xs">
                              No image
                            </div>
                          )}
                        </div>
                      </div>

                        <div className="p-4 md:w-3/4">
                            <h3 className="text-lg font-semibold text-secondary-blue">{event.title}</h3>
                            {event.company && (
                              <p className="text-sm text-muted-foreground italic mb-6">
                                {Array.isArray(event.company) ? event.company.join(' & ') : event.company}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-2">
                            <Link href={`/tickets?event=${event.id}`} passHref>
                              <Button size="sm">{t("bookTicket")}</Button>
                            </Link>
                            <Link href={`/performances/${event.id}`} passHref>
                              <Button size="sm" variant="outline">{t("details")}</Button>
                            </Link>
                            <Button size="sm" variant="ghost">{t("addToCalendar")}</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                </div>
              </div>
            )
          })}
        </TabsContent>

        <TabsContent value="calendar">
          <div className="rounded-lg border p-4">
            {(() => {
              // Get current date or first event date
              const today = new Date()
              let firstEventDate = today
              
              if (sortedEvents.length > 0) {
                // Convert DD-MM-YYYY to YYYY-MM-DD format for proper Date parsing
                const dateParts = sortedEvents[0].date.split('-')
                if (dateParts.length === 3) {
                  const [day, month, year] = dateParts
                  firstEventDate = new Date(`${year}-${month}-${day}`)
                }
              }
              
              const currentMonth = firstEventDate.getMonth()
              const currentYear = firstEventDate.getFullYear()
              
              // Get first day of month and number of days
              const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
              const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
              const daysInMonth = lastDayOfMonth.getDate()
              const startingDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7 // Convert Sunday=0 to Monday=0
              
              // Create calendar grid
              const calendarDays = []
              
              // Add empty cells for days before month starts
              for (let i = 0; i < startingDayOfWeek; i++) {
                calendarDays.push(null)
              }
              
              // Add days of the month
              for (let day = 1; day <= daysInMonth; day++) {
                calendarDays.push(day)
              }
              
              // Month names
              const monthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
              ]
              
              return (
                <>
                  <div className="mb-4 text-center">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-secondary-blue">
                        {monthNames[currentMonth]} {currentYear}
                      </h3>
                      {selectedDate && selectedDate !== "All Dates" && (
                        <div className="text-sm text-primary-gold font-medium">
                          Selected: {selectedDate.split('-').join('/')}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-4 grid grid-cols-7 gap-1 text-center">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <div key={day} className="p-2 font-semibold text-secondary-blue">{day}</div>
                    ))}
                    {calendarDays.map((day, index) => {
                      if (day === null) {
                        return <div key={`empty-${index}`} className="aspect-square"></div>
                      }
                      
                      // Convert to DD-MM-YYYY format to match event dates
                      const dateString = `${String(day).padStart(2, '0')}-${String(currentMonth + 1).padStart(2, '0')}-${currentYear}`
                      const dayEvents = eventsByDate[dateString] || []
                      const hasEvents = dayEvents.length > 0
                      const isToday = today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear
                      const isSelected = selectedDate === dateString
                      
                      return (
                        <div 
                          key={`calendar-day-${day}`} 
                          className={`min-h-[120px] rounded border p-1 cursor-pointer transition-colors ${
                            hasEvents 
                              ? "bg-primary-gold/10 border-primary-gold/30 hover:bg-primary-gold/20" 
                              : "bg-gray-50/50 border-gray-200 hover:bg-gray-100"
                          } ${
                            isToday ? "ring-2 ring-secondary-blue" : ""
                          } ${
                            isSelected ? "ring-2 ring-primary-gold bg-primary-gold/20" : ""
                          } flex flex-col`}
                          onClick={() => {
                            // Allow clicking on any date, not just those with events
                            setSelectedDate(dateString)
                          }}
                        >
                          <div className={`text-sm font-medium mb-1 ${
                            isToday ? "text-secondary-blue font-bold" : ""
                          }`}>{day}</div>
                          {hasEvents && (
                            <div className="flex-1 space-y-1 overflow-hidden">
                              {dayEvents.slice(0, 3).map((event, eventIndex) => (
                                <div key={eventIndex} className="text-xs bg-primary-gold/20 rounded px-1 py-0.5 truncate">
                                  <div className="font-medium text-secondary-blue truncate">{event.time}</div>
                                  <div className="text-gray-700 truncate">{event.title}</div>
                                </div>
                              ))}
                              {dayEvents.length > 3 && (
                                <div className="text-xs text-primary-gold font-medium">+{dayEvents.length - 3} more</div>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-4 text-center text-sm text-muted-foreground">
                    <p>Event names and times are displayed directly in each date.</p>
                    <p className="mt-1">Click on any date to view events for that day.</p>
                  </div>
                  
                  {/* Selected Date Events Display */}
                  {selectedDate && selectedDate !== "All Dates" && (
                    <div className="mt-6 border-t pt-6">
                      <h4 className="text-lg font-semibold text-secondary-blue mb-4">
                        Events on {selectedDate.split('-').join('/')}
                      </h4>
                      {eventsByDate[selectedDate] && eventsByDate[selectedDate].length > 0 ? (
                        <div className="space-y-4">
                        {eventsByDate[selectedDate].map((event, index) => (
                          <Card key={index} className="overflow-hidden">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline" className="text-xs">
                                      {event.time}
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs">
                                      {event.eventType}
                                    </Badge>
                                  </div>
                                  <h5 className="font-semibold text-lg mb-1">{event.title}</h5>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    <MapPin className="inline h-3 w-3 mr-1" />
                                    {event.venue}
                                  </p>
                                  <p className="text-sm mb-3">{event.company.join(", ")}</p>
                                  <div className="flex gap-2">
                                    <Link href={`/tickets?event=${event.id}`}>
                                      <Button size="sm" className="bg-primary-gold hover:bg-primary-gold/90">
                                        Book Ticket
                                      </Button>
                                    </Link>
                                    <Link href={`/performances/${event.id}`}>
                                      <Button size="sm" variant="outline">
                                        Details
                                      </Button>
                                    </Link>
                                  </div>
                                </div>
                                {event.imageUrl && (
                                  <div className="ml-4 flex-shrink-0">
                                    <img
                                      src={event.imageUrl}
                                      alt={event.title}
                                      className="w-20 h-20 object-cover rounded"
                                    />
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <p>No events scheduled for this date.</p>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )
            })()}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
