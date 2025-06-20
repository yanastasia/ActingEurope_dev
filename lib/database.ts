// Database connection and utility functions
// Note: In a real application, you would use a proper database connection library like mysql2 or prisma

export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  phone?: string
  role: "super_admin" | "admin" | "seller" | "client"
  emailNotifications: boolean
  marketingPreferences: boolean
  createdAt: string
}

export interface Theatre {
  id: number
  name: string
  city: string
  country: string
  description: string
  history: string
  website?: string
  foundedYear: number
  images: TheatreImage[]
  tags: string[]
}

export interface TheatreImage {
  id: number
  imageUrl: string
  caption?: string
  isPrimary: boolean
}

export interface Venue {
  id: number
  name: string
  description: string
  capacity: number
  sections: VenueSection[]
}

export interface VenueSection {
  id: number
  sectionName: string
  sectionType: "regular" | "balcony"
  seats: Seat[]
}

export interface Seat {
  id: number
  rowNumber: number
  seatNumber: number
  isAvailable: boolean
}

export interface Event {
  id: number
  title: string
  theatreId: number
  venueId: number
  eventType: "performance" | "workshop" | "discussion"
  eventDate: string
  eventTime: string
  durationMinutes?: number
  description: string
  price: number
  imageUrl?: string
  language?: string
  genre?: string
  isFeatured: boolean
  tags?: string[]
  theatre: Theatre
  venue: Venue
}

export interface Booking {
  id: number
  userId: number
  eventId: number
  bookingReference: string
  totalAmount: number
  bookingStatus: "pending" | "confirmed" | "cancelled"
  seats: Seat[]
  event: Event
}

// Mock user data (for initial setup or testing)
export const mockUsers: User[] = [
  {
    id: 1,
    email: "admin@actingeurope.eu",
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    emailNotifications: true,
    marketingPreferences: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    email: "user@example.com",
    firstName: "Regular",
    lastName: "User",
    role: "client",
    emailNotifications: true,
    marketingPreferences: false,
    createdAt: new Date().toISOString(),
  },
]

// Updated theatre data with correct information
export const mockTheatres: Theatre[] = [
  {
    id: 1,
    name: 'Drama Theatre "Krum Kyulyavkov"',
    city: "Kyustendil",
    country: "Bulgaria",
    description:
      "A prominent regional theatre known for its innovative productions and commitment to Bulgarian dramatic arts.",
    history:
      "Founded in the mid-20th century, the theatre has been a cultural cornerstone of Kyustendil, presenting both classical and contemporary works while nurturing local talent. The theatre was named after Krum Kyulyavkov, a celebrated Bulgarian actor and director who significantly contributed to the development of Bulgarian theatre. Over the decades, it has maintained its reputation for artistic excellence and community engagement.",
    foundedYear: 1952,
    images: [
      {
        id: 1,
        imageUrl: "/placeholder.svg?height=400&width=600&text=Krum+Kyulyavkov+Theatre",
        caption: "Main building facade",
        isPrimary: true,
      },
      {
        id: 2,
        imageUrl: "/placeholder.svg?height=300&width=400&text=Theatre+Interior",
        caption: "Main auditorium",
        isPrimary: false,
      },
      {
        id: 3,
        imageUrl: "/placeholder.svg?height=300&width=400&text=Stage+Performance",
        caption: "Recent performance",
        isPrimary: false,
      },
    ],
    tags: ["Regional Theatre", "Bulgarian Drama", "Contemporary Works", "Community Theatre"],
  },
  {
    id: 2,
    name: '"Ivan Vazov" National Theatre',
    city: "Sofia",
    country: "Bulgaria",
    description: "Bulgaria's oldest and most prestigious theatre, serving as the national stage for dramatic arts.",
    history:
      "Established in 1904, the Ivan Vazov National Theatre is named after Bulgaria's national poet Ivan Vazov. It has been the premier venue for Bulgarian theatre, hosting legendary performances and international collaborations. The theatre building itself is an architectural masterpiece and a symbol of Bulgarian cultural identity. Throughout its history, it has been home to the most celebrated Bulgarian actors and directors.",
    foundedYear: 1904,
    images: [
      {
        id: 4,
        imageUrl: "/placeholder.svg?height=400&width=600&text=Ivan+Vazov+National+Theatre",
        caption: "Historic building exterior",
        isPrimary: true,
      },
      {
        id: 5,
        imageUrl: "/placeholder.svg?height=300&width=400&text=Grand+Hall",
        caption: "Grand auditorium",
        isPrimary: false,
      },
      {
        id: 6,
        imageUrl: "/placeholder.svg?height=300&width=400&text=Classical+Performance",
        caption: "Classical drama performance",
        isPrimary: false,
      },
    ],
    tags: ["National Theatre", "Classical Drama", "Bulgarian Heritage", "Historic Venue"],
  },
  {
    id: 3,
    name: '"N. O. Masalitinov" Plovdiv Drama Theatre',
    city: "Plovdiv",
    country: "Bulgaria",
    description:
      "One of Bulgaria's leading regional theatres, known for its diverse repertoire and artistic excellence.",
    history:
      "Named after the renowned Bulgarian actor Nikola Masalitinov, this theatre has been a cultural beacon in Plovdiv since its establishment in 1881, contributing significantly to Bulgarian theatrical heritage. The theatre has a rich tradition of presenting both Bulgarian and international works, and has been instrumental in developing theatrical arts in the region.",
    foundedYear: 1881,
    images: [
      {
        id: 7,
        imageUrl: "/placeholder.svg?height=400&width=600&text=Masalitinov+Plovdiv+Theatre",
        caption: "Theatre building",
        isPrimary: true,
      },
      {
        id: 8,
        imageUrl: "/placeholder.svg?height=300&width=400&text=Modern+Stage",
        caption: "Modern stage setup",
        isPrimary: false,
      },
    ],
    tags: ["Regional Theatre", "Diverse Repertoire", "Artistic Excellence", "Cultural Heritage"],
  },
  {
    id: 4,
    name: '"Jordan Hadzi Konstantinov - Dzinot" Drama Theatre',
    city: "Veles",
    country: "North Macedonia",
    description:
      "A distinguished theatre company from Veles, continuing the legacy of theatrical excellence in North Macedonia.",
    history:
      "Named after Jordan Hadzi Konstantinov - Dzinot, a prominent figure in Macedonian theatre, this institution has been a vital part of the cultural landscape in Veles since its founding. The theatre has contributed significantly to the development of Macedonian dramatic arts and continues to present works that celebrate both local and international theatrical traditions.",
    foundedYear: 1945,
    images: [
      {
        id: 9,
        imageUrl: "/placeholder.svg?height=400&width=600&text=Jordan+Hadzi+Konstantinov+Theatre",
        caption: "Theatre exterior",
        isPrimary: true,
      },
      {
        id: 10,
        imageUrl: "/placeholder.svg?height=300&width=400&text=Performance+Hall",
        caption: "Performance hall",
        isPrimary: false,
      },
    ],
    tags: ["Macedonian Theatre", "Cultural Heritage", "Regional Arts", "Traditional Drama"],
  },
  {
    id: 5,
    name: "National Theatre",
    city: "Belgrade",
    country: "Serbia",
    description: "Serbia's premier theatrical institution, renowned for its classical and contemporary productions.",
    history:
      "Founded in 1868, the National Theatre of Belgrade has been the cornerstone of Serbian dramatic arts, hosting world-class productions and fostering theatrical innovation. It has played a crucial role in preserving Serbian cultural heritage while embracing modern theatrical movements.",
    foundedYear: 1868,
    images: [
      {
        id: 11,
        imageUrl: "/placeholder.svg?height=400&width=600&text=Belgrade+National+Theatre",
        caption: "Historic theatre building",
        isPrimary: true,
      },
      {
        id: 12,
        imageUrl: "/placeholder.svg?height=300&width=400&text=Grand+Stage",
        caption: "Grand stage",
        isPrimary: false,
      },
    ],
    tags: ["National Theatre", "Serbian Heritage", "Classical Productions", "Theatrical Innovation"],
  },
  {
    id: 6,
    name: "Macedonian National Theatre",
    city: "Skopje",
    country: "North Macedonia",
    description:
      "The leading theatrical institution of North Macedonia, showcasing the rich cultural heritage of the region.",
    history:
      "Established in 1947 as the premier theatre of North Macedonia, it has been instrumental in developing and preserving Macedonian theatrical traditions while embracing international collaborations. The theatre has been a symbol of Macedonian cultural identity and artistic achievement.",
    foundedYear: 1947,
    images: [
      {
        id: 13,
        imageUrl: "/placeholder.svg?height=400&width=600&text=Macedonian+National+Theatre",
        caption: "National theatre building",
        isPrimary: true,
      },
      {
        id: 14,
        imageUrl: "/placeholder.svg?height=300&width=400&text=Cultural+Performance",
        caption: "Cultural performance",
        isPrimary: false,
      },
    ],
    tags: ["National Theatre", "Macedonian Culture", "International Collaborations", "Cultural Identity"],
  },
]

// Database utility functions (mock implementations)
export async function getUserByEmail(email: string): Promise<User | null> {
  // In a real app, this would query the database
  const users = JSON.parse(localStorage.getItem("actingEurope_users") || "[]")
  return users.find((user: User) => user.email === email) || null
}

export async function createUser(userData: Omit<User, "id" | "createdAt" | "role">): Promise<User> {
  // In a real app, this would insert into the database
  const users = JSON.parse(localStorage.getItem("actingEurope_users") || "[]")
  const newUser: User = {
    ...userData,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    role: "client", // Default role for new users
  }
  users.push(newUser)
  localStorage.setItem("actingEurope_users", JSON.stringify(users))
  return newUser
}

export async function getTheatres(): Promise<Theatre[]> {
  // In a real app, this would query the database
  return mockTheatres
}

export async function getTheatreById(id: number): Promise<Theatre | null> {
  // In a real app, this would query the database
  return mockTheatres.find((theatre) => theatre.id === id) || null
}

export async function getVenues(): Promise<Venue[]> {
  // Updated venue data with correct seating layouts
  return [
    {
      id: 1,
      name: "Main Stage",
      description: "Main performance venue with regular and balcony seating",
      capacity: 500,
      sections: [
        {
          id: 1,
          sectionName: "Regular Seating",
          sectionType: "regular",
          seats: generateMainStageRegularSeats(),
        },
        {
          id: 2,
          sectionName: "Balcony Seating",
          sectionType: "balcony",
          seats: generateMainStageBalconySeats(),
        },
      ],
    },
    {
      id: 2,
      name: "Chamber Stage",
      description: "Intimate performance space for smaller productions",
      capacity: 150,
      sections: [
        {
          id: 3,
          sectionName: "Main Seating",
          sectionType: "regular",
          seats: generateChamberStageSeats(),
        },
      ],
    },
  ]
}

function generateMainStageRegularSeats(): Seat[] {
  const seats: Seat[] = []
  const rowSeats = [22, 27, 26, 29, 28, 31, 0, 30, 33, 33, 33, 33, 32, 31, 30, 26, 26] // Row 7 has 0 seats (skipped)

  rowSeats.forEach((seatCount, rowIndex) => {
    const rowNumber = rowIndex + 1
    if (seatCount > 0) {
      // Skip row 7
      for (let seatNumber = 1; seatNumber <= seatCount; seatNumber++) {
        seats.push({
          id: Number.parseInt(`1${rowNumber.toString().padStart(2, "0")}${seatNumber.toString().padStart(2, "0")}`),
          rowNumber,
          seatNumber,
          isAvailable: Math.random() > 0.1, // 90% availability for demo
        })
      }
    }
  })

  return seats
}

function generateMainStageBalconySeats(): Seat[] {
  const seats: Seat[] = []
  const rowSeats = [30, 29, 30, 29, 30, 29, 30]

  rowSeats.forEach((seatCount, rowIndex) => {
    const rowNumber = rowIndex + 1
    for (let seatNumber = 1; seatNumber <= seatCount; seatNumber++) {
      seats.push({
        id: Number.parseInt(`2${rowNumber.toString().padStart(2, "0")}${seatNumber.toString().padStart(2, "0")}`),
        rowNumber,
        seatNumber,
        isAvailable: Math.random() > 0.05, // 95% availability for demo
      })
    }
  })

  return seats
}

function generateChamberStageSeats(): Seat[] {
  const seats: Seat[] = []
  // Updated Chamber Stage seating: row 1: 12, row 2: 13, row 3: 14, rows 4,5,6: 13 each, rows 7,8: 9 each
  const rowSeats = [12, 13, 14, 13, 13, 13, 9, 9]

  rowSeats.forEach((seatCount, rowIndex) => {
    const rowNumber = rowIndex + 1
    for (let seatNumber = 1; seatNumber <= seatCount; seatNumber++) {
      seats.push({
        id: Number.parseInt(`3${rowNumber.toString().padStart(2, "0")}${seatNumber.toString().padStart(2, "0")}`),
        rowNumber,
        seatNumber,
        isAvailable: Math.random() > 0.08, // 92% availability for demo
      })
    }
  })

  return seats
}
