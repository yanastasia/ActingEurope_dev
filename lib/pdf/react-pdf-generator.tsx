import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { buildQrPayload } from './qr-utils';

interface TicketContext {
  event: {
    id: string;
    title: string;
    date: string;
    time: string;
    venueName: string;
    address?: string;
  };
  bookingReference: string;
}

interface SeatInfo {
  seatId: string;
  row: string | number;
  number: string | number;
  attendeeName: string;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#021a4a',
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDetails: {
    fontSize: 12,
    marginBottom: 3,
  },
  divider: {
    borderBottomWidth: 2,
    borderBottomColor: '#ffcc00',
    marginVertical: 15,
  },
  ticketSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#021a4a',
    marginBottom: 8,
  },
  ticketInfo: {
    fontSize: 11,
    marginBottom: 3,
  },
  footer: {
    marginTop: 40,
    fontSize: 9,
    color: '#666666',
  },
});

const TicketDocument = ({ ctx, seat }: { ctx: TicketContext; seat: SeatInfo }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Acting Europe — Theatre Without Borders</Text>
        <Text style={styles.eventTitle}>{ctx.event.title || 'N/A'}</Text>
        <Text style={styles.eventDetails}>{ctx.event.date || 'N/A'} at {ctx.event.time || 'N/A'}</Text>
        <Text style={styles.eventDetails}>
          {ctx.event.venueName || 'N/A'}{ctx.event.address ? `, ${ctx.event.address}` : ''}
        </Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.ticketSection}>
        <Text style={styles.sectionTitle}>Ticket</Text>
        <Text style={styles.ticketInfo}>Attendee: {seat.attendeeName}</Text>
        <Text style={styles.ticketInfo}>Seat: Row {seat.row || 'N/A'}, Seat {seat.number || 'N/A'}</Text>
        <Text style={styles.ticketInfo}>Booking Ref: {ctx.bookingReference}</Text>
      </View>
      
      <Text style={styles.footer}>
        Please bring this ticket to the venue. QR code is required for entry. 
        If you have multiple tickets, each attendee should present their own PDF.
      </Text>
    </Page>
  </Document>
);

export async function generateTicketPdfBufferReact(ctx: TicketContext, seat: SeatInfo): Promise<{ buffer: Buffer; qrPayload: string }> {
  const payload = buildQrPayload({
    eventId: ctx.event.id,
    seatId: seat.seatId,
    attendeeEmail: seat.attendeeName + '@example.com', // Placeholder email
    bookingId: ctx.bookingReference
  });
  
  const doc = <TicketDocument ctx={ctx} seat={seat} />;
  const pdfInstance = pdf(doc);
  const buffer = await pdfInstance.toBuffer();
  
  return { buffer, qrPayload: payload };
}