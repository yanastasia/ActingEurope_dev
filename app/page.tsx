"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Newspaper, Calendar, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import CountdownTimer from "@/components/countdown-timer"
import QuickLinkCard from "@/components/quick-link-card"
import PerformanceCard from "@/components/performance-card"
import { useLanguage } from "@/lib/language-context"
import { db } from "@/lib/database-storage"

export default function Home() {
  const { t } = useLanguage()
  const [featuredPerformance, setFeaturedPerformance] = useState<any | null>(null)
  const [featuredPerformances, setFeaturedPerformances] = useState<any[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-advance slider
  useEffect(() => {
    if (featuredPerformances.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredPerformances.length)
      }, 5000) // Change slide every 5 seconds

      return () => clearInterval(interval)
    }
  }, [featuredPerformances.length])

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredPerformances.length)
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredPerformances.length) % featuredPerformances.length)
  }

  // Load featured performances from localStorage
  useEffect(() => {
    const events = db.getEvents()
    // Filter featured performances
    const featured = events.filter((event: any) => event.type === "performance" && event.isFeatured)

    const formattedPerformances = featured.map((event: any) => ({
      id: event.id,
      title: event.title,
      company: event.company || "Acting Europe Festival",
      date: event.date,
      time: event.time,
      venue: event.venue,
      imageUrl: event.imageUrl || "/placeholder.svg?height=1080&width=1920",
      genre: "Drama",
      language: "Various",
      duration: "120 min",
      featured: true,
      price: event.price ? `€${event.price}` : "Free",
    }))

    setFeaturedPerformances(formattedPerformances)

    // Set single featured performance for the existing section (if needed)
    if (formattedPerformances.length > 0) {
      const randomIndex = Math.floor(Math.random() * formattedPerformances.length)
      setFeaturedPerformance(formattedPerformances[randomIndex])
    }

    // Listen for database updates
    const handleDatabaseUpdate = () => {
      const updatedEvents = db.getEvents()
      const updatedFeatured = updatedEvents.filter((event: any) => event.type === "performance" && event.isFeatured)

      const updatedFormattedPerformances = updatedFeatured.map((event: any) => ({
        id: event.id,
        title: event.title,
        company: event.company || "Acting Europe Festival",
        date: event.date,
        time: event.time,
        venue: event.venue,
        imageUrl: event.imageUrl || "/placeholder.svg?height=1080&width=1920",
        genre: "Drama",
        language: "Various",
        duration: "120 min",
        featured: true,
        price: event.price ? `€${event.price}` : "Free",
      }))

      setFeaturedPerformances(updatedFormattedPerformances)

      if (updatedFormattedPerformances.length > 0) {
        const randomIndex = Math.floor(Math.random() * updatedFormattedPerformances.length)
        setFeaturedPerformance(updatedFormattedPerformances[randomIndex])
      } else {
        setFeaturedPerformance(null)
        setFeaturedPerformances([])
      }
    }

    window.addEventListener("databaseUpdated", handleDatabaseUpdate)

    return () => {
      window.removeEventListener("databaseUpdated", handleDatabaseUpdate)
    }
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero Section - Performance Slider */}
      <section className="relative overflow-hidden h-screen">
        <div className="relative h-full">
          {/* Background Images Slider */}
          <div className="absolute inset-0">
            {featuredPerformances.length > 0 ? (
              <div className="relative h-full">
                <Image
                  src={featuredPerformances[currentSlide]?.imageUrl || "/placeholder.svg?height=1080&width=1920"}
                  alt={featuredPerformances[currentSlide]?.title || "Performance"}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            ) : (
              <div className="h-full bg-secondary-blue">
                <div className="spotlight animate-spotlight"></div>
              </div>
            )}
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 flex h-full items-center">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-3xl text-center text-white">
                {featuredPerformances.length > 0 ? (
                  <>
                    <h1 className="mb-4 text-4xl font-bold md:text-6xl">{featuredPerformances[currentSlide]?.title}</h1>
                    <h2 className="mb-8 text-xl font-medium text-primary-gold md:text-2xl">
                      {featuredPerformances[currentSlide]?.company || "Acting Europe Festival"}
                    </h2>
                    <Link
                      href={`/performances/${featuredPerformances[currentSlide]?.id}`}
                      className="inline-block text-lg hover:text-primary-gold transition-colors"
                    >
                      See more
                    </Link>
                  </>
                ) : (
                  <>
                    <h1 className="mb-6 text-4xl font-bold md:text-6xl">
                      {t("heroTitle")}
                      <span className="block text-primary-gold">{t("heroSubtitle")}</span>
                    </h1>
                    <p className="mb-8 text-lg text-white/80 md:text-xl">{t("heroDescription")}</p>
                    <p className="mb-8 text-xl font-semibold text-primary-gold">{t("heroDate")}</p>
                    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
                      <Button size="lg" asChild>
                        <Link href="/program">{t("viewProgram")}</Link>
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="bg-transparent text-white hover:bg-white/10"
                        asChild
                      >
                        <Link href="/tickets">{t("bookTickets")}</Link>
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          {featuredPerformances.length > 1 && (
            <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
              {featuredPerformances.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3 w-3 rounded-full transition-colors ${
                    index === currentSlide ? "bg-primary-gold" : "bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Navigation Arrows */}
          {featuredPerformances.length > 1 && (
            <>
              <button
                onClick={goToPrevSlide}
                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50 transition-colors"
                aria-label="Previous slide"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNextSlide}
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50 transition-colors"
                aria-label="Next slide"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      </section>

      {/* Countdown Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-md">
            <CountdownTimer />
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="bg-muted/30 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-secondary-blue">{t("quickLinks")}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <QuickLinkCard title={t("latestNews")} href="/news" icon={Newspaper} description={t("latestNewsDesc")} />
            <QuickLinkCard title={t("program")} href="/program" icon={Calendar} description={t("programDesc")} />
            <QuickLinkCard title={t("bookTickets")} href="/tickets" icon={Ticket} description={t("bookTicketsDesc")} />
          </div>
        </div>
      </section>

      {/* Featured Performance */}
      {featuredPerformance && (
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-2 text-center text-3xl font-bold text-secondary-blue">{t("featuredPerformance")}</h2>
            <p className="mb-12 text-center text-muted-foreground">{t("featuredPerformanceDesc")}</p>
            <div className="mx-auto max-w-3xl">
              <PerformanceCard {...featuredPerformance} />
            </div>
          </div>
        </section>
      )}

      {/* Gallery Preview */}
      <section className="bg-muted/30 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-secondary-blue">{t("festivalMoments")}</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square relative overflow-hidden rounded-md">
                <Image
                  src={`/placeholder.svg?height=300&width=300&text=Gallery+Image+${i}`}
                  alt={`Gallery image ${i}`}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/gallery">{t("viewFullGallery")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-secondary-blue">{t("ourPartners")}</h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 w-32 grayscale transition-all hover:grayscale-0">
                <Image
                  src={`/placeholder.svg?height=64&width=128&text=Partner+${i}`}
                  alt={`Partner ${i}`}
                  width={128}
                  height={64}
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
