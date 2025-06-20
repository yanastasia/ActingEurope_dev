"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, User, LogOut, Shield } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { isAuthenticated, isAdmin, clearAuthentication } from "@/lib/auth"
import LanguageSwitcher from "@/components/language-switcher"
import { useLanguage } from "@/lib/language-context"

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userIsAdmin, setUserIsAdmin] = useState(false)

  // Define routes with translation keys
  const routes = [
    { href: "/", labelKey: "home" },
    { href: "/program", labelKey: "program" },
    { href: "/participants", labelKey: "participants" },
    { href: "/news", labelKey: "news" },
    { href: "/about", labelKey: "about" },
    { href: "/contact", labelKey: "contact" },
  ]

  // Check if user is logged in when component mounts
  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(isAuthenticated())
      setUserIsAdmin(isAdmin())
    }

    checkLoginStatus()

    // Set up event listeners for login/logout events
    const handleLogin = () => {
      checkLoginStatus()
    }

    const handleLogout = () => {
      setIsLoggedIn(false)
      setUserIsAdmin(false)
    }

    window.addEventListener("user-logged-in", handleLogin)
    window.addEventListener("user-logged-out", handleLogout)

    return () => {
      window.removeEventListener("user-logged-in", handleLogin)
      window.removeEventListener("user-logged-out", handleLogout)
    }
  }, [pathname])

  const handleLogout = () => {
    clearAuthentication()
    toast({
      title: t("loggedOutSuccessfully"),
      description: t("loggedOutSuccessfullyDesc"),
    })
    router.push("/")
  }

  const navigateToProfile = (tab?: string) => {
    const url = tab ? `/profile?tab=${tab}` : "/profile"
    router.push(url)
    // Close dropdown after navigation
    const dropdownTrigger = document.querySelector('[data-dropdown-trigger="user-menu"]')
    if (dropdownTrigger) {
      ;(dropdownTrigger as HTMLElement).click()
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="/logo.png" alt="Acting Europe Logo" width={180} height={40} className="h-10 w-auto" priority />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "transition-colors hover:text-primary-gold",
                  pathname === route.href ? "text-primary-gold" : "text-foreground",
                )}
              >
                {t(route.labelKey)}
              </Link>
            ))}
          </nav>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
              <Image src="/logo.png" alt="Acting Europe Logo" width={160} height={36} className="h-9 w-auto" />
            </Link>
            <nav className="mt-8 flex flex-col space-y-3">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-2 py-1 text-lg font-medium transition-colors hover:text-primary-gold",
                    pathname === route.href ? "text-primary-gold" : "text-foreground",
                  )}
                >
                  {t(route.labelKey)}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link href="/" className="mr-6 flex items-center space-x-2 md:hidden">
              <Image src="/logo.png" alt="Acting Europe Logo" width={140} height={32} className="h-8 w-auto" />
            </Link>
          </div>
          <nav className="flex items-center gap-2">
            <LanguageSwitcher />

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild data-dropdown-trigger="user-menu">
                  <Button variant="ghost" size="icon" className="ml-2">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => navigateToProfile()}>{t("myProfile")}</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => navigateToProfile("tickets")}>{t("myTickets")}</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => navigateToProfile("favorites")}>{t("favorites")}</DropdownMenuItem>

                  {userIsAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onSelect={() => router.push("/admin")} className="text-primary-gold">
                        <Shield className="mr-2 h-4 w-4" />
                        <span>{t("adminPanel")}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => router.push("/admin/users")} className="text-primary-gold">
                        <User className="mr-2 h-4 w-4" />
                        <span>User Management</span>
                      </DropdownMenuItem>
                    </>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t("logout")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm" className="gap-1">
                    {t("signIn")}
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="gap-1">
                    {t("signUp")}
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
