import QRCode from 'qrcode';
import { buildQrPayload } from './qr';

export interface QRCodeOptions {
  width?: number;
  margin?: number;
  color?: {
    dark?: string;
    light?: string;
  };
}

/**
 * Generate QR code as data URL for embedding in tickets
 */
export async function generateQRCode(
  bookingRef: string,
  seatId: string,
  eventId: string,
  options: QRCodeOptions = {}
): Promise<string> {
  const payload = buildQrPayload(bookingRef, seatId, eventId);
  
  const qrOptions = {
    width: options.width || 200,
    margin: options.margin || 2,
    color: {
      dark: options.color?.dark || process.env.TICKET_BRAND_PRIMARY || '#021a4a',
      light: options.color?.light || '#FFFFFF'
    }
  };

  try {
    const dataUrl = await QRCode.toDataURL(payload, qrOptions);
    return dataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

/**
 * Generate QR code as SVG string for scalable tickets
 */
export async function generateQRCodeSVG(
  bookingRef: string,
  seatId: string,
  eventId: string,
  options: QRCodeOptions = {}
): Promise<string> {
  const payload = buildQrPayload(bookingRef, seatId, eventId);
  
  const qrOptions = {
    width: options.width || 200,
    margin: options.margin || 2,
    color: {
      dark: options.color?.dark || process.env.TICKET_BRAND_PRIMARY || '#021a4a',
      light: options.color?.light || '#FFFFFF'
    }
  };

  try {
    const svg = await QRCode.toString(payload, { type: 'svg', ...qrOptions });
    return svg;
  } catch (error) {
    console.error('Error generating QR code SVG:', error);
    throw new Error('Failed to generate QR code SVG');
  }
}