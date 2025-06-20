import Image from "next/image"
import Link from "next/link"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface NewsCardProps {
  id: string
  title: string
  date: string
  excerpt: string
  imageUrl: string
  category: string
}

export default function NewsCard({ id, title, date, excerpt, imageUrl, category }: NewsCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        <Badge className="absolute right-2 top-2 bg-primary-gold text-secondary-blue">{category}</Badge>
      </div>
      <CardHeader className="p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <CardTitle className="line-clamp-2 text-xl text-secondary-blue">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{excerpt}</CardDescription>
      </CardHeader>
      <CardFooter className="p-4 pt-0">
        <Link href={`/news/${id}`}>
          <Button variant="outline">Read More</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
