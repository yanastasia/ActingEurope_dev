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
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Ticket, FileText, AlertTriangle, ShieldCheck, Trash2, MapPin, Info, Phone, Building, Edit } from "lucide-react"
import { isAdmin, isAdminEmail } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/components/providers/supabase-auth-provider"
// Event type definition
interface Event {
  id: string
  title: string
  eventType: "performance" | "workshop" | "discussion"
  date: string
  time: string
  venue: string
  theatreId?: number[]
  company: string[]
  description: string
  imageUrl: string
  isFeatured: boolean
  price: string
  tags: string[]
  contentLanguage: string
  translationGroup?: string
  performanceLanguage?: string[]
  subtitleLanguage?: string[]
}



// Venue type definition
interface Venue {
  id: string
  name: string
  description: string
  location: string
  capacity: number
  sections: VenueSection[]
}

interface VenueSection {
  id: string
  sectionName: string
  sectionType: 'regular' | 'balcony'
  rows: VenueRow[]
}

interface VenueRow {
  rowNumber: number
  seats: VenueSeat[]
}

interface VenueSeat {
  seatNumber: number
  isAccessible: boolean
}

interface EventFormState {
  title: string;
  eventType: "performance" | "workshop" | "discussion";
  date: string;
  time: string;
  venue: string;
  theatreId: number[];
  company: string[];
  description: string;
  imageUrl: string;
  isFeatured: boolean;
  price: string;
  tags: string[];
  contentLanguage: string;
  translationGroup?: string;
  performanceLanguage: string[];
  subtitleLanguage: string[];
}

interface Theatre {
  id: number;
  name: string;
  city: string;
  country: string;
  description: string;
}

interface VenueFormState {
  name: string;
  description: string;
  location: string;
  capacity: number;
  imageUrl: string;
}

export default function AdminPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()
  const { user, session, loading: authLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const [adminEmail, setAdminEmail] = useState("")
  const [events, setEvents] = useState<Event[]>([])  
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])  
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all')  
  const [translationGroups, setTranslationGroups] = useState<{[key: string]: Event[]}>({})
  const [venues, setVenues] = useState<Venue[]>([])
  const [theatres, setTheatres] = useState<Theatre[]>([])
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null)
  const [showEventForm, setShowEventForm] = useState(false)
  const [formData, setFormData] = useState<EventFormState>({
    title: "",
    eventType: "performance",
    date: "",
    time: "",
    venue: "",
    theatreId: [],
    company: [],
    description: "",
    imageUrl: "/placeholder.svg?height=400&width=600",
    isFeatured: false,
    price: "0",
    tags: [],
    contentLanguage: "en",
    translationGroup: undefined,
    performanceLanguage: [],
    subtitleLanguage: [],
  })
  const [venueFormData, setVenueFormData] = useState<VenueFormState>({
    name: "",
    description: "",
    location: "",
    capacity: 0,
    imageUrl: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Language options
  const languageOptions = [
    { code: 'en', name: 'English' },
    { code: 'bg', name: 'Bulgarian' },
    { code: 'mk', name: 'Macedonian' },
    { code: 'sr', name: 'Serbian' }
  ]

  // Helper function for handling multi-select changes
  const handleMultiSelectChange = (field: keyof EventFormState, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[] | number[]
      if (checked) {
        return {
          ...prev,
          [field]: [...currentArray, field === 'theatreId' ? parseInt(value) : value]
        }
      } else {
        return {
          ...prev,
          [field]: currentArray.filter(item => item.toString() !== value)
        }
      }
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Load events from API
        console.log('Fetching events...')
        const eventsResponse = await fetch('/api/events')
        console.log('Events response status:', eventsResponse.status)
        if (eventsResponse.ok) {
          const eventsData = await eventsResponse.json()
          console.log('Events data received:', eventsData?.length || 0, 'events')
          setEvents(eventsData || [])
        } else {
          console.error('Events fetch failed with status:', eventsResponse.status)
        }
        
        // Load venues from API
        console.log('Fetching venues...')
        const venuesResponse = await fetch('/api/venues')
        console.log('Venues response status:', venuesResponse.status)
        if (venuesResponse.ok) {
          const venuesData = await venuesResponse.json()
          console.log('Venues data received:', venuesData?.length || 0, 'venues')
          setVenues(venuesData || [])
        } else {
          console.error('Venues fetch failed with status:', venuesResponse.status)
        }
        
        // Load theatres from API
        console.log('Fetching theatres...')
        const theatresResponse = await fetch('/api/theatres?admin=true')
        console.log('Theatres response status:', theatresResponse.status)
        if (theatresResponse.ok) {
          const theatresData = await theatresResponse.json()
          console.log('Theatres data received:', theatresData?.length || 0, 'theatres')
          setTheatres(theatresData || [])
        } else {
          console.error('Theatres fetch failed with status:', theatresResponse.status)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    };
    fetchData();
  }, []);

  // Filter events by language and group translation groups
  useEffect(() => {
    let filtered = events
    if (selectedLanguage !== 'all') {
      filtered = events.filter(event => event.contentLanguage === selectedLanguage)
    }
    setFilteredEvents(filtered)

    // Group events by translation group
    const groups: {[key: string]: Event[]} = {}
    events.forEach(event => {
      if (event.translationGroup) {
        if (!groups[event.translationGroup]) {
          groups[event.translationGroup] = []
        }
        groups[event.translationGroup].push(event)
      }
    })
    setTranslationGroups(groups)
  }, [events, selectedLanguage])

  useEffect(() => {
    // Wait for auth provider to finish loading
    if (authLoading) {
      return
    }

    // Check if user is authenticated and is admin
    if (!user || !session) {
      // User is not logged in
      console.log('No user session, redirecting to login')
      router.push("/auth/login?redirectTo=%2Fadmin")
      return
    }

    // Check if user is admin based on email
    const userEmail = user.email || ""
    const isAdminUser = isAdminEmail(userEmail)
    
    console.log('Admin check:', { 
      userEmail, 
      isAdminUser, 
      hasSession: !!session 
    })
    
    if (!isAdminUser) {
      // User is logged in but not admin
      console.log('User is not admin, redirecting to home')
      router.push("/")
      return
    }

    // User is authenticated and is admin
    setAuthorized(true)
    setAdminEmail(userEmail)
    setIsLoading(false)
  }, [user, session, authLoading, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleVenueInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    if (editingVenue) {
      setEditingVenue({ 
        ...editingVenue, 
        [id]: id === 'capacity' ? parseInt(value) || 0 : value 
      })
    } else {
      setVenueFormData((prev) => ({ 
        ...prev, 
        [id]: id === 'capacity' ? parseInt(value) || 0 : value 
      }))
    }
  }



  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFeaturedToggle = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isFeatured: checked }))
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const imageUrl = data.url;
        
        setFormData((prev) => ({ ...prev, imageUrl }));
        
        toast({
          title: "Success",
          description: "Image uploaded successfully",
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.error || "Failed to upload image",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    }
  }

  // Add a function to handle tags input
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsString = e.target.value
    const tagsArray = tagsString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "")

    setFormData((prev) => ({ ...prev, tags: tagsArray }))
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

    // Validate theatre selection
    if (formData.theatreId.length === 0) {
      toast({
        title: "Missing theatre",
        description: "Please select at least one theatre/company",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Validate performance language selection
    if (formData.performanceLanguage.length === 0) {
      toast({
        title: "Missing performance language",
        description: "Please select at least one performance language",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Create new event
    const newEvent: Event = {
      id: `event-${Date.now()}`,
      ...formData,
      theatreId: formData.theatreId,
    }

    // Add to database via API
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      })
      
      if (response.ok) {
        // Refresh events list
        const eventsResponse = await fetch('/api/events')
        if (eventsResponse.ok) {
          const eventsData = await eventsResponse.json()
          setEvents(eventsData || [])
        }
      } else {
        throw new Error('Failed to add event')
      }
    } catch (error) {
      console.error('Error adding event:', error)
      toast({
        title: "Error",
        description: "Failed to add event. Please try again.",
        variant: "destructive"
      })
      setIsSubmitting(false)
      return
    }

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
      theatreId: [],
      company: [],
      description: "",
      imageUrl: "/placeholder.svg?height=400&width=600",
      isFeatured: false,
      price: "Free",
      tags: [] as string[],
      contentLanguage: "en",
      performanceLanguage: [],
      subtitleLanguage: []
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

    // Check for duplicate venue names
    const existingVenue = venues.find(venue => venue.name.toLowerCase() === venueFormData.name.toLowerCase())
    if (existingVenue) {
      toast({
        title: "Duplicate venue name",
        description: "A venue with this name already exists. Please choose a different name.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Create new venue with default section
    const newVenue: Venue = {
      id: `venue-${Date.now()}`,
      name: venueFormData.name,
      description: venueFormData.description,
      location: venueFormData.location,
      capacity: venueFormData.capacity,
      sections: [{
        id: 'section-1',
        sectionName: 'Main',
        sectionType: 'regular' as const,
        rows: [{
          rowNumber: 1,
          seats: Array.from({ length: 10 }, (_, i) => ({ seatNumber: i + 1, isAccessible: false }))
        }],
      }]
    }

    // Add to database via API
    try {
      const response = await fetch('/api/venues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVenue),
      })
      
      if (response.ok) {
        // Refresh venues list
        const venuesResponse = await fetch('/api/venues')
        if (venuesResponse.ok) {
          const venuesData = await venuesResponse.json()
          setVenues(venuesData || [])
        }
      } else {
        const errorData = await response.json()
        if (response.status === 400 && errorData.error) {
          toast({
            title: "Duplicate venue name",
            description: errorData.error,
            variant: "destructive",
          })
          setIsSubmitting(false)
          return
        }
        throw new Error('Failed to add venue')
      }
    } catch (error) {
      console.error('Error adding venue:', error)
      toast({
        title: "Error",
        description: "Failed to add venue. Please try again.",
        variant: "destructive"
      })
      setIsSubmitting(false)
      return
    }

    // Show success message
    toast({
      title: "Venue added successfully",
      description: `"${venueFormData.name}" has been added to the venues`,
    })

    // Reset form
    setVenueFormData({
      name: "",
      description: "",
      location: "",
      capacity: 0,
      imageUrl: "",
    })


    setIsSubmitting(false)
  }

  const handleEditEvent = (id: string) => {
    const eventToEdit = events.find((event) => event.id === id)
    if (eventToEdit) {
      setEditingEvent(eventToEdit)
      
      // Convert DD-MM-YYYY back to YYYY-MM-DD for input field
      let formattedDate = '';
      if (eventToEdit.date) {
        const dateParts = eventToEdit.date.split('-');
        if (dateParts.length === 3) {
          formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`; // Convert DD-MM-YYYY to YYYY-MM-DD
        }
      }
      
      setFormData({
        title: eventToEdit.title || '',
        eventType: eventToEdit.eventType || 'performance',
        date: formattedDate,
        time: eventToEdit.time || '',
        venue: eventToEdit.venue || '',
        theatreId: [], // Will be populated based on company names
        company: Array.isArray(eventToEdit.company) ? eventToEdit.company : [],
        description: eventToEdit.description || '',
        imageUrl: eventToEdit.imageUrl || '',
        isFeatured: eventToEdit.isFeatured || false,
        price: eventToEdit.price ? eventToEdit.price.replace('€', '').replace('Free', '0') : '0',
        tags: Array.isArray(eventToEdit.tags) ? eventToEdit.tags : [],
        contentLanguage: eventToEdit.contentLanguage || 'en',
        translationGroup: eventToEdit.translationGroup || '',
        performanceLanguage: Array.isArray(eventToEdit.performanceLanguage) ? eventToEdit.performanceLanguage : (eventToEdit.performanceLanguage ? [eventToEdit.performanceLanguage] : []),
        subtitleLanguage: Array.isArray(eventToEdit.subtitleLanguage) ? eventToEdit.subtitleLanguage : (eventToEdit.subtitleLanguage ? [eventToEdit.subtitleLanguage] : [])
      })
      // Scroll to form after state update
      setTimeout(() => {
        document.getElementById('event-form')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  const handleCreateEvent = async (e: React.FormEvent) => {
     e.preventDefault()
     setIsSubmitting(true)
     
     // Validate required fields
     if (formData.theatreId.length === 0) {
       toast({
         title: "Missing information",
         description: "Please select at least one theatre/company",
         variant: "destructive",
       })
       setIsSubmitting(false)
       return
     }

     // Validate performance language selection
     if (formData.performanceLanguage.length === 0) {
       toast({
         title: "Missing performance language",
         description: "Please select at least one performance language",
         variant: "destructive",
       })
       setIsSubmitting(false)
       return
     }
     
     try {
       const eventData = {
         title: formData.title,
         eventType: formData.eventType,
         date: formData.date,
         time: formData.time,
         venue: formData.venue,
         theatreId: formData.theatreId,
         company: formData.company,
         description: formData.description,
         price: formData.price,
         tags: formData.tags,
         contentLanguage: formData.contentLanguage,
         isFeatured: formData.isFeatured,
         performanceLanguage: formData.performanceLanguage,
         subtitleLanguage: formData.subtitleLanguage
       }

       const response = await fetch('/api/events', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(eventData),
       })

       if (response.ok) {
         const newEvent = await response.json()
         setEvents([...events, newEvent])
         setEditingEvent(null)
         setFormData({
           title: '',
           eventType: 'performance',
           date: '',
           time: '',
           venue: '',
           theatreId: [],
           company: [],
           description: '',
           imageUrl: '',
           isFeatured: false,
           price: '',
           tags: [],
           contentLanguage: 'en',
           translationGroup: '',
           performanceLanguage: [],
           subtitleLanguage: []
         })
         toast({
           title: "Success",
           description: "Event created successfully!",
         })
       } else {
         toast({
           title: "Error",
           description: "Failed to create event",
           variant: "destructive",
         })
       }
     } catch (error) {
       console.error('Error creating event:', error)
       toast({
         title: "Error",
         description: "Error creating event",
         variant: "destructive",
       })
     } finally {
       setIsSubmitting(false)
     }
   }

   const handleUpdateEvent = async (e: React.FormEvent) => {
     e.preventDefault()
     if (!editingEvent) return
     
     setIsSubmitting(true)
     
     try {
       const eventData = {
         title: formData.title,
         eventType: formData.eventType,
         eventDate: formData.date,
         eventTime: formData.time,
         venueId: formData.venue ? parseInt(formData.venue) : undefined,
         theatreId: formData.theatreId && formData.theatreId.length > 0 ? formData.theatreId : undefined,
         company: formData.company,
         description: formData.description,
         price: formData.price,
         tags: formData.tags,
         contentLanguage: formData.contentLanguage,
         isFeatured: formData.isFeatured,
         performanceLanguage: formData.performanceLanguage,
         subtitleLanguage: formData.subtitleLanguage
       }

       const response = await fetch(`/api/events/${editingEvent.id}`, {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(eventData),
       })

       if (response.ok) {
         const responseData = await response.json()
         console.log('Frontend received response:', responseData)
         const updatedEventFromAPI = responseData.event || responseData
         console.log('Extracted event data:', updatedEventFromAPI)
         
         // Check if the API response has the expected structure
         if (!updatedEventFromAPI || !updatedEventFromAPI.id) {
           console.error('Invalid API response:', responseData)
           throw new Error('Invalid response from server')
         }
         
         // Transform the API response to match the frontend Event interface
         const transformedEvent = {
           id: updatedEventFromAPI.id.toString(),
           title: updatedEventFromAPI.title,
           eventType: updatedEventFromAPI.eventType,
           date: updatedEventFromAPI.eventDate ? 
             new Date(updatedEventFromAPI.eventDate).toLocaleDateString('en-CA') : 
             updatedEventFromAPI.date,
           time: updatedEventFromAPI.eventTime ? 
             new Date(updatedEventFromAPI.eventTime).toLocaleTimeString('en-GB', {
               hour: '2-digit',
               minute: '2-digit',
               hour12: false
             }) : 
             updatedEventFromAPI.time,
           venue: updatedEventFromAPI.venue || 'TBA',
           company: Array.isArray(updatedEventFromAPI.company) ? updatedEventFromAPI.company : [updatedEventFromAPI.company || ''],
           description: updatedEventFromAPI.description || '',
           imageUrl: updatedEventFromAPI.imageUrl || '/placeholder.svg?height=400&width=600',
           isFeatured: updatedEventFromAPI.isFeatured,
           price: updatedEventFromAPI.price ? updatedEventFromAPI.price.toString() : '0',
           tags: updatedEventFromAPI.tags || [],
           contentLanguage: updatedEventFromAPI.contentLanguage,
           translationGroup: updatedEventFromAPI.translationGroup,
           performanceLanguage: updatedEventFromAPI.performanceLanguage,
           subtitleLanguage: updatedEventFromAPI.subtitleLanguage
         }
         
         setEvents(events.map(event => 
           event.id === editingEvent.id ? transformedEvent : event
         ))
         
         // Refresh the events list to ensure we have the latest data
         const eventsResponse = await fetch('/api/events')
         if (eventsResponse.ok) {
           const eventsData = await eventsResponse.json()
           setEvents(eventsData || [])
         }
         
         setEditingEvent(null)
         setFormData({
           title: '',
           eventType: 'performance',
           date: '',
           time: '',
           venue: '',
           theatreId: [],
           company: [],
           description: '',
           imageUrl: '',
           isFeatured: false,
           price: '',
           tags: [],
           contentLanguage: 'en',
           translationGroup: '',
           performanceLanguage: [],
           subtitleLanguage: []
         })
         toast({
           title: "Success",
           description: "Event updated successfully!",
         })
       } else {
         toast({
           title: "Error",
           description: "Failed to update event",
           variant: "destructive",
         })
       }
     } catch (error) {
       console.error('Error updating event:', error)
       toast({
         title: "Error",
         description: "Error updating event",
         variant: "destructive",
       })
     } finally {
       setIsSubmitting(false)
     }
   }

  const handleEditVenue = (id: string) => {
    const venueToEdit = venues.find((venue) => venue.id === id)
    if (venueToEdit) {
      // Ensure the venue has sections for editing
      let venueWithSections = { ...venueToEdit }
      
      // Handle backward compatibility - convert old rows structure to sections
      if ('rows' in venueToEdit && (venueToEdit as any).rows && !venueToEdit.sections) {
        venueWithSections.sections = [{
          id: '1',
          sectionName: 'Main',
          sectionType: 'regular' as const,
          rows: (venueToEdit as any).rows || []
        }]
      } else if (!venueToEdit.sections || venueToEdit.sections.length === 0) {
        // Create default section if none exist
        venueWithSections.sections = [{
          id: '1',
          sectionName: 'Main',
          sectionType: 'regular' as const,
          rows: [{
            rowNumber: 1,
            seats: Array.from({ length: 10 }, (_, i) => ({ seatNumber: i + 1, isAccessible: false }))
          }]
        }]
      }
      
      setEditingVenue(venueWithSections)
    }
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

    // Update venue via API
    try {
      console.log('Updating venue with data:', editingVenue)
      const response = await fetch(`/api/venues/${editingVenue.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingVenue),
      })
      
      if (response.ok) {
        // Refresh venues list
        const venuesResponse = await fetch('/api/venues')
        if (venuesResponse.ok) {
          const venuesData = await venuesResponse.json()
          setVenues(venuesData || [])
        }
      } else {
        throw new Error('Failed to update venue')
      }
    } catch (error) {
      console.error('Error updating venue:', error)
      toast({
        title: "Error",
        description: "Failed to update venue. Please try again.",
        variant: "destructive"
      })
      return
    }

    // Show success message
    toast({
      title: "Venue updated successfully",
      description: `"${editingVenue.name}" has been updated`,
    })

    // Reset editing state
    setEditingVenue(null)
  }

  const handleCancelEdit = () => {
    setEditingVenue(null)
  }

  const handleDeleteEvent = async (id: string) => {
    // Delete event via API
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        // Refresh events list
        const eventsResponse = await fetch('/api/events')
        if (eventsResponse.ok) {
          const eventsData = await eventsResponse.json()
          setEvents(eventsData || [])
        }
      } else {
        throw new Error('Failed to delete event')
      }
    } catch (error) {
      console.error('Error deleting event:', error)
      toast({
        title: "Error",
        description: "Failed to delete event. Please try again.",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Event deleted",
      description: "The event has been removed from the program",
    })
  }

  const handleViewTranslationGroup = async (translationGroup: string) => {
    try {
      const response = await fetch(`/api/events/translation-group/${translationGroup}`)
      if (response.ok) {
        const groupEvents = await response.json()
        // Show all language versions in a modal or expand view
        toast({
          title: "Translation Group",
          description: `Found ${groupEvents.length} language versions of this event`,
        })
      }
    } catch (error) {
      console.error('Error fetching translation group:', error)
    }
  }

  const getLanguageBadge = (language: string | undefined) => {
    if (!language) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          N/A
        </span>
      )
    }
    const badges = {
      'en': { label: 'EN', color: 'bg-blue-100 text-blue-800' },
      'bg': { label: 'BG', color: 'bg-green-100 text-green-800' },
      'mk': { label: 'MK', color: 'bg-purple-100 text-purple-800' },
      'sr': { label: 'SR', color: 'bg-orange-100 text-orange-800' }
    }
    const badge = badges[language as keyof typeof badges] || { label: language.toUpperCase(), color: 'bg-gray-100 text-gray-800' }
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.label}
      </span>
    )
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

    // Delete venue via API
    try {
      const response = await fetch(`/api/venues/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        // Refresh venues list
        const venuesResponse = await fetch('/api/venues')
        if (venuesResponse.ok) {
          const venuesData = await venuesResponse.json()
          setVenues(venuesData || [])
        }
      } else {
        throw new Error('Failed to delete venue')
      }
    } catch (error) {
      console.error('Error deleting venue:', error)
      toast({
        title: "Error",
        description: "Failed to delete venue. Please try again.",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Venue deleted",
      description: "The venue has been removed",
    })
  }

  if (isLoading || authLoading) {
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

           <a href="/admin/theatres" className="block">
             <Card className="hover:shadow-lg transition-shadow duration-200">
               <CardHeader>
                 <CardTitle>Manage Theatres</CardTitle>
               </CardHeader>
               <CardContent>
                 <p className="text-gray-600">Add, edit, and delete theatre information.</p>
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
        <TabsList className="grid w-full grid-cols-7 md:w-[1200px]">
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
          <TabsTrigger value="news" className="gap-2">
            <FileText className="h-4 w-4" />
            News
          </TabsTrigger>
          <TabsTrigger value="about" className="gap-2">
            <Info className="h-4 w-4" />
            About
          </TabsTrigger>
          <TabsTrigger value="contact" className="gap-2">
            <Phone className="h-4 w-4" />
            Contact
          </TabsTrigger>
          <TabsTrigger value="theatres" className="gap-2">
            <Building className="h-4 w-4" />
            Theatres
          </TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Manage Events</CardTitle>
                  <CardDescription>Create, edit or delete events</CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="languageFilter">Filter by Language:</Label>
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger id="languageFilter" className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Languages</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="bg">Bulgarian</SelectItem>
                        <SelectItem value="mk">Macedonian</SelectItem>
                        <SelectItem value="sr">Serbian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={() => {
                    setEditingEvent({ id: 'new' } as Event)
                    setFormData({
                      title: '',
                      eventType: 'performance',
                      date: '',
                      time: '',
                      venue: '',
                      theatreId: [],
                      company: [],
                      description: '',
                      imageUrl: '',
                      isFeatured: false,
                      price: '',
                      tags: [],
                      contentLanguage: 'en',
                      translationGroup: '',
                      performanceLanguage: [],
                      subtitleLanguage: []
                    })
                    // Scroll to form after state update
                    setTimeout(() => {
                      document.getElementById('event-form')?.scrollIntoView({ behavior: 'smooth' })
                    }, 100)
                  }}>
                    Create New Event
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredEvents.length > 0 ? (
                <div className="rounded-md border">
                  <div className="grid grid-cols-10 border-b bg-muted/50 p-3 font-medium">
                    <div className="col-span-2">Title</div>
                    <div>Type</div>
                    <div>Date</div>
                    <div>Venue</div>
                    <div>Price (BGN)</div>
                    <div>Language</div>
                    <div>Featured</div>
                    <div>Translations</div>
                    <div>Actions</div>
                  </div>
                  {filteredEvents.map((event, index) => (
                    <div key={event.id || `event-${index}`} className="grid grid-cols-10 border-b p-3">
                      <div className="col-span-2 font-medium">{event.title}</div>
                      <div className="capitalize">{event.eventType}</div>
                      <div>{event.date}</div>
                      <div>{event.venue}</div>
                      <div>{event.price ? `${(Number.parseFloat(event.price) * 1.96).toFixed(2)} BGN` : "Free"}</div>
                      <div>{getLanguageBadge(event.contentLanguage)}</div>
                      <div>{event.isFeatured ? "Yes" : "No"}</div>
                      <div>
                        {event.translationGroup && translationGroups[event.translationGroup] ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 px-2 text-xs"
                            onClick={() => handleViewTranslationGroup(event.translationGroup!)}
                          >
                            {translationGroups[event.translationGroup].length} versions
                          </Button>
                        ) : (
                          <span className="text-xs text-muted-foreground">Single</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleEditEvent(event.id)}
                        >
                          <Edit className="h-4 w-4" />
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
                  {selectedLanguage === 'all' 
                    ? "No events have been added yet."
                    : `No events found for the selected language (${selectedLanguage.toUpperCase()}).`
                  }
                </p>
              )}
            </CardContent>
          </Card>

          {editingEvent && (
            <Card id="event-form">
              <CardHeader>
                <CardTitle>{editingEvent.id === 'new' ? 'Create New Event' : 'Edit Event'}</CardTitle>
                <CardDescription>{editingEvent.id === 'new' ? 'Add a new event to the system' : 'Update event information'}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={editingEvent.id === 'new' ? handleCreateEvent : handleUpdateEvent} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                       <Label htmlFor="title">Event Title *</Label>
                       <Input
                         id="title"
                         name="title"
                         placeholder="Enter event title"
                         value={formData.title}
                         onChange={handleInputChange}
                         required
                       />
                     </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-type">Event Type *</Label>
                      <Select value={formData.eventType} onValueChange={(value) => handleSelectChange("eventType", value as "performance" | "workshop" | "discussion")}>
                        <SelectTrigger id="edit-type">
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
                       <Input id="date" name="date" type="date" value={formData.date} onChange={handleInputChange} required />
                     </div>
                     <div className="space-y-2">
                       <Label htmlFor="time">Time *</Label>
                       <Input id="time" name="time" type="time" value={formData.time} onChange={handleInputChange} required />
                     </div>
                   </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="edit-venue">Venue *</Label>
                      <Select value={formData.venue} onValueChange={(value) => handleSelectChange("venue", value)}>
                        <SelectTrigger id="edit-venue">
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
                      <Label htmlFor="edit-theatre">Theatre/Company *</Label>
                      <div className="border rounded-md p-3 max-h-40 overflow-y-auto">
                        {theatres.map((theatre) => (
                          <div key={theatre.id} className="flex items-center space-x-2 mb-2">
                            <Checkbox
                              id={`theatre-${theatre.id}`}
                              checked={formData.theatreId.includes(theatre.id)}
                              onCheckedChange={(checked) => {
                                handleMultiSelectChange('theatreId', theatre.id.toString(), checked as boolean)
                                // Update company names
                                const currentCompanies = formData.company
                                if (checked) {
                                  setFormData(prev => ({
                                    ...prev,
                                    company: [...currentCompanies, theatre.name]
                                  }))
                                } else {
                                  setFormData(prev => ({
                                    ...prev,
                                    company: currentCompanies.filter(name => name !== theatre.name)
                                  }))
                                }
                              }}
                            />
                            <Label htmlFor={`theatre-${theatre.id}`} className="text-sm">
                              {theatre.name} ({theatre.city}, {theatre.country})
                            </Label>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">Select one or more theatres/companies presenting this event</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="description">Description</Label>
                     <Textarea
                       id="description"
                       name="description"
                       placeholder="Enter event description"
                       rows={4}
                       value={formData.description}
                       onChange={handleInputChange}
                     />
                   </div>

                   <div className="space-y-2">
                     <Label htmlFor="imageUrl">Event Image</Label>
                     <Input id="imageUrl" name="imageUrl" type="file" onChange={handleFileChange} />
                   </div>

                   <div className="space-y-2">
                     <Label htmlFor="price">Ticket Price (€) *</Label>
                     <Input
                       id="price"
                       name="price"
                       type="text"
                       placeholder="20.00"
                       value={formData.price}
                       onChange={handleInputChange}
                       required
                     />
                   </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-tags">Tags (comma separated)</Label>
                    <Input
                      id="edit-tags"
                      placeholder="drama, comedy, modern, classic"
                      value={formData.tags.join(", ")}
                      onChange={handleTagsChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-contentLanguage">Content Language *</Label>
                    <Select value={formData.contentLanguage} onValueChange={(value) => handleSelectChange("contentLanguage", value)}>
                      <SelectTrigger id="edit-contentLanguage">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="mk">Macedonian</SelectItem>
                        <SelectItem value="bg">Bulgarian</SelectItem>
                        <SelectItem value="sr">Serbian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-performanceLanguage">Performance Language(s) *</Label>
                    <div className="border rounded-md p-3">
                      {languageOptions.map((lang) => (
                        <div key={lang.code} className="flex items-center space-x-2 mb-2">
                          <Checkbox
                            id={`perf-lang-${lang.code}`}
                            checked={formData.performanceLanguage.includes(lang.code)}
                            onCheckedChange={(checked) => {
                              handleMultiSelectChange('performanceLanguage', lang.code, checked as boolean)
                            }}
                          />
                          <Label htmlFor={`perf-lang-${lang.code}`} className="text-sm">
                            {lang.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">Select the language(s) the performance will be in</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-subtitleLanguage">Subtitle Language(s)</Label>
                    <div className="border rounded-md p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Checkbox
                          id="subtitle-none"
                          checked={formData.subtitleLanguage.includes('none')}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData(prev => ({ ...prev, subtitleLanguage: ['none'] }))
                            } else {
                              setFormData(prev => ({ ...prev, subtitleLanguage: [] }))
                            }
                          }}
                        />
                        <Label htmlFor="subtitle-none" className="text-sm">
                          No subtitles
                        </Label>
                      </div>
                      {languageOptions.map((lang) => (
                        <div key={lang.code} className="flex items-center space-x-2 mb-2">
                          <Checkbox
                            id={`sub-lang-${lang.code}`}
                            checked={formData.subtitleLanguage.includes(lang.code) && !formData.subtitleLanguage.includes('none')}
                            disabled={formData.subtitleLanguage.includes('none')}
                            onCheckedChange={(checked) => {
                              if (formData.subtitleLanguage.includes('none')) {
                                setFormData(prev => ({ ...prev, subtitleLanguage: [lang.code] }))
                              } else {
                                handleMultiSelectChange('subtitleLanguage', lang.code, checked as boolean)
                              }
                            }}
                          />
                          <Label htmlFor={`sub-lang-${lang.code}`} className="text-sm">
                            {lang.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">Select subtitle languages or choose 'No subtitles'</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="edit-featured" checked={formData.isFeatured} onCheckedChange={handleFeaturedToggle} />
                    <Label htmlFor="edit-featured">Featured Event (displayed on homepage)</Label>
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Updating Event..." : "Update Event"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setEditingEvent(null)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="venues" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{editingVenue ? "Edit Venue" : "Add New Venue"}</CardTitle>
              <CardDescription>{editingVenue ? "Update venue information" : "Create a new venue for events"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Venue Name</Label>
                <Input
                  id="name"
                  placeholder="Enter venue name"
                  value={editingVenue ? editingVenue.name : venueFormData.name}
                  onChange={handleVenueInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Enter venue location"
                  value={editingVenue ? editingVenue.location : venueFormData.location}
                  onChange={handleVenueInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="Enter venue capacity"
                  value={editingVenue ? editingVenue.capacity : venueFormData.capacity}
                  onChange={handleVenueInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter venue description"
                  value={editingVenue ? editingVenue.description : venueFormData.description}
                  onChange={handleVenueInputChange}
                />
              </div>
              {/* Section Configuration */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Venue Sections</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (editingVenue) {
                        const newSection: VenueSection = {
                          id: `section-${Date.now()}`,
                          sectionName: `Section ${editingVenue.sections.length + 1}`,
                          sectionType: 'regular',
                          rows: [{
                            rowNumber: 1,
                            seats: Array.from({ length: 10 }, (_, i) => ({ seatNumber: i + 1, isAccessible: false }))
                          }]
                        }
                        setEditingVenue({
                          ...editingVenue,
                          sections: [...editingVenue.sections, newSection]
                        })
                      }
                    }}
                  >
                    Add Section
                  </Button>
                </div>
                
                {editingVenue?.sections.map((section, sectionIndex) => (
                  <div key={section.id} className="border-2 p-4 rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Input
                          value={section.sectionName}
                          onChange={(e) => {
                            const updatedSections = [...editingVenue.sections]
                            updatedSections[sectionIndex].sectionName = e.target.value
                            setEditingVenue({
                              ...editingVenue,
                              sections: updatedSections
                            })
                          }}
                          className="font-medium"
                        />
                        <Select
                          value={section.sectionType}
                          onValueChange={(value: 'regular' | 'balcony') => {
                            const updatedSections = [...editingVenue.sections]
                            updatedSections[sectionIndex].sectionType = value
                            setEditingVenue({
                              ...editingVenue,
                              sections: updatedSections
                            })
                          }}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="regular">Regular</SelectItem>
                            <SelectItem value="balcony">Balcony</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {editingVenue.sections.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            const updatedSections = editingVenue.sections.filter((_, i) => i !== sectionIndex)
                            setEditingVenue({
                              ...editingVenue,
                              sections: updatedSections
                            })
                          }}
                        >
                          Remove Section
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">Number of Rows:</Label>
                        <Input
                          type="number"
                          min="1"
                          value={section.rows.length}
                          onChange={(e) => {
                            const count = parseInt(e.target.value) || 1
                            const updatedSections = [...editingVenue.sections]
                            const currentRows = [...section.rows]
                            
                            if (count > currentRows.length) {
                              const newRows = Array.from({ length: count - currentRows.length }, (_, i) => ({
                                rowNumber: currentRows.length + i + 1,
                                seats: Array.from({ length: 10 }, (_, j) => ({ seatNumber: j + 1, isAccessible: false }))
                              }))
                              updatedSections[sectionIndex].rows = [...currentRows, ...newRows]
                            } else if (count < currentRows.length) {
                              updatedSections[sectionIndex].rows = currentRows.slice(0, count)
                            }
                            
                            setEditingVenue({
                              ...editingVenue,
                              sections: updatedSections
                            })
                          }}
                          className="w-20"
                        />
                      </div>
                    </div>
                    
                    {/* Row Configuration for this section */}
                    <div className="space-y-3">
                      {section.rows.map((row, rowIndex) => (
                        <div key={row.rowNumber} className="border p-3 rounded space-y-2">
                          <div className="flex items-center gap-4">
                            <Label className="font-medium text-sm">Row {row.rowNumber}</Label>
                            <div className="flex items-center gap-2">
                              <Label className="text-xs">Seats:</Label>
                              <Input
                                type="number"
                                min="1"
                                value={row.seats.length}
                                onChange={(e) => {
                                  const seatCount = parseInt(e.target.value) || 1
                                  const updatedSections = [...editingVenue.sections]
                                  const currentSeats = [...row.seats]
                                  
                                  if (seatCount > currentSeats.length) {
                                    const newSeats = Array.from({ length: seatCount - currentSeats.length }, (_, i) => ({
                                      seatNumber: currentSeats.length + i + 1,
                                      isAccessible: false
                                    }))
                                    updatedSections[sectionIndex].rows[rowIndex].seats = [...currentSeats, ...newSeats]
                                  } else {
                                    updatedSections[sectionIndex].rows[rowIndex].seats = currentSeats.slice(0, seatCount)
                                  }
                                  
                                  setEditingVenue({
                                    ...editingVenue,
                                    sections: updatedSections
                                  })
                                }}
                                className="w-16 text-xs"
                              />
                            </div>
                          </div>
                          
                          {/* Seat Configuration */}
                          <div className="grid grid-cols-10 gap-1">
                            {row.seats.map((seat, seatIndex) => (
                              <div key={`${sectionIndex}-${rowIndex}-${seat.seatNumber}`} className="flex flex-col items-center">
                                <div className={`w-6 h-6 border rounded flex items-center justify-center text-xs ${
                                  seat.isAccessible ? 'bg-blue-100 border-blue-500' : 'bg-gray-100 border-gray-300'
                                }`}>
                                  {seat.seatNumber}
                          </div>
                                 <Switch
                                   checked={seat.isAccessible}
                                   onCheckedChange={(checked) => {
                                     const updatedSections = [...editingVenue.sections]
                                     updatedSections[sectionIndex].rows[rowIndex].seats[seatIndex].isAccessible = checked
                                     setEditingVenue({
                                       ...editingVenue,
                                       sections: updatedSections
                                     })
                                   }}
                                   className="mt-1 scale-75"
                                 />
                                 <span className="text-xs text-muted-foreground mt-1">
                                   {seat.isAccessible ? 'ACC' : 'REG'}
                                 </span>
                               </div>
                             ))}
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 ))}
                 <p className="text-sm text-muted-foreground">
                   Toggle switches to mark seats as accessible (blue). Accessible seats will be clearly marked for disabled users.
                 </p>
               </div>
              <div className="flex gap-2">
                {editingVenue ? (
                  <>
                    <Button onClick={handleUpdateVenue}>Update Venue</Button>
                    <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
                  </>
                ) : (
                  <Button onClick={handleAddVenue}>Add Venue</Button>
                )}
              </div>
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
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mr-2"
                          onClick={() => handleEditVenue(venue.id)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteVenue(venue.id)}
                        >
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
              <CardDescription>Manage news articles and content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Manage news articles from the dedicated news management page.
                </p>
                <Button onClick={() => router.push('/admin/news')}>
                  Go to News Management
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Page Management</CardTitle>
              <CardDescription>Manage about page content in multiple languages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Create and manage about page content for different languages.
                </p>
                <Button onClick={() => router.push('/admin/about')}>
                  Go to About Management
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Page Management</CardTitle>
              <CardDescription>Manage contact page content in multiple languages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Create and manage contact page content for different languages.
                </p>
                <Button onClick={() => router.push('/admin/contact')}>
                  Go to Contact Management
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="theatres">
          <Card>
            <CardHeader>
              <CardTitle>Theatre Management</CardTitle>
              <CardDescription>Manage theatre and participant information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Create and manage theatre profiles and participant information.
                </p>
                <Button onClick={() => router.push('/admin/theatres')}>
                  Go to Theatre Management
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
