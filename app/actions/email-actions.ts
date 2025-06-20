"use server"

import { sendVerificationEmail } from "@/lib/email-service"

export async function sendVerificationEmailAction(email: string, verificationToken: string) {
  return await sendVerificationEmail(email, verificationToken)
}