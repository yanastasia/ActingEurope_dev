import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PerformanceCardProps {
  id: string
  title: string
  company: string
  date: string
  time: string
  venue: string
  imageUrl: string
  genre: string
  language: string
  duration: string
  price?: string
  featured?: boolean
}

export default function PerformanceCard({
  id,
  title,
  company,
  date,
  time,
  venue,
  imageUrl,
  genre,
  language,
  duration,
  price,
  featured = false,
}: PerformanceCardProps) {
  // Format price to BGN if available
  const formattedPrice = price
    ? price.startsWith("€")
      ? `${(Number.parseFloat(price.replace("€", "")) * 1.96).toFixed(2)} лв.`
      : price
    : undefined

  return (
    <Card className={`overflow-hidden transition-all hover:shadow-md ${featured ? "border-primary-gold/50" : ""}`}>
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        {featured && <Badge className="absolute right-2 top-2 bg-primary-gold text-secondary-blue">Featured</Badge>}
      </div>
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-1 text-xl text-secondary-blue">{title}</CardTitle>
        <CardDescription>{company}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-muted/50">
            {genre}
          </Badge>
          <Badge variant="outline" className="bg-muted/50">
            {language}
          </Badge>
          <Badge variant="outline" className="bg-muted/50">
            {duration}
          </Badge>
          {formattedPrice && (
            <Badge variant="outline" className="bg-primary-gold/10 text-secondary-blue">
              {formattedPrice}
            </Badge>
          )}
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary-gold" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary-gold" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary-gold" />
            <span>{venue}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Link href={`/performances/${id}`}>
          <Button variant="outline">Details</Button>
        </Link>
        <Link href={`/tickets?performance=${id}`}>
          <Button>Book Ticket</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
