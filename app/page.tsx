"use client"

import { ReactNode, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Newspaper, Calendar, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import CountdownTimer from "@/components/countdown-timer"
import QuickLinkCard from "@/components/quick-link-card"
import PerformanceCard from "@/components/performance-card"
import { useLanguage } from "@/lib/language-context"
// Removed static import - now using API

// Helper function to fix company names
const fixCompanyName = (name: string): string => {
  return name
    .replace(/OSAIK "39 Monkeys"/g, 'OCAAC "36 Monkeys"')
    .replace(/ОСАИК "39 Маймуни"/g, 'ОСАИК „36 Маймуни"')
    .replace(/ОСАИК "39 Мајмуни"/g, 'ОСАУК „36 Мајмуни"')
    .replace(/ОСАУК "39 мајмуна"/g, 'ОСАУК „36 мајмуна"')
}

interface EventData {
  cast: any
  director: any
  description: any
  id: number;
  title: string;
  eventType: string;
  company: string[];
  date: string;
  time: string;
  venue: string;
  imageUrl?: string;
  genre?: string;
  language?: string;
  duration?: string;
  isFeatured: boolean;
  translationGroup?: string;
  contentLanguage: string;
}

interface FormattedPerformance {
  description: ReactNode
  subtitle: ReactNode
  type: string
  id: string;
  title: string;
  company: string[];
  date: string;
  time: string;
  venue: string;
  imageUrl: string;
  genre?: string;
  language?: string;
  duration?: string;
  featured: boolean;
  translationGroup?: string;
  contentLanguage: string;
}

export default function Home() {
  const { t, language } = useLanguage()
  const [featuredPerformance, setFeaturedPerformance] = useState<FormattedPerformance | null>(null)

  const [allSlides, setAllSlides] = useState<FormattedPerformance[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)




  // Auto-advance slider functionality
  useEffect(() => {
    if (allSlides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % allSlides.length);
    }, 3500); // 3.5 seconds

    return () => clearInterval(interval);
  }, [allSlides.length]);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % allSlides.length)
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + allSlides.length) % allSlides.length)
  }

  // Load performances from database
  useEffect(() => {
    const abortController = new AbortController()
    
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/events?language=${language}`, {
          signal: abortController.signal
        })
        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }
        const events = await response.json()

        // Filter events to only include performances
        const performanceEvents = events.filter((event: EventData) => event.eventType === 'performance')
        
        // Format events for the frontend
        const formattedPerformances = performanceEvents.map((event: EventData) => ({
          id: `performance-${event.id}`,
          title: event.title,
          company: event.company,
          date: event.date,
          time: event.time,
          venue: event.venue,
          imageUrl: event.imageUrl || "/placeholder.svg?height=1080&width=1920",
          genre: event.genre,
          language: event.language,
          duration: event.duration,
          featured: event.isFeatured,
          type: "performance",
          synopsis: event.description,
          director: event.director,
          cast: event.cast ? (Array.isArray(event.cast) ? event.cast : event.cast.split(',').map((c: string) => c.trim())) : []
        }));

        // Create hero slide
        const heroSlide = {
          id: "hero",
          type: "hero",
          title: t("heroTitle"),
          subtitle: t("heroSubtitle"),
          description: t("heroDescription"),
          date: t("heroDate")
        };

        // Combine hero slide with performance slides
        const combinedSlides = [heroSlide, ...formattedPerformances];


        setAllSlides(combinedSlides);

        // Set single featured performance for the existing section (if needed)
        if (formattedPerformances.length > 0) {
          const randomIndex = Math.floor(Math.random() * formattedPerformances.length);
          setFeaturedPerformance(formattedPerformances[randomIndex]);
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          return // Request was aborted, don't log error
        }
        console.error('Error fetching events:', error)
        // Fallback to empty state

        setAllSlides([{
          id: "hero",
          type: "hero",
          title: t("heroTitle"),
          subtitle: t("heroSubtitle"),
          description: t("heroDescription"),
          date: t("heroDate"),
          company: [],
          time: "",
          venue: "",
          imageUrl: "",
          featured: false,
          contentLanguage: ""
        }])
      }
    }

    fetchEvents()
    
    return () => {
      abortController.abort()
    }
  }, [t, language])

  return (
    <div className="flex flex-col">
      {/* Hero and Featured Performances Slider */}
      <section className="relative overflow-hidden h-screen">
        <div className="relative h-full">
          {/* Background Images Slider */}
          <div className="absolute inset-0 overflow-hidden">
            {allSlides.length > 0 ? (
              <div className="relative h-full">
                {allSlides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      index === currentSlide
                        ? "opacity-100 transform translate-x-0"
                        : index < currentSlide
                        ? "opacity-0 transform -translate-x-full"
                        : "opacity-0 transform translate-x-full"
                    }`}
                  >
                    {slide.type === "hero" ? (
                      <div className="h-full bg-secondary-blue">
                        <div className="spotlight animate-spotlight"></div>
                      </div>
                    ) : (
                      <>
                        <Image
                          src={slide.imageUrl || "/placeholder.svg?height=1080&width=1920"}
                          alt={slide.title || "Performance"}
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-black/40" />
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full bg-secondary-blue">
                <div className="spotlight animate-spotlight"></div>
              </div>
            )}
          </div>

          {/* Content Overlay */}
          {allSlides.length > 0 && (
            <div className="relative z-10 flex h-full items-center overflow-hidden">
              <div className="container mx-auto px-4">
                <div className="mx-auto max-w-4xl text-center text-white">
                  <div className="relative h-full">
                    {allSlides.map((slide, index) => (
                      <div
                        key={slide.id}
                        className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${
                          index === currentSlide
                            ? "opacity-100 transform translate-x-0"
                            : index < currentSlide
                            ? "opacity-0 transform -translate-x-full"
                            : "opacity-0 transform translate-x-full"
                        }`}
                      >
                        <div className="w-full">
                          {slide.type === "hero" ? (
                            <div>
                              <div className="mb-8 flex justify-center -mt-16">
                                <Image
                                  src="/Acting Europe Mask.png"
                                  alt="Acting Europe Festival Logo"
                                  width={200}
                                  height={200}
                                  className="object-contain"
                                />
                              </div>
                              <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
                                {slide.title}
                                <span className="block text-primary-gold">{slide.subtitle}</span>
                              </h1>
                              <p className="mb-6 text-lg text-white/90 md:text-xl lg:text-2xl max-w-3xl mx-auto">
                                {slide.description}
                              </p>
                              <div className="mb-6">
                                <p className="text-xl font-semibold text-primary-gold md:text-2xl">{slide.date}</p>
                              </div>
                              <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-6 sm:space-y-0">
                                <Button size="lg" className="bg-primary-gold hover:bg-primary-gold/90 text-white font-semibold px-8 py-3 transform transition-transform hover:scale-105" asChild>
                                  <Link href="/program">{t("viewProgram")}</Link>
                                </Button>
                                <Button
                                  size="lg"
                                  className="bg-secondary-blue border-2 border-white text-white hover:bg-secondary-blue/90 font-semibold px-8 py-3 transform transition-transform hover:scale-105"
                                  asChild
                                >
                                  <Link href="/register-to-book">{t("bookTickets")}</Link>
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <h1 className="mb-4 text-4xl font-bold md:text-6xl">{t(slide.title) || slide.title}</h1>
                              <h2 className="mb-6 text-xl font-medium text-primary-gold md:text-2xl">
                                {slide.company ? (Array.isArray(slide.company) ? slide.company.map((comp: string) => fixCompanyName(t(comp) || comp)).join(' & ') : fixCompanyName(t(slide.company) || slide.company)) : "Acting Europe Festival"}
                              </h2>
                              <div className="mb-8 space-y-2">
                                <p className="text-lg text-white/90">{slide.date} • {slide.time}</p>
                                <p className="text-lg text-white/90">{t(slide.venue) || slide.venue}</p>
                              </div>
                              <Button size="lg" className="bg-primary-gold hover:bg-primary-gold/90 text-white font-semibold transform transition-transform hover:scale-105" asChild>
                                <Link href={`/performances/${slide.id}`}>
                                  {t("learnMore")}
                                </Link>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Dots */}
          {allSlides.length > 1 && (
            <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
              {allSlides.map((_, index) => (
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
          {allSlides.length > 1 && (
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
            <QuickLinkCard title={t("bookTickets")} href="/register-to-book" icon={Ticket} description={t("bookTicketsDesc")} />
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
          <div className="grid grid-cols-5 gap-4 mx-auto max-w-fit">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-96 relative overflow-hidden rounded-md">
                <Image
                  src={`/${['artists_in_waiting.jpg', 'bozhe_moj.jpg', 'don_zhuan.jpg', 'nevedenie.jpg', 'nichija_zemja.jpg'][i-1]}`}
                  alt={`Gallery image ${i}`}
                  width={220}
                  height={310}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 sm:gap-8 md:gap-6 lg:gap-8 items-center justify-items-center">
            {[1, 2, 3, 4, 5, 6].map((i) => {
              const partnerImages = ['bgnmk.png', 'Kyustendil_logo.png', 'ec.png', 'MT_logo.gif', 'bgrs.png', 'SAB_logo_site_2017-500x500.png'];
              const partnerLinks = [
                'https://ipa-bgmk.mrrb.bg/en',
                'https://www.kyustendil.bg/index.php?lang=bg',
                'https://bulgaria.representation.ec.europa.eu/index_bg',
                'https://www.tourism.government.bg/',
                'https://ipa-bgrs.mrrb.bg/en',
                'https://uba.bg/en/home-page/',
              ];
              return (
                <Link key={i} href={partnerLinks[i-1]} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="h-10 w-20 sm:h-12 sm:w-24 md:h-14 md:w-28 lg:h-16 lg:w-32 xl:h-20 xl:w-40 grayscale transition-all hover:grayscale-0 hover:scale-105">
                    <Image
                      src={`/${partnerImages[i-1]}`}
                      alt={`Partner ${i}`}
                      width={180}
                      height={90}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
