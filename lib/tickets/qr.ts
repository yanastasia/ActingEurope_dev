import crypto from "crypto";

const SECRET = process.env.TICKET_QR_SECRET || "dev-secret";

export function makeHash(bookingRef: string, seatId: string, eventId: string) {
  const raw = `${bookingRef}|${seatId}|${eventId}|${SECRET}`;
  return crypto.createHash("sha256").update(raw).digest("hex");
}

/**
 * Payload format:
 *   bookingRef-seatId-eventId-hash
 * Keep it short and scanner-friendly.
 */
export function buildQrPayload(bookingRef: string, seatId: string, eventId: string) {
  const h = makeHash(bookingRef, seatId, eventId);
  return `${bookingRef}-${seatId}-${eventId}-${h}`;
}

export function parseQrPayload(payload: string) {
  const parts = payload.split("-");
  if (parts.length < 4) return null;
  const [bookingRef, seatId, eventId, hash] = [
    parts[0],
    parts[1],
    parts[2],
    parts.slice(3).join("-") // robustness if IDs contain dashes
  ];
  return { bookingRef, seatId, eventId, hash };
}

export function verifyQrPayload(payload: string) {
  const parsed = parseQrPayload(payload);
  if (!parsed) return { ok: false as const, reason: "Malformed QR payload" };
  const { bookingRef, seatId, eventId, hash } = parsed;
  const expected = makeHash(bookingRef, seatId, eventId);
  const ok =
    hash.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(expected));
  return ok ? { ok: true as const, ...parsed } : { ok: false as const, reason: "Invalid signature" };
}