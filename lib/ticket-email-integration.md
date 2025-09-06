# Ticket Delivery Email Integration Guide

## Overview
This guide explains how to integrate the Postmark ticket delivery email service with your Acting Europe application. The configuration is separate from your email verification server to ensure proper email delivery segregation.

## Server Configuration

### Postmark Ticket Delivery Server
- **Server Token**: `8daa2d22-367c-4745-9179-f37f001fcf72`
- **Template Alias**: `ticket-delivery-acting-europe`
- **From Email**: `tickets@actingeurope.eu`
- **Server Name**: `TicketDelivery`
- **Message Stream**: `outbound`

### SMTP Configuration
- **Access Key**: `PM-T-outbound-gJT2Y_dem60mS_n7cAwAq8`
- **Secret Key**: `veMVOaC_djTxgea2-mpbkPBvHFoTx_f6jBgG`
- **Username/Password**: `8daa2d22-367c-4745-9179-f37f001fcf72`

## Integration Steps

### 1. Environment Variables
Add these to your `.env.local` file:

```env
# Postmark Ticket Delivery Configuration
POSTMARK_TICKET_SERVER_TOKEN=8daa2d22-367c-4745-9179-f37f001fcf72
POSTMARK_TICKET_TEMPLATE_ALIAS=ticket-delivery-acting-europe
POSTMARK_TICKET_FROM_EMAIL=tickets@actingeurope.eu
```

### 2. Email Service Integration
✅ **COMPLETED**: The existing `lib/email-service.ts` has been updated to support the dedicated ticket delivery server.

The `sendTicketEmail()` function now:
- First attempts to use the dedicated Postmark ticket delivery server with your template
- Falls back to the regular Postmark server if the ticket server is unavailable
- Maintains all existing functionality including PDF attachments

No additional changes needed to the email service.

### 3. Integration with Booking Flow
Update your booking confirmation API to send ticket emails:

```typescript
// In your booking API route (e.g., app/api/bookings/confirm/route.ts)
import { sendTicketConfirmationEmail } from '@/lib/email-service';
import { generateTicketPDF } from '@/lib/pdf/pdf-generator';

export async function POST(request: Request) {
  // ... existing booking logic ...
  
  // After successful booking creation
  const ticketData = {
    eventTitle: booking.event.title,
    date: booking.event.date,
    time: booking.event.time,
    venue: booking.event.venue.name,
    bookingReference: booking.reference,
    tickets: booking.tickets.map(ticket => ({
      attendeeName: ticket.attendeeName,
      seatLabel: ticket.seatLabel
    }))
  };
  
  // Generate PDF attachments for each ticket
  const pdfAttachments = await Promise.all(
    booking.tickets.map(async (ticket) => {
      const pdfBuffer = await generateTicketPDF(ticket);
      return {
        name: `ticket-${ticket.attendeeName.replace(/\s+/g, '-').toLowerCase()}.pdf`,
        content: pdfBuffer.toString('base64'),
        contentType: 'application/pdf'
      };
    })
  );
  
  // Send ticket delivery email
  const emailResult = await sendTicketConfirmationEmail(
    booking.customerEmail,
    ticketData,
    pdfAttachments
  );
  
  if (!emailResult.success) {
    console.error('Failed to send ticket email:', emailResult.error);
    // Handle email failure (maybe retry or log for manual processing)
  }
  
  return NextResponse.json({ success: true, booking });
}
```

### 4. Template Variables
The Postmark template expects these variables:

- `eventTitle`: Event name
- `date`: Event date
- `time`: Event time
- `venue`: Venue name
- `bookingReference`: Unique booking reference
- `tickets`: Array of ticket objects with:
  - `attendeeName`: Name of the ticket holder
  - `seatLabel`: Seat information

### 5. Testing
To test the integration:

```typescript
// Create a test function
export async function testTicketEmail() {
  const testData = {
    eventTitle: 'Romeo and Juliet',
    date: '2025-02-15',
    time: '19:30',
    venue: 'National Theatre Sofia',
    bookingReference: 'TEST001',
    tickets: [
      { attendeeName: 'Test User', seatLabel: 'Row A, Seat 1' }
    ]
  };
  
  const result = await sendTicketDeliveryEmail(
    'test@example.com',
    testData,
    [] // No attachments for testing
  );
  
  console.log('Test email result:', result);
}
```

## Important Notes

1. **Separate from Verification Emails**: This configuration is specifically for ticket delivery and should not be mixed with your email verification server.

2. **PDF Attachments**: The system supports PDF attachments for individual tickets. Ensure your PDF generation is working before enabling email delivery.

3. **Error Handling**: Always implement proper error handling for email delivery failures.

4. **Rate Limits**: Be aware of Postmark's sending limits and implement appropriate queuing if needed.

5. **Template Updates**: If you need to update the email template, use the Postmark dashboard with the template alias `ticket-delivery-acting-europe`.

## Monitoring

Monitor email delivery through:
- Postmark dashboard
- Application logs
- Customer support feedback

For any issues, check the Postmark activity log using the server token provided.