import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getTheatres } from "@/lib/database"

export default async function ParticipantsPage() {
  const theatres = await getTheatres()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-secondary-blue">Participating Theatres</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Discover the prestigious theatres from across the Balkans that make Acting Europe a celebration of regional
          theatrical excellence and cultural exchange.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {theatres.map((theatre) => (
          <Card key={theatre.id} className="overflow-hidden transition-all hover:shadow-lg">
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={theatre.images.find((img) => img.isPrimary)?.imageUrl || "/placeholder.svg"}
                alt={theatre.name}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="flex items-center gap-1 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {theatre.city}, {theatre.country}
                  </span>
                </div>
              </div>
            </div>

            <CardHeader className="p-4">
              <CardTitle className="line-clamp-2 text-xl text-secondary-blue">{theatre.name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Founded in {theatre.foundedYear}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-4 pt-0">
              <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">{theatre.description}</p>

              <div className="mb-4 flex flex-wrap gap-1">
                {theatre.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {theatre.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{theatre.tags.length - 3} more
                  </Badge>
                )}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/participants/${theatre.id}`}>Learn More</Link>
                </Button>
                {theatre.website && (
                  <Button variant="ghost" size="sm" asChild>
                    <a href={theatre.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 rounded-lg bg-muted/30 p-8 text-center">
        <h2 className="mb-4 text-2xl font-semibold text-secondary-blue">Cultural Exchange Through Theatre</h2>
        <p className="mx-auto max-w-3xl text-muted-foreground">
          Acting Europe brings together these distinguished theatres to create a unique platform for cultural dialogue
          and artistic collaboration. Each participating theatre contributes its unique perspective, creating a rich
          tapestry of Balkan theatrical traditions and contemporary innovations.
        </p>
      </div>
    </div>
  )
}
