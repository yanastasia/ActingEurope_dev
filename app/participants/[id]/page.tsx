import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, ExternalLink, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getTheatreById } from "@/lib/database"
import { notFound } from "next/navigation"

export default async function TheatrePage({ params }: { params: { id: string } }) {
  const theatre = await getTheatreById(Number.parseInt(params.id))

  if (!theatre) {
    notFound()
  }

  const primaryImage = theatre.images.find((img) => img.isPrimary)
  const galleryImages = theatre.images.filter((img) => !img.isPrimary)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/participants">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Participants
          </Link>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Hero Image */}
          {primaryImage && (
            <div className="mb-8 aspect-video relative overflow-hidden rounded-lg">
              <Image
                src={primaryImage.imageUrl || "/placeholder.svg"}
                alt={theatre.name}
                fill
                className="object-cover"
                priority
              />
              {primaryImage.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-sm text-white">{primaryImage.caption}</p>
                </div>
              )}
            </div>
          )}

          {/* Theatre Info */}
          <div className="mb-8">
            <h1 className="mb-4 text-3xl font-bold text-secondary-blue md:text-4xl">{theatre.name}</h1>
            <div className="mb-4 flex flex-wrap gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>
                  {theatre.city}, {theatre.country}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Founded in {theatre.foundedYear}</span>
              </div>
              {theatre.website && (
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <a
                    href={theatre.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-gold"
                  >
                    Official Website
                  </a>
                </div>
              )}
            </div>
            <p className="text-lg text-muted-foreground">{theatre.description}</p>
          </div>

          <Separator className="my-8" />

          {/* History */}
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-secondary-blue">Theatre History</h2>
            <div className="prose max-w-none">
              {theatre.history.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Gallery */}
          {galleryImages.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-secondary-blue">Gallery</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {galleryImages.map((image) => (
                  <div key={image.id} className="aspect-video relative overflow-hidden rounded-lg">
                    <Image
                      src={image.imageUrl || "/placeholder.svg"}
                      alt={image.caption || theatre.name}
                      fill
                      className="object-cover"
                    />
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                        <p className="text-sm text-white">{image.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="text-secondary-blue">Theatre Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="mb-2 font-medium">Location</h3>
                <p className="text-sm text-muted-foreground">
                  {theatre.city}, {theatre.country}
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-medium">Founded</h3>
                <p className="text-sm text-muted-foreground">{theatre.foundedYear}</p>
              </div>

              {theatre.website && (
                <div>
                  <h3 className="mb-2 font-medium">Website</h3>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <a href={theatre.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Website
                    </a>
                  </Button>
                </div>
              )}

              <Separator />

              <div>
                <h3 className="mb-2 font-medium">Theatre Tags</h3>
                <div className="flex flex-wrap gap-1">
                  {theatre.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button className="w-full" asChild>
                  <Link href="/program">View Festival Program</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/tickets">Book Tickets</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
