"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calendar, Ticket, FileText, AlertTriangle, ShieldCheck, Pencil, Trash2, MapPin } from "lucide-react"
import { isAdmin } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/language-context"
import { ds, DatabaseStorage } from "@/lib/database-storage"

// Event type definition
interface Event {
  id: string
  title: string
  eventType: "performance" | "workshop" | "discussion";
  date: string
  time: string
  venue: string
  company: string
  description: string
  imageUrl: string
  isFeatured: boolean
  price: string
  tags: string[] // Add tags array
}

// Venue type definition
interface Venue {
  id: string
  name: string
  description: string
  location: string; // Added location
  capacity: number; // Added capacity
  rows: VenueRow[]
}

interface VenueRow {
  rowNumber: number
  seatCount: number
}

interface EventFormState {
  title: string;
  eventType: "performance" | "workshop" | "discussion";
  date: string;
  time: string;
  venue: string;
  company: string;
  description: string;
  imageUrl: string;
  isFeatured: boolean;
  price: string;
  tags: string[];
}

interface VenueFormState {
  name: string;
  description: string;
  location: string;
  capacity: number;
  rowCount: number;
  seatsPerRow: number;
}

export default function AdminPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const [adminEmail, setAdminEmail] = useState("")
  const [events, setEvents] = useState<Event[]>([])
  const [venues, setVenues] = useState<Venue[]>([])
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null)
  const [formData, setFormData] = useState<EventFormState>({
    title: "",
    eventType: "performance",
    date: "",
    time: "",
    venue: "",
    company: "",
    description: "",
    imageUrl: "/placeholder.svg?height=400&width=600",
    isFeatured: false,
    price: "20.00",
    tags: [],
  })
  const [venueFormData, setVenueFormData] = useState<VenueFormState>({
    name: "",
    description: "",
    location: "", // Initialize location
    capacity: 0,   // Initialize capacity
    rowCount: 1,
    seatsPerRow: 10,
  })
  const [venueRows, setVenueRows] = useState<VenueRow[]>([{ rowNumber: 1, seatCount: 10 }])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dbInstance, setDbInstance] = useState<DatabaseStorage | null>(null);

  useEffect(() => {
    const fetchData = async () => {
    if (typeof window !== 'undefined') {
      const db = DatabaseStorage.getInstance();
      setDbInstance(db);

      // Load events and venues from database
      // Load events and venues from database
      setEvents((await db.getEvents()) || []);
      setVenues((await db.getVenues()) || []);

      // Set up listener for database updates
      const handleDatabaseUpdate = async (event: CustomEvent<any>) => {
        const currentDbInstance = (event as CustomEvent).detail as DatabaseStorage;
        setEvents((await currentDbInstance.getEvents()) || []);
        setVenues((await currentDbInstance.getVenues()) || []);
      };

      window.addEventListener("databaseUpdated", (event) => { handleDatabaseUpdate(event as CustomEvent<any>) })

      return () => {
        window.removeEventListener("databaseUpdated", (event) => { handleDatabaseUpdate(event as CustomEvent<any>) })
      };
    }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Check if user is admin
    if (typeof window !== "undefined") {
      const adminStatus = isAdmin()
      setAuthorized(adminStatus)

      // Get admin email for display
      setAdminEmail(localStorage.getItem("actingEurope_userEmail") || "")

      setIsLoading(false)

      // Redirect non-admin users
      if (!adminStatus) {
        router.push("/auth/login")
      }
    }
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    if (editingEvent) {
      setEditingEvent({ ...editingEvent, [id]: value })
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }))
    }
  }

  const handleVenueInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    if (editingVenue) {
      setEditingVenue({ ...editingVenue, [id]: value })
    } else {
      setVenueFormData((prev) => ({ ...prev, [id]: value }))
    }
  }

  const handleRowCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Number.parseInt(e.target.value) || 1
    if (count < 1) return

    if (editingVenue) {
      // When editing, adjust the rows array based on the new count
      const currentRows = [...editingVenue.rows]
      if (count > currentRows.length) {
        // Add new rows
        const newRows = Array.from({ length: count - currentRows.length }, (_, i) => ({
          rowNumber: currentRows.length + i + 1,
          seatCount: 10,
        }))
        setEditingVenue({
          ...editingVenue,
          rows: [...currentRows, ...newRows],
        })
      } else if (count < currentRows.length) {
        // Remove rows
        setEditingVenue({
          ...editingVenue,
          rows: currentRows.slice(0, count),
        })
      }
    } else {
      // When creating new venue
      setVenueFormData((prev) => ({ ...prev, rowCount: count }))

      // Update the rows array
      if (count > venueRows.length) {
        // Add new rows
        const newRows = Array.from({ length: count - venueRows.length }, (_, i) => ({
          rowNumber: venueRows.length + i + 1,
          seatCount: 10,
        }))
        setVenueRows([...venueRows, ...newRows])
      } else if (count < venueRows.length) {
        // Remove rows
        setVenueRows(venueRows.slice(0, count))
      }
    }
  }

  const handleSeatCountChange = (rowIndex: number, value: number) => {
    if (value < 0) return

    if (editingVenue) {
      const updatedRows = [...editingVenue.rows]
      updatedRows[rowIndex] = {
        ...updatedRows[rowIndex],
        seatCount: value,
      }
      setEditingVenue({
        ...editingVenue,
        rows: updatedRows,
      })
    } else {
      const updatedRows = [...venueRows]
      updatedRows[rowIndex] = {
        ...updatedRows[rowIndex],
        seatCount: value,
      }
      setVenueRows(updatedRows)
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    if (editingEvent) {
      setEditingEvent({ ...editingEvent, [name]: value })
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleFeaturedToggle = (checked: boolean) => {
    if (editingEvent) {
      setEditingEvent({ ...editingEvent, isFeatured: checked })
    } else {
      setFormData((prev) => ({ ...prev, isFeatured: checked }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, this would upload the file to a server
    // For this demo, we'll just use a placeholder
    if (editingEvent) {
      setEditingEvent({ ...editingEvent, imageUrl: "/placeholder.svg?height=400&width=600" })
    } else {
      setFormData((prev) => ({ ...prev, imageUrl: "/placeholder.svg?height=400&width=600" }))
    }
  }

  // Add a function to handle tags input
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsString = e.target.value
    const tagsArray = tagsString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "")

    if (editingEvent) {
      setEditingEvent({ ...editingEvent, tags: tagsArray })
    } else {
      setFormData((prev) => ({ ...prev, tags: tagsArray }))
    }
  }

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form
    if (!formData.title || !formData.eventType || !formData.date || !formData.time || !formData.venue) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Create new event
    const newEvent: Event = {
      id: `event-${Date.now()}`,
      ...formData,
    }

    // Add to database
    dbInstance?.addEvent(newEvent)

    // Update local state
    setEvents(await ds.getEvents())

    // Show success message
    toast({
      title: "Event added successfully",
      description: `"${formData.title}" has been added to the program`,
    })

    // Reset form
    setFormData({
      title: "",
      eventType: "performance",
      date: "",
      time: "",
      venue: "",
      company: "",
      description: "",
      imageUrl: "/placeholder.svg?height=400&width=600",
      isFeatured: false,
      price: "20.00",
      tags: [] as string[],
    })

    setIsSubmitting(false)
  }

  const handleAddVenue = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form
    if (!venueFormData.name) {
      toast({
        title: "Missing information",
        description: "Please provide a venue name",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Create new venue
    const newVenue: Venue = {
      id: `venue-${Date.now()}`,
      name: venueFormData.name,
      description: venueFormData.description,
      location: venueFormData.location, // Added location
      capacity: venueFormData.capacity,   // Added capacity
      rows: venueRows,
    }

    dbInstance?.addVenue(newVenue)
    setVenues(await dbInstance?.getVenues() || [])

    // Show success message
    toast({
      title: "Venue added successfully",
      description: `"${venueFormData.name}" has been added to the venues`,
    })

    // Reset form
    setVenueFormData({
      name: "",
      description: "",
      location: "", // Reset location
      capacity: 0,   // Reset capacity
      rowCount: 1,
      seatsPerRow: 10, // Reset seatsPerRow
    })
    setVenueRows([{ rowNumber: 1, seatCount: 10 }])

    setIsSubmitting(false)
  }

  const handleEditVenue = (id: string) => {
    const venueToEdit = venues.find((venue) => venue.id === id)
    if (venueToEdit) {
      setEditingVenue(venueToEdit)
    }
  }

  const handleSelectEventForEdit = (id: string) => {
    const eventToEdit = events.find((event) => event.id === id)
    if (eventToEdit) {
      setEditingEvent(eventToEdit)
    }

    // Validate form
    if (!eventToEdit) {
      toast({
        title: "Error",
        description: "Event not found for editing.",
        variant: "destructive",
      })
      return
    }

    if (!eventToEdit.title || !eventToEdit.eventType || !eventToEdit.date || !eventToEdit.time || !eventToEdit.venue) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }


  }

  const handleEditEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingEvent) return

    // Validate form
    if (!editingEvent.title || !editingEvent.eventType || !editingEvent.date || !editingEvent.time || !editingEvent.venue) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Update events array
    const updatedEvents = events.map((event) => (event.id === editingEvent.id ? editingEvent : event))

    dbInstance?.updateEvent(editingEvent.id, editingEvent)
    setEvents(await dbInstance?.getEvents() || [])

    // Show success message
    toast({
      title: "Event updated successfully",
      description: `"${editingEvent.title}" has been updated`,
    })

    // Reset editing state
    setEditingEvent(null)
  }

  const handleUpdateVenue = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingVenue) return

    // Validate form
    if (!editingVenue.name || !editingVenue.location || !editingVenue.capacity) {
      toast({
        title: "Missing information",
        description: "Please provide a venue name",
        variant: "destructive",
      })
      return
    }

    // Update venues array
    const updatedVenues = venues.map((venue) => (venue.id === editingVenue.id ? editingVenue : venue))

    dbInstance?.updateVenue(editingVenue.id, editingVenue)
    setVenues(await dbInstance?.getVenues() || [])

    // Show success message
    toast({
      title: "Venue updated successfully",
      description: `"${editingVenue.name}" has been updated`,
    })

    // Reset editing state
    setEditingVenue(null)
  }

  const handleCancelEdit = () => {
    setEditingEvent(null)
    setEditingVenue(null)
  }

  const handleDeleteEvent = async (id: string) => {
    dbInstance?.deleteEvent(id)
    setEvents(await dbInstance?.getEvents() || [])

    toast({
      title: "Event deleted",
      description: "The event has been removed from the program",
    })
  }

  const handleDeleteVenue = async (id: string) => {
    // Check if venue is used in any events
    const venueInUse = events.some((event) => event.venue === venues.find((v) => v.id === id)?.name)

    if (venueInUse) {
      toast({
        title: "Cannot delete venue",
        description: "This venue is used in one or more events. Please update or delete those events first.",
        variant: "destructive",
      })
      return
    }

    dbInstance?.deleteVenue(id)
    setVenues(await dbInstance?.getVenues() || [])

    toast({
      title: "Venue deleted",
      description: "The venue has been removed",
    })
  }

  if (isLoading) {
    return (
      <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-gold border-t-transparent"></div>
          <p className="mt-4 text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    )
  }

  if (!authorized) {
    return (
      <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <AlertTriangle className="mb-4 h-16 w-16 text-red-500" />
          <h1 className="mb-2 text-2xl font-bold text-secondary-blue">Access Denied</h1>
          <p className="mb-6 max-w-md text-muted-foreground">
            You don't have permission to access the admin panel. Please log in with an administrator account.
          </p>
          <Button onClick={() => router.push("/auth/login")}>Go to Login</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary-gold" />
          <h1 className="text-3xl font-bold text-secondary-blue">Admin Dashboard</h1>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
           <a href="/admin/news" className="block">
             <Card className="hover:shadow-lg transition-shadow duration-200">
               <CardHeader>
                 <CardTitle>Manage News Articles</CardTitle>
               </CardHeader>
               <CardContent>
                 <p className="text-gray-600">Add, edit, and delete news articles.</p>
               </CardContent>
             </Card>
           </a>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <p className="text-muted-foreground">Logged in as administrator:</p>
          <span className="font-medium text-primary-gold">{adminEmail}</span>
        </div>
      </div>

      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:w-[800px]">
          <TabsTrigger value="events" className="gap-2">
            <Calendar className="h-4 w-4" />
            Events
          </TabsTrigger>
          <TabsTrigger value="venues" className="gap-2">
            <MapPin className="h-4 w-4" />
            Venues
          </TabsTrigger>
          <TabsTrigger value="reservations" className="gap-2">
            <Ticket className="h-4 w-4" />
            Reservations
          </TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="mt-6 space-y-6">
          {editingEvent ? (
            <Card>
              <CardHeader>
                <CardTitle>Edit Event</CardTitle>
                <CardDescription>Update event information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
            <form onSubmit={handleEditEvent} className="grid gap-4 py-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">Event Title *</Label>
                      <Input
                        id="title"
                        placeholder="Enter event title"
                        value={editingEvent.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Event Type *</Label>
                      <Select value={editingEvent.eventType} onValueChange={(value) => handleSelectChange("eventType", value as "performance" | "workshop" | "discussion")}>
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="performance">Performance</SelectItem>
                          <SelectItem value="workshop">Workshop</SelectItem>
                          <SelectItem value="discussion">Discussion</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date *</Label>
                      <Input id="date" type="date" value={editingEvent.date} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time *</Label>
                      <Input id="time" type="time" value={editingEvent.time} onChange={handleInputChange} required />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="venue">Venue *</Label>
                      <Select value={editingEvent.venue} onValueChange={(value) => handleSelectChange("venue", value)}>
                        <SelectTrigger id="venue">
                          <SelectValue placeholder="Select venue" />
                        </SelectTrigger>
                        <SelectContent>
                          {venues.map((venue) => (
                            <SelectItem key={venue.id} value={venue.name}>
                              {venue.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company/Presenter</Label>
                      <Input
                        id="company"
                        placeholder="Enter company or presenter name"
                        value={editingEvent.company}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter event description"
                      rows={4}
                      value={editingEvent.description}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Event Image</Label>
                    <Input id="image" type="file" onChange={handleFileChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Ticket Price (€) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="20.00"
                      value={editingEvent.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      placeholder="drama, comedy, modern, classic"
                      value={editingEvent ? editingEvent.tags?.join(", ") : formData.tags.join(", ")}
                      onChange={handleTagsChange}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="featured" checked={editingEvent.isFeatured} onCheckedChange={handleFeaturedToggle} />
                    <Label htmlFor="featured">Featured Event (displayed on homepage)</Label>
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit">Update Event</Button>
                    <Button type="button" variant="outline" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Add New Event</CardTitle>
                <CardDescription>Create a new performance, workshop, or discussion</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleAddEvent} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">Event Title *</Label>
                      <Input
                        id="title"
                        placeholder="Enter event title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Event Type *</Label>
                      <Select value={formData.eventType} onValueChange={(value) => handleSelectChange("eventType", value as "performance" | "workshop" | "discussion")}>
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="performance">Performance</SelectItem>
                          <SelectItem value="workshop">Workshop</SelectItem>
                          <SelectItem value="discussion">Discussion</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date *</Label>
                      <Input id="date" type="date" value={formData.date} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time *</Label>
                      <Input id="time" type="time" value={formData.time} onChange={handleInputChange} required />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="venue">Venue *</Label>
                      <Select value={formData.venue} onValueChange={(value) => handleSelectChange("venue", value)}>
                        <SelectTrigger id="venue">
                          <SelectValue placeholder="Select venue" />
                        </SelectTrigger>
                        <SelectContent>
                          {venues.map((venue) => (
                            <SelectItem key={venue.id} value={venue.name}>
                              {venue.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company/Presenter</Label>
                      <Input
                        id="company"
                        placeholder="Enter company or presenter name"
                        value={formData.company}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter event description"
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Event Image</Label>
                    <Input id="image" type="file" onChange={handleFileChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Ticket Price (€) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="20.00"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      placeholder="drama, comedy, modern, classic"
                      //value={editingEvent ? editingEvent.tags?.join(", ") : formData.tags.join(", ")}
                      onChange={handleTagsChange}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="featured" checked={formData.isFeatured} onCheckedChange={handleFeaturedToggle} />
                    <Label htmlFor="featured">Featured Event (displayed on homepage)</Label>
                  </div>

                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Adding Event..." : "Add Event"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Manage Events</CardTitle>
              <CardDescription>Edit or delete existing events</CardDescription>
            </CardHeader>
            <CardContent>
              {events.length > 0 ? (
                <div className="rounded-md border">
                  <div className="grid grid-cols-9 border-b bg-muted/50 p-3 font-medium">
                    <div className="col-span-2">Title</div>
                    <div>Type</div>
                    <div>Date</div>
                    <div>Venue</div>
                    <div>Price (BGN)</div>
                    <div>Tags</div>
                    <div>Featured</div>
                    <div>Actions</div>
                  </div>
                  {events.map((event) => (
                    <div key={event.id} className="grid grid-cols-9 border-b p-3">
                      <div className="col-span-2 font-medium">{event.title}</div>
                      <div className="capitalize">{event.eventType}</div>
                      <div>{event.date}</div>
                      <div>{event.venue}</div>
                      <div>{event.price ? `${(Number.parseFloat(event.price) * 1.96).toFixed(2)} лв.` : "Free"}</div>
                      <div className="truncate">{event.tags?.join(", ") || "None"}</div>
                      <div>{event.isFeatured ? "Yes" : "No"}</div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleSelectEventForEdit(event.id)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">
                  No events have been added yet. Use the form above to create events.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="venues" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Venue</CardTitle>
              <CardDescription>Create a new venue for events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="venue-name">Venue Name</Label>
                <Input
                  id="venue-name"
                  placeholder="Enter venue name"
                  value={venueFormData.name}
                  onChange={(e) => setVenueFormData({ ...venueFormData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="venue-location">Location</Label>
                <Input
                  id="venue-location"
                  placeholder="Enter venue location"
                  value={venueFormData.location}
                  onChange={(e) => setVenueFormData({ ...venueFormData, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="venue-capacity">Capacity</Label>
                <Input
                  id="venue-capacity"
                  type="number"
                  placeholder="Enter venue capacity"
                  value={venueFormData.capacity}
                  onChange={(e) =>
                    setVenueFormData({ ...venueFormData, capacity: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="venue-rows">Number of Rows</Label>
                <Input
                  id="venue-rows"
                  type="number"
                  placeholder="Enter number of rows"
                  value={venueFormData.rowCount}
                  onChange={handleRowCountChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="venue-seats-per-row">Seats Per Row</Label>
                <Input
                  id="venue-seats-per-row"
                  type="number"
                  placeholder="Enter seats per row"
                  value={venueFormData.seatsPerRow}
                  onChange={(e) => {
                    const newSeats = parseInt(e.target.value) || 0;
                    setVenueFormData({ ...venueFormData, seatsPerRow: newSeats });
                    setVenueRows((prevRows) =>
                      prevRows.map((row) => ({ ...row, seatCount: newSeats }))
                    );
                  }}
                />
              </div>
              <Button onClick={handleAddVenue}>Add Venue</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manage Venues</CardTitle>
              <CardDescription>Edit or delete existing venues</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {venues.map((venue) => (
                    <TableRow key={venue.id}>
                      <TableCell>{venue.name}</TableCell>
                      <TableCell>{venue.location}</TableCell>
                      <TableCell>{venue.capacity}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="mr-2">
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reservations" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Manage Reservations</CardTitle>
              <CardDescription>View and manage ticket reservations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                Reservation management table would be displayed here with options to view, confirm, or cancel
                reservations.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="news">
          <Card>
            <CardHeader>
              <CardTitle>News Management</CardTitle>
            </CardHeader>
            <CardContent>
              {/* News Management Content */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
