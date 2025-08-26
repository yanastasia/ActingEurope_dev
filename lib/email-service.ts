"use server"

import nodemailer from "nodemailer"
import { ServerClient } from "postmark"
import { render } from "@react-email/render"
import VerificationEmail from "@/emails/verification-email"
import TicketEmail from "@/emails/ticket-email"
import ReminderEmail from "@/emails/reminder-email"
import WelcomeEmail from "@/emails/welcome-email"
import { generatePDF } from "./pdf-generator"

// Configure email transporter with rate limiting and retry logic
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number.parseInt(process.env.EMAIL_SERVER_PORT || "587"),
  secure: process.env.EMAIL_SERVER_PORT === "465",
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  // Rate limiting configuration
  pool: true,
  maxConnections: 1,
  maxMessages: 3,
  rateDelta: 1000, // 1 second between emails
  rateLimit: 1, // 1 email per rateDelta
})

// Helper function to send email with retry logic
async function sendEmailWithRetry(mailOptions: any, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await transporter.sendMail(mailOptions)
      return { success: true }
    } catch (error: any) {
      console.error(`Email send attempt ${attempt} failed:`, error.message)
      
      // Check if it's a rate limit error
      if (error.message?.includes('rate') || error.message?.includes('limit') || error.code === 'EENVELOPE') {
        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 1000 // Exponential backoff
          console.log(`Rate limit hit, waiting ${delay}ms before retry...`)
          await new Promise(resolve => setTimeout(resolve, delay))
          continue
        }
      }
      
      // If not a rate limit error or max retries reached, throw the error
      if (attempt === maxRetries) {
        return { success: false, error }
      }
    }
  }
  return { success: false, error: new Error('Max retries exceeded') }
}

// Initialize Postmark client
const postmarkClient = process.env.POSTMARK_SERVER_TOKEN 
  ? new ServerClient(process.env.POSTMARK_SERVER_TOKEN)
  : null;

// For testing/development, we'll log emails instead of sending them
// Set to false to actually send emails, true to only log them
const isDevelopment = process.env.NODE_ENV === 'development' && process.env.SEND_EMAILS !== 'true'

// Helper function to send email via Postmark template
async function sendPostmarkTemplate(templateAlias: string, to: string, templateModel: any, subject?: string) {
  if (!postmarkClient) {
    throw new Error('Postmark client not initialized. Check POSTMARK_SERVER_TOKEN.');
  }

  try {
    const result = await postmarkClient.sendEmailWithTemplate({
      TemplateAlias: templateAlias,
      To: to,
      From: process.env.EMAIL_FROM || 'info@actingeurope.eu',
      TemplateModel: templateModel,
      ...(subject && { Subject: subject })
    });
    
    console.log('Postmark email sent successfully:', result.MessageID);
    return { success: true, messageId: result.MessageID };
  } catch (error: any) {
    console.error('Postmark email failed:', error.message);
    throw error;
  }
}

export async function sendVerificationEmail(email: string, verificationToken: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/verify-email?token=${verificationToken}`

  if (isDevelopment) {
    console.log("Development mode: Verification email would be sent to:", email, "with URL:", verificationUrl)
    return { success: true }
  }

  // Try Postmark template first
  if (postmarkClient && process.env.POSTMARK_VERIFICATION_TEMPLATE_ALIAS) {
    try {
      return await sendPostmarkTemplate(
        process.env.POSTMARK_VERIFICATION_TEMPLATE_ALIAS,
        email,
        {
          email: email,
          confirmationUrl: verificationUrl,
          userName: email.split('@')[0] // Use email prefix as fallback name
        }
      );
    } catch (error) {
      console.error('Postmark template failed, falling back to SMTP:', error);
    }
  }

  // Fallback to SMTP
  const emailHtml = await render(VerificationEmail({ verificationUrl }))
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Verify your email address",
    html: emailHtml,
  }

  try {
    return await sendEmailWithRetry(mailOptions)
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

  if (isDevelopment) {
    console.log("Development mode: Welcome email would be sent to:", email, "with name:", name)
    return { success: true }
  }

  // Use SMTP for welcome emails
  const emailHtml = await render(WelcomeEmail({ name, programUrl }))
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Welcome to Acting Europe - Theatre Without Borders",
    html: emailHtml,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error("Failed to send welcome email:", error)
    return { success: false, error }
  }
}

export async function sendContactEmail(contactData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const { name, email, subject, message } = contactData;
  
  // Create HTML email content
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">New Contact Form Message</h2>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #007bff; margin-top: 0;">Contact Information</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
      </div>
      
      <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
        <h3 style="color: #333; margin-top: 0;">Message</h3>
        <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
      </div>
      
      <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 8px; font-size: 12px; color: #6c757d;">
        <p>This message was sent through the Acting Europe contact form.</p>
        <p>Reply directly to this email to respond to the sender.</p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: 'info@actingeurope.eu',
    replyTo: email, // Allow direct reply to the sender
    subject: `Contact Form: ${subject}`,
    html: emailHtml,
  };

  if (isDevelopment) {
    console.log("Development mode: Contact email would be sent with:", mailOptions);
    return { success: true };
  }

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return { success: false, error };
  }
}
