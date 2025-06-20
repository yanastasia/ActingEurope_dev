"use server"

import crypto from "crypto"
import { generateVerificationToken } from "../app/actions/verification-actions"
import { sendVerificationEmail, sendTicketEmail, sendReminderEmail } from "./email-service"

// Store verification tokens (in a real app, these would be in a database)
// Send verification email
export async function sendEmailVerification(email: string): Promise<{ success: boolean; message?: string }> {
  const token = generateVerificationToken(email)
  const result = await sendVerificationEmail(email, token)

  if (!result.success) {
    return { success: false, message: "Failed to send verification email" }
  }

  return { success: true }
}

// Generate and send ticket
export type GenerateTicketResult = { success: boolean; message?: string; bookingReference?: string };

export async function generateAndSendTicket(bookingData: any): Promise<GenerateTicketResult> {
try {
    // Generate a booking reference
    const bookingReference = `AE-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`

    // Prepare ticket data
    const ticketData = {
      ...bookingData,
      bookingReference,
    }

    // Send ticket email
    const result = await sendTicketEmail(bookingData.email, ticketData)

    if (!result.success) {
      return { success: false, message: "Failed to send ticket email" }
    }

    // Schedule reminder (in a real app, this would use a job queue)
    scheduleReminder(bookingData)

    return { success: true, bookingReference }
  } catch (error) {
    console.error("Error generating ticket:", error)
    return { success: false, message: "Failed to generate ticket" }
  }
}

// Schedule a reminder email
function scheduleReminder(eventData: any): void {
  try {
    // Parse event date and time
    const [year, month, day] = eventData.date.split("-").map(Number)
    const [hours, minutes] = eventData.time.split(":").map(Number)

    const eventDateTime = new Date(year, month - 1, day, hours, minutes)
    const reminderTime = new Date(eventDateTime.getTime() - 2 * 60 * 60 * 1000) // 2 hours before

    const now = new Date()
    const timeUntilReminder = reminderTime.getTime() - now.getTime()

    if (timeUntilReminder > 0) {
      // Schedule the reminder
      setTimeout(() => {
        sendReminderEmail(eventData.email, eventData).catch((error) => console.error("Failed to send reminder:", error))
      }, timeUntilReminder)

      console.log(
        `Reminder scheduled for ${reminderTime.toLocaleString()} (${timeUntilReminder / 1000 / 60} minutes from now)`,
      )
    } else {
      console.log("Event is less than 2 hours away, not scheduling reminder")
    }
  } catch (error) {
    console.error("Error scheduling reminder:", error)
  }
}
