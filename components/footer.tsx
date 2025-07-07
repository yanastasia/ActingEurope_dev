"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-secondary-blue">{t("heroTitle")}</h3>
            <p className="text-sm text-muted-foreground">{t("footerDescription")}</p>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-secondary-blue">{t("quickLinksFooter")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/program" className="text-sm text-muted-foreground hover:text-primary-gold">
                  {t("program")}
                </Link>
              </li>
              <li>
                <Link href="/tickets" className="text-sm text-muted-foreground hover:text-primary-gold">
                  {t("tickets")}
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-sm text-muted-foreground hover:text-primary-gold">
                  {t("news")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary-gold">
                  {t("about")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-secondary-blue">{t("contactFooter")}</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Email: info@actingeurope.eu</li>
              <li className="text-sm text-muted-foreground">Phone: +359 87 696 7588</li>
              <li className="text-sm text-muted-foreground">Address: bul. "Bulgaria" 26А, 2500 Kyustendil, Bulgaria</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-secondary-blue">{t("followUs")}</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary-gold">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary-gold">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary-gold">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary-gold">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">{t("subscribeNewsletter")}</p>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {t("heroTitle")} – {t("heroSubtitle")}. {t("allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  )
}
