"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

// Define Event interface locally
interface Event {
  id: string
  title: string
  company: string
  date: string
  time: string
  venue: string
  price: string
  rawPrice: number
  image: string
  eventType: string
}

export default function TicketsPage() {
  const [allPerformances, setAllPerformances] = useState<Event[]>([])
  const [allWorkshops, setAllWorkshops] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { t, language } = useLanguage()
  const router = useRouter()

  // Helper function to extract single name from bilingual format
  const extractSingleName = (name: string) => {
    if (!name) return name;
    return name.includes(' / ') ? name.split(' / ')[0].trim() : name;
  }

  // Helper function to get translation
  const getTranslation = (text: string, targetLang: string) => {
    if (!text || targetLang === 'en') return text;
    
    // Check if translation exists in our translations object
    const langTranslations = translations[targetLang as keyof typeof translations];
    if (langTranslations && langTranslations[text as keyof typeof langTranslations]) {
      return langTranslations[text as keyof typeof langTranslations];
    }
    
    // Return original text if no translation found
    return text;
  }

  // Helper function to get display text based on current language
  const getDisplayText = (text: string) => {
    const singleName = extractSingleName(text);
    return language === 'bg' ? getTranslation(singleName, 'bg') : singleName;
  }

  // Helper function to fix company names
  const fixCompanyName = (companyName: string) => {
    return companyName
      .replace(/OSAIK "39 Monkeys"/g, 'OSAIK "36 Monkeys"')
      .replace(/ОСАИК "39 Маймуни"/g, 'ОСАИК "36 Маймуни"')
      .replace(/ОСАИК "39 Мајмуни"/g, 'ОСАИК "36 Мајмуни"')
      .replace(/ОСАИК "39 Мајмуна"/g, 'ОСАИК "36 Мајмуна"')
  }

  // Load performances from database (English only)
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/events')
        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }
        const eventsData = await response.json()
        
        const getBGNPrice = (euroPrice: string) => {
          if (!euroPrice || euroPrice === "Free") return "Free"
          const numericPrice = Number.parseFloat(euroPrice.replace("€", ""))
          return `${(numericPrice * 1.96).toFixed(2)} лв.`
        }

        // Filter for English content language only
        const englishEvents = eventsData.filter((event: any) => {
          console.log('Event:', event.title, 'Content Language:', event.contentLanguage);
          return event.contentLanguage === 'English' || 
                 event.contentLanguage === 'english' ||
                 event.contentLanguage === 'EN' ||
                 event.contentLanguage === 'en';
        });
        
        console.log('Filtered English content events:', englishEvents.length, 'out of', eventsData.length, 'total events');

        const mappedEvents = englishEvents.map((event: any) => ({
          id: `event-${event.id}`,
          title: event.title,
          company: event.company,
          date: event.date,
          time: event.time,
          venue: event.venue,
          image: event.imageUrl || "/placeholder.svg?height=200&width=300",
          price: getBGNPrice(event.price),
          rawPrice: event.price === "Free" ? 0 : Number.parseFloat(event.price.replace("€", "")),
          performanceLanguage: event.performanceLanguage,
          eventType: event.eventType || 'performance'
        }))

        // Filter events by type
        const performances = mappedEvents.filter((event: Event) => event.eventType === 'performance')
        const workshops = mappedEvents.filter((event: Event) => event.eventType === 'workshop')

        setAllPerformances(performances)
        setAllWorkshops(workshops)
      } catch (error) {
        console.error('Error fetching events:', error)
        setAllPerformances([])
        setAllWorkshops([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const handlePerformanceSelect = (id: string) => {
    router.push(`/tickets/${id}`)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-center text-4xl font-bold text-secondary-blue">{t("bookTickets")}</h1>

      <Tabs defaultValue="performances" className="mx-auto max-w-4xl">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="performances">{t("performances")}</TabsTrigger>
          <TabsTrigger value="workshops">{t("workshops")}</TabsTrigger>
        </TabsList>

        <TabsContent value="performances">
          <div className="mb-8 rounded-lg bg-muted/30 p-4">
            <>
                <h2 className="mb-4 text-xl font-semibold text-secondary-blue">{t("availablePerformances")}</h2>
                {isLoading ? (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
                    </div>
                    <p className="mt-4 text-muted-foreground">{t("loadingPerformances") || "Loading performances..."}</p>
                  </div>
                ) : allPerformances.length > 0 ? (
                  <div className="space-y-4">
                    {allPerformances.map((performance) => (
                      <Card key={performance.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="relative h-48 md:h-auto md:w-1/3">
                              <Image
                                src={performance.image || "/placeholder.svg"}
                                alt={performance.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex flex-1 flex-col justify-between p-4">
                              <div>
                                <h3 className="mb-1 text-lg font-semibold text-secondary-blue">{t(performance.title)}</h3>
                                <p className="mb-2 text-sm text-muted-foreground">
                                  {Array.isArray(performance.company) ? performance.company.map((comp: string) => fixCompanyName(t(comp) || comp)).join(' & ') : fixCompanyName(t(performance.company) || performance.company)}
                                </p>
                                <div className="mb-4 space-y-1 text-sm">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-primary-gold" />
                                    <span>
                                      {performance.date} {t("at")} {performance.time}
                                    </span>
                                  </div>
                                  <div>
                                    {t(performance.venue)}
                                  </div>
                                </div>
                              </div>
                              <Button onClick={() => handlePerformanceSelect(performance.id)}>{t("bookTicket")}</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <h3 className="mb-2 text-lg font-medium">{t("noPerformancesYet")}</h3>
                    <p className="mb-4 text-muted-foreground">{t("noPerformancesYetDesc")}</p>
                  </div>
                )}
              </>




          </div>
        </TabsContent>

        <TabsContent value="workshops">
          <div className="mb-8 rounded-lg bg-muted/30 p-4">
            <>
                <h2 className="mb-4 text-xl font-semibold text-secondary-blue">{t("availableWorkshops") || "Available Workshops"}</h2>
                {isLoading ? (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
                    </div>
                    <p className="mt-4 text-muted-foreground">{t("loadingWorkshops") || "Loading workshops..."}</p>
                  </div>
                ) : allWorkshops.length > 0 ? (
                  <div className="space-y-4">
                    {allWorkshops.map((workshop) => (
                      <Card key={workshop.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="relative h-48 md:h-auto md:w-1/3">
                              <Image
                                src={workshop.image || "/placeholder.svg"}
                                alt={workshop.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex flex-1 flex-col justify-between p-4">
                              <div>
                                <h3 className="mb-1 text-lg font-semibold text-secondary-blue">{t(workshop.title)}</h3>
                                <p className="mb-2 text-sm text-muted-foreground">
                                  {Array.isArray(workshop.company) ? workshop.company.map((comp: string) => fixCompanyName(t(comp) || comp)).join(' & ') : fixCompanyName(t(workshop.company) || workshop.company)}
                                </p>
                                <div className="mb-4 space-y-1 text-sm">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-primary-gold" />
                                    <span>
                                      {workshop.date} {t("at")} {workshop.time}
                                    </span>
                                  </div>
                                  <div>
                                    {t(workshop.venue)}
                                  </div>
                                </div>
                              </div>
                              <Button onClick={() => handlePerformanceSelect(workshop.id)}>{t("bookTicket")}</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <h3 className="mb-2 text-lg font-medium">{t("noWorkshopsYet") || "No workshops available yet"}</h3>
                    <p className="mb-4 text-muted-foreground">{t("noWorkshopsYetDesc") || "Check back soon for upcoming workshops and masterclasses."}</p>
                  </div>
                )}
              </>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
