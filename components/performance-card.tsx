import Link from "next/link"
import { Calendar, Clock, MapPin, User, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

interface PerformanceCardProps {
  id: string
  title: string
  company: string | string[]
  date: string
  time: string
  venue: string
  imageUrl: string
  genre?: string
  language?: string
  duration?: string
  featured?: boolean
  synopsis?: string
  director?: string
  cast?: string[]
  price?: number
  translationGroup?: string
  originalId?: string
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
  featured = false,
  synopsis,
  director,
  cast,
  price,
  translationGroup,
  originalId,
}: PerformanceCardProps) {
  const { t } = useLanguage()

  // Helper function to fix company names
  const fixCompanyName = (companyName: string) => {
    return companyName
      .replace(/OSAIK "39 Monkeys"/g, 'OSAIK "36 Monkeys"')
      .replace(/ОСАИК "39 Маймуни"/g, 'ОСАИК "36 Маймуни"')
      .replace(/ОСАИК "39 Мајмуни"/g, 'ОСАИК "36 Мајмуни"')
      .replace(/ОСАИК "39 Мајмуна"/g, 'ОСАИК "36 Мајмуна"')
  }

  const getBookingUrl = () => {
    // Redirect to registration prompt page instead of direct booking
    return `/register-to-book`
  }

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
        <p className="text-sm font-medium text-muted-foreground">
          {Array.isArray(company) ? company.map((comp: string) => fixCompanyName(t(comp) || comp)).join(' & ') : fixCompanyName(t(company) || company)}
        </p>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="mb-4 flex flex-wrap gap-2">
          {genre && (
            <Badge variant="outline" className="bg-muted/50">
              {genre}
            </Badge>
          )}
          {language && (
            <Badge variant="outline" className="bg-muted/50">
              {language}
            </Badge>
          )}
          {duration && (
            <Badge variant="outline" className="bg-muted/50">
              {duration}
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
            <span>{t(venue) || venue}</span>
          </div>

        </div>
        {synopsis && (
          <div className="mt-3 pt-3 border-t border-muted">
            <p className="text-xs text-muted-foreground line-clamp-2">
              {synopsis}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Link href={`/performances/${id}`}>
          <Button variant="outline">{t('details')}</Button>
        </Link>
        <Link href={getBookingUrl()}>
          <Button className="bg-primary-gold hover:bg-primary-gold/90">{t('bookTicket')}</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
