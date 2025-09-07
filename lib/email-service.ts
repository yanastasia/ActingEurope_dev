"use server"

import nodemailer from "nodemailer"
import { ServerClient } from "postmark"
import { render } from "@react-email/render"
import { format } from "date-fns"
import VerificationEmail from "@/emails/verification-email"
import TicketEmail from "@/emails/ticket-email"
import ReminderEmail from "@/emails/reminder-email"
import WelcomeEmail from "@/emails/welcome-email"
import { generateBrandedTicketPdf } from "./pdf/branded-pdf-generator";
import { generateQRData } from './pdf-generator';
import { sanitize } from "./util/sanitize"
import { prisma } from "./prisma"
import { translations } from "./translations"

// Import translation function for server-side use
function getTranslation(key: string, language: 'en' | 'bg' = 'bg'): string {
  const langTranslations = {
    en: {
      'Main Stage': 'Main Stage',
      'Chamber Stage': 'Chamber Stage',
      'Cinema hall': 'Cinema hall',
      'No Man\'s Land': 'No Man\'s Land',
      'Waiting Artists': 'Waiting Artists',
      'Aivar or Lutenitsa': 'Aivar or Lutenitsa',
      'Don Juan': 'Don Juan',
      'Oh My God': 'Oh My God',
      'Ignorance': 'Ignorance',
    },
    bg: {
      'Main Stage': 'Голяма зала',
      'Chamber Stage': 'Камерна зала',
      'Cinema hall': 'Кино зала',
      'No Man\'s Land': 'Ничия земя',
      'Waiting Artists': 'Чакащи артисти',
      'Aivar or Lutenitsa': 'Айвар или лютеница',
      'Don Juan': 'Дон Жуан',
      'Oh My God': 'Боже мой',
      'Ignorance': 'Неведение',
    }
  };
  return langTranslations[language]?.[key as keyof typeof langTranslations.en] || key;
}

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

// Initialize Postmark clients
const postmarkClient = process.env.POSTMARK_SERVER_TOKEN 
  ? new ServerClient(process.env.POSTMARK_SERVER_TOKEN)
  : null;

// Initialize dedicated Postmark client for ticket delivery
const postmarkTicketClient = process.env.POSTMARK_TICKET_SERVER_TOKEN 
  ? new ServerClient(process.env.POSTMARK_TICKET_SERVER_TOKEN)
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

export async function sendTicketEmail(bookingId: string) {
  const booking = await prisma.booking.findUnique({
    where: { id: parseInt(bookingId) },
    include: {
      user: { select: { email: true } },
      event: { select: { id: true, title: true, event_date: true, event_time: true, venue: true } },
      booked_seats: {
        include: { 
          seat: { 
            select: { 
              id: true, 
              row_number: true, 
              seat_number: true,
              venueSection: {
                select: {
                  section_name: true
                }
              }
            } 
          } 
        }
      }
    }
  });
  if (!booking) throw new Error("Booking not found");

  // Type assertion to help TypeScript understand the included relations
  const bookingWithRelations = booking as typeof booking & {
    user: { email: string };
    event: { id: number; title: string; event_date: Date; event_time: string; venue: any };
    booked_seats: Array<{ seat: { id: number; row_number: number; seat_number: number; venueSection?: { section_name: string } } }>;
  };

  const attendeeBySeat: Record<string, string> = {};
  // Handle attendee_names as either array or JSON string
  let attendeeArray: Array<{ seatId: string; fullName: string }> | string[];
  
  if (typeof booking.attendee_names === 'string') {
    try {
      attendeeArray = JSON.parse(booking.attendee_names);
    } catch (error) {
      console.error('Failed to parse attendee_names as JSON:', error);
      attendeeArray = [];
    }
  } else {
    attendeeArray = booking.attendee_names as any;
  }
  
  // Map attendees to seats
  if (Array.isArray(attendeeArray)) {
    attendeeArray.forEach((attendee, index) => {
      const seatId = bookingWithRelations.booked_seats[index]?.seat.id.toString();
      if (seatId) {
        if (typeof attendee === 'object' && attendee.fullName) {
          attendeeBySeat[seatId] = attendee.fullName;
        } else if (typeof attendee === 'string') {
          attendeeBySeat[seatId] = attendee;
        }
      }
    });
  }

  const eventId = bookingWithRelations.event.id.toString();
  const ctx = {
    bookingReference: booking.booking_reference,
    event: {
      id: eventId,
      title: bookingWithRelations.event.title,
      date: bookingWithRelations.event.event_date.toISOString().split('T')[0], // format as YYYY-MM-DD
      time: bookingWithRelations.event.event_time ? bookingWithRelations.event.event_time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : '19:00',
      venueAddress: bookingWithRelations.event.venue?.address,
      venueName: bookingWithRelations.event.venue?.name ?? "Venue"
    }
  };

  const attachments: { Name: string; Content: string; ContentType: string; ContentID: string | null }[] = [];

  for (const bs of bookingWithRelations.booked_seats) {
    const attendeeName = attendeeBySeat[bs.seat_id.toString()] || bs.attendee_name || "Attendee";
    const seatLabel = `Row ${bs.seat.row_number}, Seat ${bs.seat.seat_number}`;
    const qrPayload = generateQRData({
      bookingReference: booking.booking_reference,
      seat: seatLabel,
      attendee: attendeeName,
      eventId: eventId
    });
    
    const { buffer } = await generateBrandedTicketPdf(
      {
        bookingReference: booking.booking_reference,
        event: {
          title: booking.event.title,
          date: format(new Date(booking.event.event_date), "dd MMM yyyy"),
          time: booking.event.event_time ? (typeof booking.event.event_time === 'string' ? booking.event.event_time : booking.event.event_time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })) : '19:00',
          venueName: booking.event.venue?.name ?? 'Venue',
          venueAddress: booking.event.venue?.address || "bul. \"Bulgaria\" 26А, Kyustendil, Bulgaria",
        },
      },
      {
        id: bs.seat.id.toString(),
        row: bs.seat.row_number,
        number: bs.seat.seat_number.toString(),
        price: 0,
        category: 'Standard',
        attendeeName: attendeeName,
        sectionName: bs.seat.venueSection?.section_name,
      }
    );

    // persist payload + attendee name
    await prisma.bookedSeat.update({
      where: { id: bs.id },
      data: { attendee_name: attendeeName, qr_code_data: qrPayload }
    });

    attachments.push({
      Name: `ticket-${booking.booking_reference}-${sanitize(attendeeName)}.pdf`,
      Content: buffer.toString('base64'),
      ContentType: 'application/pdf',
      ContentID: null
    });
  }

  // Extract single names from potentially combined format (e.g., "No Man's Land / No Man's Land" -> "No Man's Land")
  const extractSingleName = (name: string): string => {
    if (!name) return name;
    // If name contains " / ", take the first part
    return name.includes(' / ') ? name.split(' / ')[0].trim() : name;
  };

  const eventTitleEn = extractSingleName(ctx.event.title);
  const eventTitleBg = getTranslation(eventTitleEn, 'bg');
  const venueNameEn = extractSingleName(ctx.event.venueName);
  const venueNameBg = getTranslation(venueNameEn, 'bg');

  // Create bilingual HTML template with proper language context
  const attendeeSeats = bookingWithRelations.booked_seats.map((bs) => {
    const sectionEn = bs.seat.venueSection?.section_name || '';
    const sectionBg = sectionEn ? (sectionEn.toLowerCase().includes('balcon') || sectionEn.toLowerCase().includes('balkon') ? 'Балкон' : sectionEn) : '';
    
    return {
      attendeeName: attendeeBySeat[bs.seat_id.toString()] || bs.attendee_name || "Attendee",
      seatLabelEn: sectionEn ? `${sectionEn} - Row ${bs.seat.row_number}, Seat ${bs.seat.seat_number}` : `Row ${bs.seat.row_number}, Seat ${bs.seat.seat_number}`,
      seatLabelBg: sectionBg ? `${sectionBg} - Ред ${bs.seat.row_number}, Място ${bs.seat.seat_number}` : `Ред ${bs.seat.row_number}, Място ${bs.seat.seat_number}`
    };
  });
  
  const seatLabelsEn = attendeeSeats.map(seat => seat.seatLabelEn).join("; ");
  const seatLabelsBg = attendeeSeats.map(seat => seat.seatLabelBg).join("; ");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Tickets - ActingEurope | Вашите билети - ActingEurope</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #2c3e50;
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .content {
      background-color: #f8f9fa;
      padding: 30px;
      border-radius: 0 0 8px 8px;
    }
    .event-details {
      background-color: #e9ecef;
      padding: 15px;
      border-radius: 4px;
      margin: 20px 0;
    }
    .detail-row {
      margin-bottom: 8px;
      font-size: 16px;
    }
    .detail-row:last-child {
      margin-bottom: 0;
    }
    .booking-ref {
      font-weight: 700;
    }
    .booking-ref-number {
      color: #021a4a;
      font-weight: 700;
    }
    .tickets-section {
      margin: 20px 0;
    }
    .section-title {
      font-size: 18px;
      font-weight: 700;
      color: #021a4a;
      margin-bottom: 15px;
    }
    .tickets-list {
      background-color: #e9ecef;
      padding: 15px;
      border-radius: 4px;
    }
    .ticket-item {
      background-color: white;
      padding: 10px;
      margin-bottom: 8px;
      border-radius: 4px;
      font-size: 16px;
    }
    .ticket-item:last-child {
      margin-bottom: 0;
    }
    .attendee-name {
      font-weight: 600;
      color: #021a4a;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #ffcc00 0%, #ffd700 100%);
      color: #021a4a;
      padding: 16px 32px;
      text-decoration: none;
      border-radius: 8px;
      margin: 20px 0;
      font-weight: 600;
      font-size: 16px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(255, 204, 0, 0.3);
    }
    .button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(255, 204, 0, 0.4);
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      font-size: 12px;
      color: #666;
    }
  </style>
</head>
<body>
  <!-- English Version -->
  <div class="header">
    <h1>Your Tickets - Acting Europe</h1>
  </div>
  <div class="content">
    <h2>Your tickets for ${eventTitleEn}</h2>
    
    <div class="event-details">
      <div class="detail-row">
        <strong>📅 Date & Time:</strong> ${ctx.event.date} at ${ctx.event.time}
      </div>
      <div class="detail-row">
        <strong>📍 Venue:</strong> ${venueNameEn}${ctx.event.venueAddress ? `, ${ctx.event.venueAddress}` : ''}
      </div>
      <div class="detail-row">
        <strong>🎫 Booking Reference:</strong> <span class="booking-ref-number">${booking.booking_reference}</span>
      </div>
    </div>

    <div class="tickets-section">
      <h3 class="section-title">🎭 Tickets in this order</h3>
      <div class="tickets-list">
        ${attendeeSeats.map(({ attendeeName, seatLabelEn }) => `<div class="ticket-item"><span class="attendee-name">${attendeeName}</span> — ${seatLabelEn}</div>`).join('')}
      </div>
    </div>

    <p><strong>📱 Important:</strong> We attached a separate PDF file for each attendee. Each person should bring their own PDF or show it on a phone at the entrance.</p>
    
    <p><strong>💬 Need help?</strong> Having trouble opening attachments? Reply to this email and we will resend them.</p>
    
    <p>Best regards,<br>The Acting Europe Team</p>
  </div>

  <!-- Bulgarian Version -->
  <div class="header" style="margin-top: 40px;">
    <h1>Вашите билети - Acting Europe</h1>
  </div>
  <div class="content">
    <h2>Вашите билети за ${eventTitleBg}</h2>
    
    <div class="event-details">
      <div class="detail-row">
        <strong>📅 Дата и час:</strong> ${ctx.event.date} в ${ctx.event.time}
      </div>
      <div class="detail-row">
        <strong>📍 Място:</strong> ${venueNameBg}${ctx.event.venueAddress ? `, ${ctx.event.venueAddress}` : ''}
      </div>
      <div class="detail-row">
        <strong>🎫 Референтен номер на резервацията:</strong> <span class="booking-ref-number">${booking.booking_reference}</span>
      </div>
    </div>

    <div class="tickets-section">
      <h3 class="section-title">🎭 Билети в тази поръчка</h3>
      <div class="tickets-list">
        ${attendeeSeats.map(({ attendeeName, seatLabelBg }) => `<div class="ticket-item"><span class="attendee-name">${attendeeName}</span> — ${seatLabelBg}</div>`).join('')}
      </div>
    </div>

    <p><strong>📱 Важно:</strong> Приложихме отделен PDF файл за всеки участник. Всеки човек трябва да донесе своя PDF или да го покаже на телефона на входа.</p>
    
    <p><strong>💬 Нужда от помощ?</strong> Имате проблеми с отварянето на прикачените файлове? Отговорете на този имейл и ще ги изпратим отново.</p>
    
    <p>Всичко хубаво,<br>Екипът на Acting Europe</p>
  </div>

  <div class="footer">
    <p>&copy; 2025 Acting Europe. Всички права запазени.</p>
  </div>
</body>
</html>`;

  const subject = `Your Tickets - ActingEurope | Вашите билети - ActingEurope`;

  if (isDevelopment) {
    console.log("Development mode: Ticket email would be sent with:", {
      to: bookingWithRelations.user.email,
      subject,
      attachments: attachments.map(att => ({ filename: att.Name, contentType: att.ContentType }))
    });
    return { success: true };
  }

  // Try using dedicated ticket delivery server with template first
  if (postmarkTicketClient && process.env.POSTMARK_TICKET_TEMPLATE_ALIAS) {
    try {
      // Template data with correct variable names for Postmark template
      const eventTitleEn = extractSingleName(ctx.event.title);
      const eventTitleBg = getTranslation(eventTitleEn, 'bg');
      const venueNameEn = extractSingleName(ctx.event.venueName);
      const venueNameBg = getTranslation(venueNameEn, 'bg');
      
      const templateData = {
        eventTitle_Value: eventTitleEn,
        eventTitle_Value_bg: eventTitleBg,
        date_Value: ctx.event.date instanceof Date ? ctx.event.date.toLocaleDateString() : String(ctx.event.date),
        time_Value: ctx.event.time,
        venue_Value: venueNameEn,
        venue_Value_bg: venueNameBg,
        bookingReference_Value: booking.booking_reference,
        attendeeName_Value: bookingWithRelations.booked_seats.map((bs) => 
          attendeeBySeat[bs.seat_id.toString()] || bs.attendee_name || "Attendee"
        ).join(", "),
        seatLabel_Value: bookingWithRelations.booked_seats.map((bs) => {
          const section = bs.seat.venueSection?.section_name;
          return section ? `${section} - Row ${bs.seat.row_number}, Seat ${bs.seat.seat_number}` : `Row ${bs.seat.row_number}, Seat ${bs.seat.seat_number}`;
        }).join("; "),
        seatLabel_Value_bg: bookingWithRelations.booked_seats.map((bs) => {
          const section = bs.seat.venueSection?.section_name;
          const sectionBg = section ? (section.toLowerCase().includes('balcon') || section.toLowerCase().includes('balkon') ? 'Балкон' : section) : '';
          return sectionBg ? `${sectionBg} - Ред ${bs.seat.row_number}, Място ${bs.seat.seat_number}` : `Ред ${bs.seat.row_number}, Място ${bs.seat.seat_number}`;
        }).join("; ")
      };

      const result = await postmarkTicketClient.sendEmailWithTemplate({
        TemplateAlias: process.env.POSTMARK_TICKET_TEMPLATE_ALIAS,
        To: bookingWithRelations.user.email,
        From: process.env.POSTMARK_TICKET_FROM_EMAIL || 'tickets@actingeurope.eu',
        TemplateModel: templateData,
        Attachments: attachments,
        MessageStream: 'outbound'
      });
      
      console.log('Postmark ticket template email sent successfully:', result.MessageID);
      return { success: true, messageId: result.MessageID };
    } catch (error: any) {
      console.error('Postmark ticket template failed, falling back to regular email:', error);
    }
  }

  // Fallback to regular Postmark client
  if (!postmarkClient) {
    throw new Error('Postmark client not initialized. Check POSTMARK_SERVER_TOKEN.');
  }

  try {
    const result = await postmarkClient.sendEmail({
      From: process.env.EMAIL_FROM || 'info@actingeurope.eu',
      To: bookingWithRelations.user.email,
      Subject: subject,
      HtmlBody: html,
      Attachments: attachments,
      MessageStream: 'outbound' // Use dedicated message stream for tickets
    });
    
    console.log('Postmark ticket email sent successfully:', result.MessageID);
    return { success: true, messageId: result.MessageID };
  } catch (error: any) {
    console.error("Failed to send ticket email via Postmark:", error);
    return { success: false, error: error.message };
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
