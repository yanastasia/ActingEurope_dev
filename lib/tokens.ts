// Store verification tokens (in a real app, these would be in a database)
export const verificationTokens: Record<string, { email: string; expires: Date }> = {}

export async function getVerificationToken(token: string): Promise<{ email: string; expires: Date } | undefined> {
  return verificationTokens[token]
}

export async function deleteVerificationToken(token: string): Promise<void> {
  delete verificationTokens[token]
}