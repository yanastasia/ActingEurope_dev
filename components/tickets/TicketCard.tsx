'use client';

import QRCodeGenerator from './QRCodeGenerator';
import { useLanguage } from '@/lib/language-context';
import { translations } from '@/lib/translations';

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
    id?: number;
  };
  qrPayload: string;
  className?: string;
  onQRClick?: () => void;
  sectionName?: string;
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
  className = '',
  onQRClick,
  sectionName
}: TicketCardProps) {
  const { t, language } = useLanguage();
  const primaryColor = process.env.NEXT_PUBLIC_TICKET_BRAND_PRIMARY || '#021a4a';
  const accentColor = process.env.NEXT_PUBLIC_TICKET_BRAND_ACCENT || '#ffcc00';

  // Helper functions for language context
  const extractSingleName = (name: string): string => {
    if (!name) return '';
    const parts = name.split(' / ');
    return parts[0] || name;
  };

  const getTranslation = (key: string, lang: string): string => {
    const translationObj = translations as Record<string, Record<string, string>>;
    return translationObj[key]?.[lang] || key;
  };

  const getDisplayText = (text: string): string => {
    if (!text) return '';
    
    // Check if it's a bilingual format (e.g., "English / Bulgarian")
    if (text.includes(' / ')) {
      const parts = text.split(' / ');
      if (parts.length === 2) {
        return language === 'en' ? parts[0] : parts[1];
      }
    }
    
    // Check if it's a translation key
    const translated = getTranslation(text, language);
    if (translated !== text) {
      return translated;
    }
    
    // Return original text
    return text;
  };

  const getSeatType = () => {
    return {
      type: 'regular',
      label: language === 'en' ? 'Regular' : 'Обикновен',
      color: 'bg-blue-100 text-blue-800'
    };
  };

  return (
    <div className={`bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg w-[350px] mx-auto ${className}`}>
      {/* Header */}
      <div 
        className="px-6 py-4 text-white"
        style={{ backgroundColor: primaryColor }}
      >
        <h2 className="text-xl font-bold truncate">{getDisplayText(eventTitle)}</h2>
        <p className="text-sm opacity-90">{getDisplayText(venue)}</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ticket Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {t('attendee')}
              </label>
              <p className="text-lg font-semibold text-gray-900">{attendeeName}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {t('eventDate')}
                </label>
                <p className="text-gray-900 font-medium break-words">{eventDate}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {t('eventTime')}
                </label>
                <p className="text-gray-900 font-medium break-words">{eventTime}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {t('row')}
                </label>
                <p className="text-gray-900 font-medium">{seat.row}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {t('seatNumber')}
                </label>
                <p className="text-gray-900 font-medium">{seat.number}</p>
              </div>
            </div>

            {sectionName && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {language === 'en' ? 'Section' : 'Секция'}
                </label>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeatType().color}`}>
                  {getSeatType().label}
                </span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {t('bookingReference')}
              </label>
              <p className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                {bookingReference}
              </p>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center justify-center">
            <label className="block text-sm font-medium text-gray-600 mb-3">
              {t('entryQRCode')}
            </label>
            <div 
              className={`${onQRClick ? 'cursor-pointer hover:shadow-md transition-shadow duration-200' : ''}`}
              onClick={onQRClick}
            >
              <QRCodeGenerator 
                payload={qrPayload}
                size={180}
                alt={`QR Code for ${attendeeName}`}
                className="border-2 border-gray-200 rounded"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {t('presentQRCodeMessage')}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div 
        className="px-6 py-3 text-center text-sm font-medium"
        style={{ backgroundColor: accentColor, color: primaryColor }}
      >
        {t('arrivalMessage')}
      </div>

      {/* PDF Download Section */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <button
          onClick={() => {
            const downloadUrl = `/api/tickets/download?bookingReference=${encodeURIComponent(bookingReference)}&seatId=${encodeURIComponent(seat.id?.toString() || '')}&attendeeName=${encodeURIComponent(attendeeName)}`;
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `ticket-${bookingReference}-${attendeeName.replace(/\s+/g, '-').toLowerCase()}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {language === 'en' ? 'Download PDF Ticket' : 'Изтегли PDF билет'}
        </button>
      </div>
    </div>
  );
}