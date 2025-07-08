"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer() {
  const { t } = useLanguage()
  // Set festival date to September 18, 2025 at 19:00
  const festivalDate = new Date("2025-09-18T19:00:00")

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = festivalDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    // Set up interval for updates
    const timer = setInterval(calculateTimeLeft, 1000)

    // Initial calculation after setting up interval
    calculateTimeLeft()

    // Clean up interval on component unmount
    return () => clearInterval(timer)
  }, []) // Empty dependency array since festivalDate is created once and doesn't change

  return (
    <Card className="border-primary-gold/20 bg-white shadow-md">
      <CardContent className="p-6">
        <h3 className="mb-4 text-center text-lg font-semibold text-secondary-blue">{t("festivalStartsIn")}</h3>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-primary-gold">{timeLeft.days}</span>
            <span className="text-xs text-muted-foreground">{t("days")}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-primary-gold">{timeLeft.hours}</span>
            <span className="text-xs text-muted-foreground">{t("hours")}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-primary-gold">{timeLeft.minutes}</span>
            <span className="text-xs text-muted-foreground">{t("minutes")}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-primary-gold">{timeLeft.seconds}</span>
            <span className="text-xs text-muted-foreground">{t("seconds")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
