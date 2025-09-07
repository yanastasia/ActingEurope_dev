"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/components/providers/supabase-auth-provider"
import TicketCard from "@/components/tickets/TicketCard"
import QRCodeGenerator from "@/components/ui/qr-code-generator"
import { isScanner } from "@/lib/auth"
import { Calendar, Clock, MapPin, Ticket, Settings, User, Scan, ChevronLeft, ChevronRight, X } from "lucide-react"

interface UserProfile {
  email: string
  firstName: string
  lastName: string
  phone: string
  emailNotifications: boolean
  marketingPreferences: boolean
}

interface BookingData {
  id: number;
  event: {
    title: string;
    event_date: string;
    event_time?: string;
    venue?: { name: string };
  };
  booked_seats: Array<{
    id: number;
    attendee_name: string;
    qr_code_data: string;
    seat: {
      id: number;
      row_number: number;
      seat_number: number;
      venueSection?: {
        section_name: string;
      };
    };
  }>;
  booking_reference: string;
  total_amount: number;
}

interface BookedTicket {
  id: string
  eventTitle: string
  date: string
  time: string
  venue: string
  seats: { id: string; row_number: number; seat_number: number; attendee_name: string; qr_code_data: string; sectionName?: string }[]
  bookingReference: string
  eventId: number
  totalAmount: number
}

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()
  const { user, signOut, loading: authLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState<UserProfile>({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    emailNotifications: true,
    marketingPreferences: false
  })
  const [bookedTickets, setBookedTickets] = useState<BookedTicket[]>([])
  const [loadingBookings, setLoadingBookings] = useState(false)
  const [activeTab, setActiveTab] = useState("upcoming")
  const [isSaving, setIsSaving] = useState(false)
  const [enlargedQR, setEnlargedQR] = useState<string | null>(null)
  const [currentTicketIndex, setCurrentTicketIndex] = useState<{[key: string]: number}>({})

  const fetchUserBookings = useCallback(async () => {
    if (!user?.id) return;
    
    setLoadingBookings(true)
    try {
      // With Supabase auth integration, user.id is now the UUID that matches our database
      const response = await fetch(`/api/bookings?userId=${user.id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch bookings')
      }
      const bookings = await response.json()
      
      const formattedTickets: BookedTicket[] = (bookings as BookingData[]).map((booking) => ({
        id: booking.id.toString(),
        eventTitle: booking.event.title,
        date: new Date(booking.event.event_date).toLocaleDateString(),
        time: booking.event.event_time ? 
          new Date(booking.event.event_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : 'TBA',
        venue: booking.event.venue?.name || 'TBA',
        seats: booking.booked_seats.map((bookedSeat) => ({
          id: bookedSeat.seat.id.toString(),
          row_number: bookedSeat.seat.row_number,
          seat_number: bookedSeat.seat.seat_number,
          attendee_name: bookedSeat.attendee_name,
          qr_code_data: bookedSeat.qr_code_data,
          sectionName: bookedSeat.seat.venueSection?.section_name
        })),
        bookingReference: booking.booking_reference,
        eventId: booking.id,
        totalAmount: booking.total_amount
      }))
      
      setBookedTickets(formattedTickets)
    } catch (error) {
      console.error('Error fetching bookings:', error)
      toast({
        title: "Error",
        description: "Failed to load your bookings. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoadingBookings(false)
    }
  }, [user, toast])

  useEffect(() => {
    // Check authentication
    if (!authLoading && !user) {
      router.push("/auth/login")
      return
    }

    // Load user profile
    if (user?.email) {
      setProfile(prev => ({ 
        ...prev, 
        email: user.email || '',
        firstName: user.user_metadata?.first_name || '',
        lastName: user.user_metadata?.last_name || ''
      }))
      
      // Fetch user bookings
      fetchUserBookings()
    }

    if (!authLoading) {
      setIsLoading(false)
    }
  }, [router, user, authLoading, fetchUserBookings])

  const handleSaveProfile = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated."
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
      toast({
        title: t("loggedOutSuccessfully"),
        description: t("loggedOutSuccessfullyDesc")
      })
      router.push("/")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      })
    }
  }

  if (isLoading || authLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-muted-foreground">{t("loadingProfile")}</p>
        </div>
      </div>
    )
  }

  const upcomingTickets = bookedTickets.filter(ticket => new Date(ticket.date) >= new Date())
  const pastTickets = bookedTickets.filter(ticket => new Date(ticket.date) < new Date())

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-blue mb-2">{t("profile")}</h1>
        <p className="text-muted-foreground">{t("manageAccountAndBookings")}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {profile.firstName || "User"} {profile.lastName}
              </CardTitle>
              <CardDescription>{profile.email}</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardContent className="p-4">
              <nav className="space-y-2">
                <Button
                  variant={activeTab === "upcoming" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("upcoming")}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {t("upcoming")}
                </Button>
                <Button
                  variant={activeTab === "past" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("past")}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  {t("past")}
                </Button>

                <Button
                  variant={activeTab === "settings" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  {t("accountSettings")}
                </Button>
                
                {isScanner() && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => router.push("/scanner")}
                  >
                    <Scan className="mr-2 h-4 w-4" />
                    Scanner Interface
                  </Button>
                )}
              </nav>
            </CardContent>
          </Card>

          <Button onClick={handleLogout} variant="outline" className="w-full">
            {t("logout")}
          </Button>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          {activeTab === "upcoming" && (
            <Card>
              <CardHeader>
                <CardTitle>{t("upcoming")} {t("performances")}</CardTitle>
                <CardDescription>{t("upcomingEventsDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingBookings ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">{t("loadingBookings")}</p>
                  </div>
                ) : upcomingTickets.length === 0 ? (
                  <div className="text-center py-8">
                    <Ticket className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">{t("noTicketsYet")}</h3>
                    <p className="text-muted-foreground mb-4">{t("noTicketsYetDesc")}</p>
                    <Button onClick={() => router.push("/program")}>
                      {t("browseProgram")}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {upcomingTickets.map((ticket) => (
                      <div key={ticket.id} className="space-y-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold">{t(ticket.eventTitle)}</h3>
                          <Badge>{ticket.bookingReference}</Badge>
                        </div>
                        {/* Ticket Cards Horizontal Scroll */}
                        <div className="relative">
                          {ticket.seats.length === 1 ? (
                            <div className="flex justify-center">
                              <div className="w-full max-w-md">
                                <TicketCard
                                  bookingReference={ticket.bookingReference}
                                  attendeeName={ticket.seats[0].attendee_name}
                                  eventTitle={ticket.eventTitle}
                                  eventDate={ticket.date}
                                  eventTime={ticket.time}
                                  venue={ticket.venue}
                                  seat={{ 
                                    row: ticket.seats[0].row_number, 
                                    number: ticket.seats[0].seat_number,
                                    id: parseInt(ticket.seats[0].id)
                                  }}
                                  qrPayload={ticket.seats[0].qr_code_data}
                                  sectionName={ticket.seats[0].sectionName}
                                  onQRClick={() => {
                                    setEnlargedQR(ticket.seats[0].qr_code_data);
                                  }}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="relative">
                              <div className="overflow-x-auto scrollbar-hide scroll-smooth" id={`ticket-slider-${ticket.id}`}>
                                <div className="flex gap-4 pb-4 px-2 min-w-max">
                                  {ticket.seats.map((seat, index) => (
                                    <div 
                                      key={seat.id} 
                                      className="flex-shrink-0 w-[350px]"
                                    >
                                      <TicketCard
                                        bookingReference={ticket.bookingReference}
                                        attendeeName={seat.attendee_name}
                                        eventTitle={ticket.eventTitle}
                                        eventDate={ticket.date}
                                        eventTime={ticket.time}
                                        venue={ticket.venue}
                                        seat={{ 
                                          row: seat.row_number, 
                                          number: seat.seat_number,
                                          id: parseInt(seat.id)
                                        }}
                                      qrPayload={seat.qr_code_data}
                                      sectionName={seat.sectionName}
                                      onQRClick={() => {
                                         setEnlargedQR(seat.qr_code_data)
                                       }}
                                     />
                                   </div>
                                 ))}
                               </div>
                              </div>
                              {ticket.seats.length > 1 && (
                                <div className="flex justify-center gap-2 mt-4">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      const slider = document.getElementById(`ticket-slider-${ticket.id}`);
                                      if (slider) {
                                        slider.scrollBy({ left: -370, behavior: 'smooth' });
                                      }
                                    }}
                                    className="h-8 w-8 p-0"
                                  >
                                    <ChevronLeft className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      const slider = document.getElementById(`ticket-slider-${ticket.id}`);
                                      if (slider) {
                                        slider.scrollBy({ left: 370, behavior: 'smooth' });
                                      }
                                    }}
                                    className="h-8 w-8 p-0"
                                  >
                                    <ChevronRight className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === "past" && (
            <Card>
              <CardHeader>
                <CardTitle>{t("past")} {t("performances")}</CardTitle>
                <CardDescription>{t("pastEventsDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingBookings ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">{t("loadingBookings")}</p>
                  </div>
                ) : pastTickets.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">{t("noPastEvents")}</h3>
                    <p className="text-muted-foreground">{t("noAttendedEvents")}</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {pastTickets.map((ticket) => (
                      <div key={ticket.id} className="space-y-4 opacity-75">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold">{ticket.eventTitle}</h3>
                          <Badge variant="secondary">{ticket.bookingReference}</Badge>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          {ticket.seats.map((seat) => (
                            <div key={seat.id} className="border rounded-lg p-4 bg-muted/50">
                              <div className="space-y-2">
                                <div className="font-medium">{seat.attendee_name}</div>
                                <div className="text-sm text-muted-foreground">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    {ticket.date}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    {ticket.venue}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Ticket className="h-4 w-4" />
                                    Row {seat.row_number}, Seat {seat.seat_number}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}



          {activeTab === "settings" && (
            <Card>
              <CardHeader>
                <CardTitle>{t("accountSettings")}</CardTitle>
                <CardDescription>{t("updateAccountDetails")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">{t("personalInformation")}</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">{t("firstName")}</Label>
                      <Input
                        id="firstName"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">{t("lastName")}</Label>
                      <Input
                        id="lastName"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("email")}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t("phone")}</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">{t("preferences")}</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>{t("emailNotifications")}</Label>
                        <p className="text-sm text-muted-foreground">
                          {t("emailNotificationsDesc")}
                        </p>
                      </div>
                      <Switch
                        checked={profile.emailNotifications}
                        onCheckedChange={(checked) => 
                          setProfile(prev => ({ ...prev, emailNotifications: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>{t("calendarIntegration")}</Label>
                        <p className="text-sm text-muted-foreground">
                          {t("calendarIntegrationDesc")}
                        </p>
                      </div>
                      <Switch
                        checked={profile.marketingPreferences}
                        onCheckedChange={(checked) => 
                          setProfile(prev => ({ ...prev, marketingPreferences: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleSaveProfile} disabled={isSaving}>
                  {isSaving ? t("saving") : t("saveChanges")}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Enlarged QR Code Modal */}
      {enlargedQR && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setEnlargedQR(null)}>
          <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">QR Code</h3>
              <button
                onClick={() => setEnlargedQR(null)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded border">
                <QRCodeGenerator data={enlargedQR} size={200} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
