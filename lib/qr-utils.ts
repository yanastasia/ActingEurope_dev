export interface QRPayloadData {
  bookingReference: string;
  seatId: string;
  attendeeName: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
}

export function generateQRPayload(data: QRPayloadData): string {
  // Create a structured QR code payload with booking verification data
  const payload = {
    type: 'ACTING_EUROPE_TICKET',
    booking: data.bookingReference,
    seat: data.seatId,
    attendee: data.attendeeName,
    event: data.eventTitle,
    date: data.eventDate,
    time: data.eventTime,
    timestamp: new Date().toISOString()
  };
  
  // Return as JSON string for QR code
  return JSON.stringify(payload);
}

export function verifyQRPayload(qrData: string): QRPayloadData | null {
  try {
    const payload = JSON.parse(qrData);
    
    if (payload.type !== 'ACTING_EUROPE_TICKET') {
      return null;
    }
    
    return {
      bookingReference: payload.booking,
      seatId: payload.seat,
      attendeeName: payload.attendee,
      eventTitle: payload.event,
      eventDate: payload.date,
      eventTime: payload.time
    };
  } catch (error) {
    return null;
  }
}