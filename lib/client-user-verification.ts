"use client"

import { db } from "./database-storage"
import { getVerificationToken, deleteVerificationToken } from "./tokens"

import { User } from "./database"

export async function verifyEmail(token: string): Promise<{ success: boolean; email?: string; message?: string; role?: string }> {
  const verification = await getVerificationToken(token)

  if (!verification) {
    return { success: false, message: "Invalid verification token" }
  }

  if (new Date() > verification.expires) {
    await deleteVerificationToken(token)
    return { success: false, message: "Verification token has expired" }
  }

  // Mark user as verified in the database
  const users = db.getUsers()
  const userIndex = users.findIndex((user) => user.email === verification.email)

  if (userIndex === -1) {
    return { success: false, message: "User not found" }
  }

  // Update user verification status
  users[userIndex].emailVerified = true
  db.updateUser(users[userIndex])

  // Remove the used token
  await deleteVerificationToken(token)

  return { success: true, email: verification.email, role: users[userIndex].role }
}