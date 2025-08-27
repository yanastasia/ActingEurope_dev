"use server"

import { ServerClient } from "postmark"
import { generatePDF } from "./pdf-generator"

// Initialize Postmark client
const postmarkClient = new ServerClient(process.env.POSTMARK_SERVER_TOKEN || process.env.EMAIL_SERVER_USER || "")

// For testing/development, we'll log emails instead of sending them
// Set to false to actually send emails, true to only log them
const isDevelopment = process.env.NODE_ENV === 'development' && process.env.SEND_EMAILS !== 'true'

// Helper function to send email with Postmark template
async function sendTemplateEmail(templateData: {
  templateId: string | number
  to: string
  templateModel: Record<string, any>
  attachments?: Array<{
    name: string
    content: string
    contentType: string
  }>
}) {
  const { templateId, to, templateModel, attachments } = templateData

  if (isDevelopment) {
    console.log("Development mode: Postmark template email would be sent with:", {
      templateId,
      to,
      templateModel,
      attachments: attachments?.map(a => ({ name: a.name, contentType: a.contentType })),
    })
    return { success: true }
  }

  try {
    const emailData: any = {
      From: process.env.EMAIL_FROM || "noreply@actingeurope.eu",
      To: to,
      TemplateModel: templateModel,
    }

    // Use TemplateAlias if templateId is a string, otherwise use TemplateId
    if (typeof templateId === 'string') {
      emailData.TemplateAlias = templateId
    } else {
      emailData.TemplateId = templateId
    }

    if (attachments && attachments.length > 0) {
      emailData.Attachments = attachments
    }

    const result = await postmarkClient.sendEmailWithTemplate(emailData)
    console.log("Postmark email sent successfully:", result.MessageID)
    return { success: true, messageId: result.MessageID }
  } catch (error: any) {
    console.error("Failed to send Postmark template email:", error)
    return { success: false, error }
  }
}

// Helper function to send regular email (for contact form)
async function sendRegularEmail(emailData: {
  to: string
  subject: string
  htmlBody: string
  replyTo?: string
}) {
  const { to, subject, htmlBody, replyTo } = emailData

  if (isDevelopment) {
    console.log("Development mode: Postmark regular email would be sent with:", {
      to,
      subject,
      replyTo,
      htmlBody: htmlBody.substring(0, 200) + "...",
    })
    return { success: true }
  }

  try {
    const result = await postmarkClient.sendEmail({
      From: process.env.EMAIL_FROM || "noreply@actingeurope.eu",
      To: to,
      Subject: subject,
      HtmlBody: htmlBody,
      ReplyTo: replyTo,
    })
    console.log("Postmark email sent successfully:", result.MessageID)
    return { success: true, messageId: result.MessageID }
  } catch (error: any) {
    console.error("Failed to send Postmark email:", error)
    return { success: false, error }
  }
}

export async function sendVerificationEmail(email: string, verificationToken: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/verify-email?token=${verificationToken}`

  // Use your Postmark template ID for email verification
  // You'll need to replace this with your actual template ID from Postmark
  const templateId = process.env.POSTMARK_VERIFICATION_TEMPLATE_ID || "your-verification-template-id"

  return await sendTemplateEmail({
    templateId,
    to: email,
    templateModel: {
      email: email,
      confirmationUrl: verificationUrl,
      userName: email, // You can customize this if you have user names
    },
  })
}

// Send ticket email with PDF attachment using Postmark template
export async function sendTicketEmailWithTemplate(ticketData: {
  email: string
  userName: string
  eventTitle: string
  eventDate: string
  eventTime: string
  venue: string
  seats: string
  bookingReference: string
}) {
  // Generate PDF ticket
  const pdfBuffer = await generatePDF(ticketData)
  
  // Convert PDF buffer to base64 for Postmark attachment
  const pdfBase64 = pdfBuffer.toString('base64')
  
  const templateAlias = process.env.POSTMARK_TICKET_TEMPLATE_ALIAS || 'ticket-delivery-acting-europe'
  
  return await sendTemplateEmail({
    templateId: templateAlias,
    to: ticketData.email,
    templateModel: {
      userName: ticketData.userName,
      eventTitle: ticketData.eventTitle,
      eventDate: ticketData.eventDate,
      eventTime: ticketData.eventTime,
      venue: ticketData.venue,
      seats: ticketData.seats,
      bookingReference: ticketData.bookingReference
    },
    attachments: [
      {
        name: `ticket-${ticketData.bookingReference}.pdf`,
        content: pdfBase64,
        contentType: 'application/pdf'
      }
    ]
  })
}

// Note: Verification and ticket emails use Postmark templates
// Other email types (welcome, reminder, contact) use SMTP through email-service.ts

// Export a function to test Postmark configuration
export async function testPostmarkConnection() {
  if (isDevelopment) {
    console.log("Development mode: Postmark connection test skipped")
    return { success: true, message: "Development mode - test skipped" }
  }

  try {
    // Test the connection by getting server info
    const serverInfo = await postmarkClient.getServer()
    console.log("Postmark connection successful:", serverInfo.Name)
    return { success: true, accountName: serverInfo.Name }
  } catch (error: any) {
    console.error("Postmark connection failed:", error)
    return { success: false, error: error.message }
  }
}