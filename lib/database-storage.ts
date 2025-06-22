// Enhanced localStorage-based database for persistent storage
// This provides a more robust storage solution that persists data

export interface Event {
  id: string;
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

export interface StorageData {
  events: any[]
  venues: any[]
  bookings: any[]
  users: any[]
  news: any[]
}

export class DatabaseStorage {
  private static instance: DatabaseStorage
  private storageKey = "actingEurope_database"

  private constructor() {
    // Initialize with default data if not exists
    this.initializeDatabase()
  }

  static getInstance(): DatabaseStorage {
    if (!DatabaseStorage.instance) {
      DatabaseStorage.instance = new DatabaseStorage()
    }
    return DatabaseStorage.instance
  }

  private initializeDatabase(): void {
    if (typeof window === "undefined") return

    const existingData = localStorage.getItem(this.storageKey)
    if (!existingData) {
      const defaultData: StorageData = {
        events: [],
        venues: [
          {
            id: "venue-1",
            name: "Main Stage",
            description: "Main performance venue with regular and balcony seating",
            rows: Array.from({ length: 16 }, (_, i) => ({
              rowNumber: i + 1,
              seatCount: i === 6 ? 0 : 20 + Math.floor(Math.random() * 10),
            })),
          },
          {
            id: "venue-2",
            name: "Chamber Stage",
            description: "Intimate performance space for smaller productions",
            rows: [
              { rowNumber: 1, seatCount: 12 },
              { rowNumber: 2, seatCount: 13 },
              { rowNumber: 3, seatCount: 14 },
              { rowNumber: 4, seatCount: 13 },
              { rowNumber: 5, seatCount: 13 },
              { rowNumber: 6, seatCount: 13 },
              { rowNumber: 7, seatCount: 9 },
              { rowNumber: 8, seatCount: 9 },
            ],
          },
        ],
        bookings: [],
                users: [
          {
            id: "anastasia-admin",
            email: "anastasia@actingeurope.eu",
            password: "ActingEurope2025!", // In a real app, this would be hashed
            role: "super_admin",
            emailVerified: true,
          },
          {
            id: "toni-admin",
            email: "toni@actingeurope.eu",
            password: "ActingEurope2025!", // In a real app, this would be hashed
            role: "super_admin",
            emailVerified: true,
          },
        ],
        news: [],
      }
      this.saveData(defaultData)
    }
  }

  private getData(): StorageData {
    if (typeof window === "undefined") {
      return { events: [], venues: [], bookings: [], users: [], news: [] }
    }

    const data = localStorage.getItem(this.storageKey)
    if (data) {
      try {
        return JSON.parse(data)
      } catch (error) {
        console.error("Error parsing database data:", error)
      }
    }
    return { events: [], venues: [], bookings: [], users: [], news: [] }
  }

  private saveData(data: StorageData): void {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data))
      // Dispatch custom event to notify components of data changes
      window.dispatchEvent(new CustomEvent("databaseUpdated", { detail: data }))
    } catch (error) {
      console.error("Error saving database data:", error)
    }
  }

  // Events
  getEvents(): any[] {
    return this.getData().events
  }

  addEvent(event: any): void {
    const data = this.getData()
    data.events.push(event)
    this.saveData(data)
  }

  updateEvent(eventId: string, updatedEvent: any): void {
    const data = this.getData()
    const index = data.events.findIndex((event) => event.id === eventId)
    if (index !== -1) {
      data.events[index] = updatedEvent
      this.saveData(data)
    }
  }

  deleteEvent(eventId: string): void {
    const data = this.getData()
    data.events = data.events.filter((event) => event.id !== eventId)
    this.saveData(data)
  }

  // Venues
  getVenues(): any[] {
    return this.getData().venues
  }

  addVenue(venue: any): void {
    const data = this.getData()
    data.venues.push(venue)
    this.saveData(data)
  }

  updateVenue(venueId: string, updatedVenue: any): void {
    const data = this.getData()
    const index = data.venues.findIndex((venue) => venue.id === venueId)
    if (index !== -1) {
      data.venues[index] = updatedVenue
      this.saveData(data)
    }
  }

  deleteVenue(venueId: string): void {
    const data = this.getData()
    data.venues = data.venues.filter((venue) => venue.id !== venueId)
    this.saveData(data)
  }

  // Bookings
  getBookings(): any[] {
    return this.getData().bookings
  }

  addBooking(booking: any): void {
    const data = this.getData()
    data.bookings.push(booking)
    this.saveData(data)
  }

  // Users
  getUsers(): any[] {
    return this.getData().users
  }

  addUser(user: any): void {
    const data = this.getData()
    data.users.push(user)
    this.saveData(data)
  }

  // News
  getNews(): any[] {
    return this.getData().news
  }

  addNews(newsItem: any): void {
    const data = this.getData()
    data.news.push(newsItem)
    this.saveData(data)
  }
  clearAllData(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(this.storageKey)
    this.initializeDatabase()
    console.log("All database data cleared and reinitialized.")
}

  updateUser(updatedUser: any): void {
    const data = this.getData()
    const userIndex = data.users.findIndex((user: any) => user.id === updatedUser.id)
    if (userIndex !== -1) {
      data.users[userIndex] = updatedUser
      this.saveData(data)
    }
  }
}

export const ds = DatabaseStorage.getInstance()
