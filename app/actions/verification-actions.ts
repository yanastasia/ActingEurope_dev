"use server"

import crypto from "crypto"

// Store verification tokens (in a real app, these would be in a database)
const verificationTokens: Record<string, { email: string; expires: Date }> = {}

// Generate a verification token
export function generateVerificationToken(email: string): string {
  const token = crypto.randomBytes(32).toString("hex")
  const expires = new Date()
  expires.setHours(expires.getHours() + 24) // Token expires in 24 hours

  verificationTokens[token] = { email, expires }
  return token
}

export async function getVerificationToken(token: string): Promise<{ email: string; expires: Date } | undefined> {
  return verificationTokens[token]
}

export async function deleteVerificationToken(token: string): Promise<void> {
  delete verificationTokens[token]
}