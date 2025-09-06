export interface QrPayload {
  eventId: string;
  seatId: string;
  attendeeEmail: string;
  bookingId: string;
}

export function buildQrPayload(data: {
  eventId: string;
  seatId: string;
  attendeeEmail: string;
  bookingId: string;
}): string {
  const payload: QrPayload = {
    eventId: data.eventId,
    seatId: data.seatId,
    attendeeEmail: data.attendeeEmail,
    bookingId: data.bookingId
  };
  
  return JSON.stringify(payload);
}