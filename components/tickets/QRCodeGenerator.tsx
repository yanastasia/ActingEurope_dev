'use client';

import { useEffect, useState } from 'react';
import { generateQRCode } from '@/lib/tickets/qr-generator';
import { parseQrPayload } from '@/lib/tickets/qr';

interface QRCodeGeneratorProps {
  payload: string;
  size?: number;
  className?: string;
  alt?: string;
}

export default function QRCodeGenerator({ 
  payload, 
  size = 200, 
  className = '', 
  alt = 'QR Code' 
}: QRCodeGeneratorProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const generateQR = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Parse the payload to extract individual components
        const parsed = parseQrPayload(payload);
        if (!parsed) {
          throw new Error('Invalid QR payload format');
        }
        
        const { bookingRef, seatId, eventId } = parsed;
        const url = await generateQRCode(bookingRef, seatId, eventId, { width: size, margin: 2 });
        setQrCodeUrl(url);
      } catch (err) {
        console.error('Failed to generate QR code:', err);
        setError('Failed to generate QR code');
      } finally {
        setLoading(false);
      }
    };

    if (payload) {
      generateQR();
    }
  }, [payload, size]);

  if (loading) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="text-sm text-gray-500">Generating...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className={`flex items-center justify-center bg-red-50 border border-red-200 ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="text-sm text-red-600 text-center px-2">{error}</div>
      </div>
    );
  }

  return (
    <img 
      src={qrCodeUrl} 
      alt={alt}
      width={size}
      height={size}
      className={`border ${className}`}
    />
  );
}