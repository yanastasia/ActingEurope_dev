"use client"

import { useState, useEffect } from "react"
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
import { Calendar, Clock, MapPin, Ticket, Settings, User } from "lucide-react"

interface UserProfile {
  email: string
  firstName: string
  lastName: string
  phone: string
  emailNotifications: boolean
  marketingPreferences: boolean
}

interface BookedTicket {
  id: string
  eventTitle: string
  date: string
  time: string
  venue: string
  seats: string[]
  bookingReference: string
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
  const [activeTab, setActiveTab] = useState("upcoming")
  const [isSaving, setIsSaving] = useState(false)

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
    }

    if (!authLoading) {
      setIsLoading(false)
    }
  }, [router, user, authLoading])

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
                {upcomingTickets.length === 0 ? (
                  <div className="text-center py-8">
                    <Ticket className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">{t("noTicketsYet")}</h3>
                    <p className="text-muted-foreground mb-4">{t("noTicketsYetDesc")}</p>
                    <Button onClick={() => router.push("/program")}>
                      {t("browseProgram")}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingTickets.map((ticket) => (
                      <div key={ticket.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{ticket.eventTitle}</h3>
                          <Badge>{ticket.bookingReference}</Badge>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {ticket.date}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {ticket.time}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {ticket.venue}
                          </div>
                          <div className="flex items-center gap-2">
                            <Ticket className="h-4 w-4" />
                            Seats: {ticket.seats.join(", ")}
                          </div>
                        </div>
                        <Button size="sm" className="mt-3">
                          {t("viewDetails")}
                        </Button>
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
                {pastTickets.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">{t("noPastEvents")}</h3>
                    <p className="text-muted-foreground">{t("noAttendedEvents")}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pastTickets.map((ticket) => (
                      <div key={ticket.id} className="border rounded-lg p-4 opacity-75">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{ticket.eventTitle}</h3>
                          <Badge variant="secondary">{ticket.bookingReference}</Badge>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {ticket.date}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {ticket.venue}
                          </div>
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
    </div>
  )
}
