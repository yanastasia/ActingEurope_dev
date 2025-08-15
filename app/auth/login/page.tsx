'use client'

import Link from "next/link"
import { Suspense } from "react"
import { AuthForm } from "@/components/auth/auth-form"
import { useLanguage } from "@/lib/language-context"

export default function LoginPage() {
  const { t } = useLanguage()
  
  return (
    <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-secondary-blue">{t('welcomeBack')}</h1>
        <p className="mt-2 text-muted-foreground">{t('signInToAccount')}</p>
      </div>

      <Suspense fallback={<div>{t('loading')}...</div>}>
        <AuthForm type="login" />
      </Suspense>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          {t('bySigningIn')}{" "}
          <Link href="/terms" className="underline underline-offset-4 hover:text-primary-gold">
            {t('termsOfService')}
          </Link>{" "}
          {t('and')}{" "}
          <Link href="/privacy" className="underline underline-offset-4 hover:text-primary-gold">
            {t('privacyPolicy')}
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
