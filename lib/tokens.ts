// Store verification tokens (in a real app, these would be in a database)
import crypto from "crypto"

export const verificationTokens: Record<string, { email: string; expires: Date }> = {}

export async function getVerificationToken(token: string): Promise<{ email: string; expires: Date } | undefined> {
  return verificationTokens[token]
}

export async function deleteVerificationToken(token: string): Promise<void> {
  delete verificationTokens[token]
}

export function generateVerificationToken(email: string): string {
  const token = crypto.randomBytes(32).toString("hex")
  const expires = new Date(Date.now() + 3600 * 1000) // 1 hour from now
  verificationTokens[token] = { email, expires }
  return token
}