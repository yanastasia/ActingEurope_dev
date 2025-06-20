import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface QuickLinkCardProps {
  title: string
  href: string
  icon: LucideIcon
  description: string
}

export default function QuickLinkCard({ title, href, icon: Icon, description }: QuickLinkCardProps) {
  return (
    <Link href={href}>
      <Card className="h-full transition-all hover:border-primary-gold hover:shadow-md">
        <CardContent className="flex flex-col items-center p-6 text-center">
          <Icon className="mb-4 h-10 w-10 text-primary-gold" />
          <h3 className="mb-2 text-lg font-semibold text-secondary-blue">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
