'use client';

import QRCodeGenerator from './QRCodeGenerator';

interface TicketCardProps {
  bookingReference: string;
  attendeeName: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  seat: {
    row: number;
    number: number;
  };
  qrPayload: string;
  className?: string;
}

export default function TicketCard({
  bookingReference,
  attendeeName,
  eventTitle,
  eventDate,
  eventTime,
  venue,
  seat,
  qrPayload,
  className = ''
}: TicketCardProps) {
  const primaryColor = process.env.NEXT_PUBLIC_TICKET_BRAND_PRIMARY || '#021a4a';
  const accentColor = process.env.NEXT_PUBLIC_TICKET_BRAND_ACCENT || '#ffcc00';

  return (
    <div className={`bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg ${className}`}>
      {/* Header */}
      <div 
        className="px-6 py-4 text-white"
        style={{ backgroundColor: primaryColor }}
      >
        <h2 className="text-xl font-bold truncate">{eventTitle}</h2>
        <p className="text-sm opacity-90">{venue}</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ticket Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Attendee
              </label>
              <p className="text-lg font-semibold text-gray-900">{attendeeName}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Date
                </label>
                <p className="text-gray-900 font-medium">{eventDate}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Time
                </label>
                <p className="text-gray-900 font-medium">{eventTime}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Row
                </label>
                <p className="text-gray-900 font-medium">{seat.row}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Seat
                </label>
                <p className="text-gray-900 font-medium">{seat.number}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Booking Reference
              </label>
              <p className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                {bookingReference}
              </p>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center justify-center">
            <label className="block text-sm font-medium text-gray-600 mb-3">
              Entry QR Code
            </label>
            <QRCodeGenerator 
              payload={qrPayload}
              size={180}
              alt={`QR Code for ${attendeeName}`}
              className="border-2 border-gray-200 rounded"
            />
            <p className="text-xs text-gray-500 mt-2 text-center">
              Present this QR code at the venue
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div 
        className="px-6 py-3 text-center text-sm font-medium"
        style={{ backgroundColor: accentColor, color: primaryColor }}
      >
        Please arrive 15 minutes before the show starts
      </div>
    </div>
  );
}