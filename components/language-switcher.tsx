"use client"

import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/lib/language-context"

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Globe className="h-4 w-4" />
          <span className="sr-only">{t("language")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-muted" : ""}>
          <span className="mr-2">🇬🇧</span> {t("english")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("bg")} className={language === "bg" ? "bg-muted" : ""}>
          <span className="mr-2">🇧🇬</span> {t("bulgarian")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("mk")} className={language === "mk" ? "bg-muted" : ""}>
          <span className="mr-2">🇲🇰</span> {t("macedonian")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("sr")} className={language === "sr" ? "bg-muted" : ""}>
          <span className="mr-2">🇷🇸</span> {t("serbian")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
