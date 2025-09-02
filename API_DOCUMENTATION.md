# ActingEurope API Documentation

## Overview

This document provides comprehensive API documentation for the ActingEurope booking system, including the new QR code verification endpoints and multi-ticket booking enhancements.

## Base URL

```
Production: https://your-app-name.onrender.com/api
Development: http://localhost:3001/api
```

## Authentication

### User Authentication

Most endpoints require authentication via JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Scanner Authentication

Scanner functionality is now integrated into the regular authentication system. Users with the `tickets@actingeurope.eu` email can access scanner features through the standard login process.

#### Scanner Access

1. **Regular Login**: Use the standard `/auth/login` page with `tickets@actingeurope.eu` credentials
2. **Automatic Redirection**: Scanner users are automatically redirected to `/scanner` after login
3. **Profile Access**: Scanner users can access the scanner interface from their profile page
4. **Role-Based Access**: Scanner functionality is available only to users with the "scanner" role

#### Authentication Flow

1. Navigate to `/auth/login`
2. Enter `tickets@actingeurope.eu` and password
3. System detects scanner user and assigns "scanner" role
4. User is redirected to `/scanner` interface
5. Scanner interface is accessible from user profile

#### Legacy Scanner Endpoints

**Note**: The following endpoints are deprecated but maintained for backward compatibility:
- `/api/auth/scanner-login` (deprecated - use regular login)
- `/api/auth/validate-scanner` (deprecated - use regular auth validation)
- `/scanner/login` (deprecated - use `/auth/login`)

## Booking Endpoints

### Create Booking

**POST** `/api/bookings`

Create a new booking with multiple tickets and attendees.

#### Request Body

```json
{
  "performanceId": 1,
  "seatIds": [1, 2, 3],
  "attendees": [
    {
      "name": "John Doe",
      "email": "john@example.com"
    },
    {
      "name": "Jane Doe",
      "email": "john@example.com"
    },
    {
      "name": "Bob Smith",
      "email": "bob@example.com"
    }
  ]
}
```

#### Response

```json
{
  "success": true,
  "booking": {
    "id": "booking-123",
    "reference": "AE-2024-001",
    "performanceId": 1,
    "totalSeats": 3,
    "createdAt": "2024-01-15T10:30:00Z",
    "attendees": [
      {
        "id": "attendee-456",
        "name": "John Doe",
        "email": "john@example.com",
        "seatId": 1,
        "qrCode": "booking-123-seat-1-attendee-456"
      },
      {
        "id": "attendee-457",
        "name": "Jane Doe",
        "email": "john@example.com",
        "seatId": 2,
        "qrCode": "booking-123-seat-2-attendee-457"
      },
      {
        "id": "attendee-458",
        "name": "Bob Smith",
        "email": "bob@example.com",
        "seatId": 3,
        "qrCode": "booking-123-seat-3-attendee-458"
      }
    ]
  },
  "emailsSent": [
    {
      "email": "john@example.com",
      "ticketCount": 2,
      "status": "sent"
    },
    {
      "email": "bob@example.com",
      "ticketCount": 1,
      "status": "sent"
    }
  ]
}
```

#### Error Responses

```json
{
  "success": false,
  "error": "Seats already booked",
  "code": "SEATS_UNAVAILABLE"
}
```

### Get Booking Details

**GET** `/api/bookings/{bookingId}`

Retrieve details of a specific booking.

#### Response

```json
{
  "success": true,
  "booking": {
    "id": "booking-123",
    "reference": "AE-2024-001",
    "performance": {
      "id": 1,
      "title": "Hamlet",
      "date": "2024-02-15T19:30:00Z",
      "venue": {
        "name": "National Theatre",
        "address": "123 Theatre St, Sofia"
      }
    },
    "attendees": [
      {
        "name": "John Doe",
        "email": "john@example.com",
        "seat": {
          "id": 1,
          "row": "A",
          "number": 1,
          "section": "Orchestra"
        }
      }
    ]
  }
}
```

## Ticket Verification Endpoints

**Note:** Ticket verification endpoints are accessible through the integrated scanner interface at `/scanner`. Scanner users (tickets@actingeurope.eu) can access these features after logging in through the regular authentication system.

### QR Code Verification

**POST** `/api/verify-qr`

Verify a QR code payload for ticket validation. This endpoint is used by the scanner interface.

#### Authentication

Requires regular user authentication with scanner role (tickets@actingeurope.eu).

#### Request Body

```json
{
  "payload": "booking-ref:AE-2024-001|seat-id:123|event-id:456"
}
```

#### Response (Valid Ticket)

```json
{
  "ok": true,
  "bookingReference": "AE-2024-001",
  "attendeeName": "John Doe",
  "seat": {
    "row": 5,
    "number": 12
  },
  "event": {
    "title": "Hamlet",
    "date": "2024-02-15T00:00:00.000Z",
    "time": "19:30",
    "venue": "National Theatre"
  },
  "scanned_at": null,
  "first_scan": true
}
```

#### Response (Invalid Ticket)

```json
{
  "ok": false,
  "reason": "Ticket not found"
}
```

#### Response (Authentication Required)

```json
{
  "ok": false,
  "reason": "Authentication required",
  "error": "Please log in with scanner credentials"
}
```

### Legacy Ticket Endpoints

**Note:** The following endpoints are deprecated but maintained for backward compatibility:

**POST** `/api/tickets/check-in` (deprecated)
**POST** `/api/tickets/verify` (deprecated)

Use `/api/verify-qr` instead for all QR code verification needs.

#### Request Body

```json
{
  "payload": "booking-ref:AE-2024-001|seat-id:123|event-id:456"
}
```

#### Response (Successful Check-in)

```json
{
  "ok": true,
  "bookingReference": "AE-2024-001",
  "attendeeName": "John Doe",
  "seat": {
    "row": 5,
    "number": 12
  },
  "event": {
    "title": "Hamlet",
    "date": "2024-02-15T00:00:00.000Z",
    "time": "19:30",
    "venue": "National Theatre"
  },
  "scanned_at": "2024-02-15T18:45:00.000Z",
  "first_scan": true
}
```

#### Response (Already Checked In)

```json
{
  "ok": true,
  "bookingReference": "AE-2024-001",
  "attendeeName": "John Doe",
  "seat": {
    "row": 5,
    "number": 12
  },
  "event": {
    "title": "Hamlet",
    "date": "2024-02-15T00:00:00.000Z",
    "time": "19:30",
    "venue": "National Theatre"
  },
  "scanned_at": "2024-02-15T18:30:00.000Z",
  "first_scan": false
}
```

## Scanner Interface

The ActingEurope system provides dedicated scanner interfaces for ticket verification:

### Web Scanner Interface

- **Scanner Login**: `/scanner/login` - Authentication page for scanner devices
- **Scanner Dashboard**: `/scanner` - Main scanning interface with check-in and verify-only modes
- **Admin Scanner**: `/admin/tickets/scan` - Admin-only scanning interface
- **Staff Scanner**: `/staff/scan` - Staff scanning interface

### Scanner Features

- **Multi-device Support**: Multiple devices can be logged into the scanner account simultaneously
- **Real-time Statistics**: Track total scans, valid check-ins, duplicates, and invalid tickets
- **Scan History**: View recent scanning activity with timestamps
- **Verify-only Mode**: Check ticket validity without marking as checked in
- **Check-in Mode**: Verify and mark tickets as scanned
- **Auto-focus Input**: Optimized for barcode scanner input devices

### QR Code Format

Tickets use a structured payload format:

```
booking-ref:AE-2024-001|seat-id:123|event-id:456
```

- `booking-ref`: The booking reference number
- `seat-id`: The specific seat ID from the database
- `event-id`: The event ID for validation
    },
    {
      "qrData": "booking-123-seat-2-attendee-457",
      "signature": "signature2"
    }
  ]
}
```

#### Response

```json
{
  "success": true,
  "results": [
    {
      "qrData": "booking-123-seat-1-attendee-456",
      "valid": true,
      "attendeeName": "John Doe",
      "seat": "A1"
    },
    {
      "qrData": "booking-123-seat-2-attendee-457",
      "valid": false,
      "reason": "Already verified"
    }
  ]
}
```

## Venue and Performance Endpoints

### Get Venue Details

**GET** `/api/venues/{venueId}`

Retrieve venue information including seating layout.

#### Response

```json
{
  "success": true,
  "venue": {
    "id": 1,
    "name": "National Theatre",
    "address": "123 Theatre St, Sofia",
    "sections": [
      {
        "id": 1,
        "name": "Orchestra",
        "seats": [
          {
            "id": 1,
            "row": "A",
            "number": 1,
            "available": true
          }
        ]
      }
    ]
  }
}
```

### Get Performance Availability

**GET** `/api/performances/{performanceId}/availability`

Get seat availability for a specific performance.

#### Response

```json
{
  "success": true,
  "performance": {
    "id": 1,
    "title": "Hamlet",
    "date": "2024-02-15T19:30:00Z"
  },
  "availability": {
    "totalSeats": 100,
    "availableSeats": 85,
    "bookedSeats": 15,
    "sections": [
      {
        "sectionId": 1,
        "name": "Orchestra",
        "availableSeats": 45,
        "totalSeats": 50
      }
    ]
  }
}
```

## Error Handling

### Standard Error Response

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {
    "field": "Additional error details"
  }
}
```

### Common Error Codes

- `VALIDATION_ERROR`: Request validation failed
- `SEATS_UNAVAILABLE`: Requested seats are not available
- `PERFORMANCE_NOT_FOUND`: Performance does not exist
- `BOOKING_NOT_FOUND`: Booking does not exist
- `INVALID_QR_CODE`: QR code is invalid or tampered
- `QR_ALREADY_USED`: QR code has already been verified
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Insufficient permissions
- `RATE_LIMIT_EXCEEDED`: Too many requests

## Rate Limiting

API endpoints are rate-limited to prevent abuse:

- **Booking endpoints**: 10 requests per minute per IP
- **QR verification**: 100 requests per minute per IP
- **General endpoints**: 60 requests per minute per IP

## Webhooks

### Booking Confirmation Webhook

When a booking is successfully created, a webhook is sent to configured endpoints.

#### Webhook Payload

```json
{
  "event": "booking.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "bookingId": "booking-123",
    "reference": "AE-2024-001",
    "performanceId": 1,
    "attendeeCount": 3,
    "totalAmount": 150.00
  }
}
```

### QR Verification Webhook

#### Webhook Payload

```json
{
  "event": "qr.verified",
  "timestamp": "2024-02-15T18:45:00Z",
  "data": {
    "bookingId": "booking-123",
    "attendeeName": "John Doe",
    "seat": "A1",
    "verificationTime": "2024-02-15T18:45:00Z"
  }
}
```

## SDK Examples

### JavaScript/Node.js

```javascript
const axios = require('axios');

class ActingEuropeAPI {
  constructor(baseURL, apiKey) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async createBooking(performanceId, seatIds, attendees) {
    const response = await this.client.post('/bookings', {
      performanceId,
      seatIds,
      attendees
    });
    return response.data;
  }

  async verifyQR(qrData, signature) {
    const response = await this.client.post('/verify-qr', {
      qrData,
      signature
    });
    return response.data;
  }
}

// Usage
const api = new ActingEuropeAPI('http://localhost:3001/api', 'your-api-key');

const booking = await api.createBooking(1, [1, 2], [
  { name: 'John Doe', email: 'john@example.com' },
  { name: 'Jane Doe', email: 'jane@example.com' }
]);
```

### Python

```python
import requests

class ActingEuropeAPI:
    def __init__(self, base_url, api_key):
        self.base_url = base_url
        self.headers = {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        }
    
    def create_booking(self, performance_id, seat_ids, attendees):
        response = requests.post(
            f'{self.base_url}/bookings',
            json={
                'performanceId': performance_id,
                'seatIds': seat_ids,
                'attendees': attendees
            },
            headers=self.headers
        )
        return response.json()
    
    def verify_qr(self, qr_data, signature):
        response = requests.post(
            f'{self.base_url}/verify-qr',
            json={
                'qrData': qr_data,
                'signature': signature
            },
            headers=self.headers
        )
        return response.json()

# Usage
api = ActingEuropeAPI('http://localhost:3001/api', 'your-api-key')

booking = api.create_booking(1, [1, 2], [
    {'name': 'John Doe', 'email': 'john@example.com'},
    {'name': 'Jane Doe', 'email': 'jane@example.com'}
])
```

## Testing

### Test Environment

Use the development server for testing:

```
Base URL: http://localhost:3001/api
```

### Sample Test Data

#### Scanner Authentication

1. **Login to Scanner Account**

```bash
curl -X POST http://localhost:3001/api/auth/scanner-login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "tickets@actingeurope.eu",
    "password": "your-password",
    "deviceId": "scanner-device-001"
  }'
```

2. **Validate Scanner Session**

```bash
curl -X POST http://localhost:3001/api/auth/validate-scanner \
  -H "Authorization: Bearer YOUR_SCANNER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "deviceId": "scanner-device-001"
  }'
```

#### Create a Test Booking

```bash
curl -X POST http://localhost:3001/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "performanceId": 1,
    "seatIds": [1, 2],
    "attendees": [
      {"name": "Test User 1", "email": "test1@example.com"},
      {"name": "Test User 2", "email": "test2@example.com"}
    ]
  }'
```

#### Verify Ticket (Requires Scanner Auth)

```bash
curl -X POST http://localhost:3001/api/tickets/verify \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SCANNER_TOKEN" \
  -d '{
    "payload": "booking-ref:AE-2024-001|seat-id:123|event-id:456"
  }'
```

#### Check-in Ticket (Requires Scanner Auth)

```bash
curl -X POST http://localhost:3001/api/tickets/check-in \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SCANNER_TOKEN" \
  -d '{
    "payload": "booking-ref:AE-2024-001|seat-id:123|event-id:456"
  }'
```

## Support

For API support and questions:
- Email: dev@actingeurope.eu
- Documentation: [GitHub Repository](https://github.com/your-repo)
- Issues: [GitHub Issues](https://github.com/your-repo/issues)

---

*Last updated: January 2024*
*API Version: 2.0*