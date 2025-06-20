import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin, Languages, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// This would normally come from a database
const getPerformance = (id: string) => {
  return {
    id,
    title: "Hamlet Reimagined",
    company: "Copenhagen Theatre Ensemble",
    director: "Anna Bergmann",
    cast: ["Michael Sørensen", "Lena Jensen", "Erik Nielsen", "Maria Poulsen"],
    date: "June 15, 2023",
    time: "19:30",
    venue: "Main Stage",
    address: "Theatre Square 1, City Center",
    imageUrl: "/placeholder.svg?height=600&width=1200",
    genre: "Drama",
    language: "English with subtitles",
    duration: "120 min",
    synopsis:
      "A modern take on Shakespeare's classic tragedy, exploring themes of power and betrayal through contemporary movement and multimedia. This innovative production reimagines the Danish prince's story in a corporate setting, where the struggle for power takes place in boardrooms rather than royal courts.\n\nThe production features striking visual design, original music, and physical theatre elements that bring new dimensions to this timeless story of revenge, moral corruption, and the human condition.",
    reviews: [
      {
        source: "Theatre Today",
        quote: "A breathtaking reimagining that brings new relevance to Shakespeare's masterpiece.",
        rating: 5,
      },
      {
        source: "European Stage",
        quote: "Bold, innovative, and deeply moving - theatre at its finest.",
        rating: 4.5,
      },
    ],
  }
}

export default function PerformancePage({ params }: { params: { id: string } }) {
  const performance = getPerformance(params.id)

  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/performances">Performances</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{performance.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="mb-6 aspect-video relative overflow-hidden rounded-lg">
            <Image
              src={performance.imageUrl || "/placeholder.svg"}
              alt={performance.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <h1 className="mb-2 text-3xl font-bold text-secondary-blue md:text-4xl">{performance.title}</h1>
          <p className="mb-4 text-xl text-muted-foreground">{performance.company}</p>

          <div className="mb-6 flex flex-wrap gap-2">
            <Badge className="bg-primary-gold/20 text-secondary-blue">{performance.genre}</Badge>
            <Badge className="bg-muted">{performance.language}</Badge>
            <Badge className="bg-muted">{performance.duration}</Badge>
          </div>

          <div className="mb-8 space-y-4 rounded-lg bg-muted/30 p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary-gold" />
              <span className="font-medium">{performance.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary-gold" />
              <span className="font-medium">{performance.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary-gold" />
              <div>
                <div className="font-medium">{performance.venue}</div>
                <div className="text-sm text-muted-foreground">{performance.address}</div>
              </div>
            </div>
          </div>

          <h2 className="mb-4 text-2xl font-semibold text-secondary-blue">Synopsis</h2>
          <div className="mb-8 space-y-4">
            {performance.synopsis.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>

          <h2 className="mb-4 text-2xl font-semibold text-secondary-blue">Cast & Crew</h2>
          <div className="mb-8 space-y-2">
            <div className="flex">
              <span className="w-24 font-medium">Director:</span>
              <span className="text-muted-foreground">{performance.director}</span>
            </div>
            <div className="flex flex-col">
              <span className="mb-2 w-24 font-medium">Cast:</span>
              <ul className="ml-6 list-disc space-y-1">
                {performance.cast.map((actor, index) => (
                  <li key={index} className="text-muted-foreground">
                    {actor}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h2 className="mb-4 text-2xl font-semibold text-secondary-blue">Reviews</h2>
          <div className="mb-8 space-y-4">
            {performance.reviews.map((review, index) => (
              <div key={index} className="rounded-lg border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium">{review.source}</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(review.rating) ? "text-primary-gold" : "text-muted"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    {review.rating % 1 > 0 && (
                      <svg className="h-4 w-4 text-primary-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground">"{review.quote}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="sticky top-20 space-y-6 rounded-lg border p-6">
            <h2 className="text-xl font-semibold text-secondary-blue">Book Your Tickets</h2>
            <Separator />

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Date:</span>
                <span>{performance.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Time:</span>
                <span>{performance.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Venue:</span>
                <span>{performance.venue}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Duration:</span>
                <span>{performance.duration}</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Languages className="h-5 w-5 text-primary-gold" />
                <span className="text-sm">{performance.language}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary-gold" />
                <span className="text-sm">Suitable for ages 12+</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <Button className="w-full" size="lg" asChild>
                <Link href={`/tickets?performance=${performance.id}`}>Book Ticket</Link>
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                Add to Calendar
              </Button>
            </div>

            <div className="mt-6 rounded-lg bg-muted/30 p-4 text-center text-sm">
              <p className="font-medium">Need assistance?</p>
              <p className="text-muted-foreground">Contact our box office at:</p>
              <p className="text-primary-gold">tickets@actingeurope.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
