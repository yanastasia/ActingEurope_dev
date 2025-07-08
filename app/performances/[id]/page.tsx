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
import { performances } from "@/lib/performance-data"

export default async function PerformancePage({ params }: { params: { id: string } }) {
  const performance = performances.find((p) => p.id === params.id)

  if (!performance) {
    return <div>Performance not found</div>
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
