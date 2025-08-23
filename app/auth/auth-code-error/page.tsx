'use client'

import Link from "next/link"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"

export default function AuthCodeErrorPage() {
  const { t } = useLanguage()
  
  return (
    <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-red-600">{t("authenticationError")}</CardTitle>
          <CardDescription>
            {t("authLinkProblem")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              {t("authLinkExpiredOrUsed")}
            </p>
            <p>
              {t("thisCanHappenIf")}
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>{t("linkOlderThan24Hours")}</li>
              <li>{t("alreadyUsedLink")}</li>
              <li>{t("linkCorrupted")}</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <Link href="/auth/signup" className="block">
              <Button className="w-full">
                {t("trySigningUpAgain")}
              </Button>
            </Link>
            <Link href="/auth/login" className="block">
              <Button variant="outline" className="w-full">
                {t("signInInstead")}
              </Button>
            </Link>
          </div>
          
          <div className="text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
              {t("returnToHome")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}