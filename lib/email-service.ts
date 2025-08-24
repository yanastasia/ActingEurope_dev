"use server"

import nodemailer from "nodemailer"
import { render } from "@react-email/render"
import VerificationEmail from "@/emails/verification-email"
import TicketEmail from "@/emails/ticket-email"
import ReminderEmail from "@/emails/reminder-email"
import WelcomeEmail from "@/emails/welcome-email"
import { generatePDF } from "./pdf-generator"

// Configure email transporter
// For production, use your actual SMTP credentials
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number.parseInt(process.env.EMAIL_SERVER_PORT || "587"),
  secure: process.env.EMAIL_SERVER_PORT === "465",
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

// For testing/development, we'll log emails instead of sending them
const isDevelopment = true // For testing, set to false to always send emails. In production, this should be true if you want to skip sending emails in development.

export async function sendVerificationEmail(email: string, verificationToken: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/verify-email?token=${verificationToken}`

  const emailHtml = await render(VerificationEmail({ verificationUrl }))

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Verify your email address",
    html: emailHtml,
  }

  if (isDevelopment) {
    console.log("Development mode: Email would be sent with:", mailOptions)
    return { success: true }
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error("Failed to send verification email:", error)
    return { success: false, error }
  }
}

export async function sendTicketEmail(email: string, ticketData: any) {
  // Generate PDF ticket
  const pdfBuffer = await generatePDF(ticketData)

  const emailHtml = await render(
    TicketEmail({
      name: ticketData.customerName,
      eventTitle: ticketData.title,
      eventDate: ticketData.date,
      eventTime: ticketData.time,
      venue: ticketData.venue,
      seats: ticketData.seats.join(", "),
    }),
  )

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Your tickets for ${ticketData.title}`,
    html: emailHtml,
    attachments: [
      {
        filename: `ticket-${ticketData.bookingReference}.pdf`,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  }

  if (isDevelopment) {
    console.log("Development mode: Ticket email would be sent with:", mailOptions)
    return { success: true }
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error("Failed to send ticket email:", error)
    return { success: false, error }
  }
}

export async function sendReminderEmail(email: string, eventData: any) {
  const emailHtml = await render(
    ReminderEmail({
      name: eventData.customerName,
      eventTitle: eventData.title,
      eventDate: eventData.date,
      eventTime: eventData.time,
      venue: eventData.venue,
      seats: eventData.seats.join(", "),
    }),
  )

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Reminder: ${eventData.title} starts in 2 hours`,
    html: emailHtml,
  }

  if (isDevelopment) {
    console.log("Development mode: Reminder email would be sent with:", mailOptions)
    return { success: true }
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error("Failed to send reminder email:", error)
    return { success: false, error }
  }
}

export async function sendWelcomeEmail(email: string, name?: string) {
  const programUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/program`

  const emailHtml = await render(WelcomeEmail({ name, programUrl }))

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Welcome to Acting Europe - Theatre Without Borders",
    html: emailHtml,
  }

  if (isDevelopment) {
    console.log("Development mode: Welcome email would be sent with:", mailOptions)
    return { success: true }
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error("Failed to send welcome email:", error)
    return { success: false, error }
  }
}
