import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin, Languages, Users, Subtitles } from "lucide-react"
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
// Removed static import - now using API

export default async function PerformancePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Extract original ID if it's prefixed
  const originalId = id.startsWith('performance-') ? id.replace('performance-', '') : id
  
  // Fetch performance from database
  let performance = null
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/events/${originalId}`, {
      cache: 'no-store'
    })
    if (response.ok) {
      performance = await response.json()
    }
  } catch (error) {
    console.error('Error fetching performance:', error)
  }

  if (!performance) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary-blue mb-4">Performance Not Found</h1>
          <p className="text-muted-foreground mb-6">The performance you're looking for doesn't exist.</p>
          <Link href="/program" className="text-primary-gold hover:underline">← Back to Program</Link>
        </div>
      </div>
    )
  }

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
          <p className="mb-4 text-xl text-muted-foreground">
            {Array.isArray(performance.company) ? performance.company.join(' & ') : performance.company}
          </p>

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
              </div>
            </div>
          </div>

          <h2 className="mb-4 text-2xl font-semibold text-secondary-blue">Synopsis</h2>
          <div className="mb-8 space-y-4">
            {performance.synopsis.split("\n\n").map((paragraph: string, index: number) => (
              <p key={index} className="text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>

          {(performance.director !== "TBA" || performance.cast.length > 0) && (
            <>
              <h2 className="mb-4 text-2xl font-semibold text-secondary-blue">Cast & Crew</h2>
              <div className="mb-8 space-y-2">
                {performance.director !== "TBA" && (
                  <div className="flex">
                    <span className="w-24 font-medium">Director:</span>
                    <span className="text-muted-foreground">{performance.director}</span>
                  </div>
                )}
                {performance.cast.length > 0 && (
                  <div className="flex flex-col">
                    <span className="mb-2 w-24 font-medium">Cast:</span>
                    <ul className="ml-6 list-disc space-y-1">
                      {performance.cast.map((actor: string, index: number) => (
                        <li key={index} className="text-muted-foreground">
                          {actor}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
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
              {performance.subtitles && (
                <div className="flex items-center gap-2">
                  <Subtitles className="h-5 w-5 text-primary-gold" />
                  <span className="text-sm">Subtitles: {performance.subtitles}</span>
                </div>
              )}
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
