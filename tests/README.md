# Test Files Organization

This directory contains all test files organized by category:

## 📧 Email Tests (`/email`)
Tests related to email functionality, Postmark integration, and verification flows:
- `test-email-delivery.js` - Direct Postmark email delivery test
- `test-signup-flow.js` - Complete signup and email verification flow
- `test-email-service.js` - Email service functionality tests
- `test-ticket-email.js` - Ticket email with QR codes test
- `test-multi-ticket-email.js` - Multi-ticket booking email test
- `test-ticket-delivery.js` - PDF ticket generation and delivery test
- `test-multi-attendee-booking.js` - Multi-attendee booking scenarios
- `check-postmark-template.js` - Postmark template inspection
- `delete-user.js` - User cleanup utility for testing
- `debug-verification.js` - Email verification debugging
- `send-test-email.js` - Basic email sending test
- `test-smtp.js` - SMTP configuration tests
- `test-smtp-providers.js` - Multiple SMTP provider tests
- `test-verification.js` - Email verification process tests

## 🗄️ Database Tests (`/database`)
Tests for database operations and data integrity:
- `check-db-state.js` - Database state verification
- `check-events-table.js` - Events table validation
- `check-bookings-table.js` - Bookings and attendees table validation
- `check-qr-codes.js` - QR code generation and uniqueness tests
- `cleanup-duplicates.js` - Database cleanup utilities
- `test-booking-schema.js` - Booking schema validation tests

## 📊 Data Tests (`/data`)
Tests for data validation and content verification:
- `check-articles.js` - Article data validation
- `check-company-data.js` - Company information checks
- `check-event-theatre.js` - Event-theatre relationship validation
- `check-locations.js` - Location data verification
- `check-theatre-ids.js` - Theatre ID consistency checks
- `check-theatre-tags.js` - Theatre tagging validation
- `check-venue-ids.js` - Venue ID verification
- `check-venues-simple.js` - Basic venue data checks
- `check-venues.js` - Comprehensive venue validation
- `debug-company.js` - Company data debugging

## 🔧 General Tests (`/general`)
Miscellaneous tests and utilities:
- `test-events-direct.js` - Direct event testing
- `test-import.js` - Data import functionality
- `test-photo-upload.js` - Photo upload system tests

## 🎫 QR Code Tests (`/qr`)
Tests for QR code generation, verification, and ticket validation:
- `test-qr-generation.js` - QR code generation and signing
- `test-qr-verification.js` - QR code verification endpoint
- `test-qr-bulk-verification.js` - Bulk QR verification tests
- `test-qr-security.js` - QR code security and tampering tests
- `test-ticket-pdf.js` - PDF ticket generation with QR codes

## 🎟️ Booking Tests (`/booking`)
Tests for the booking system and multi-ticket functionality:
- `test-single-booking.js` - Single ticket booking flow
- `test-multi-ticket-booking.js` - Multi-ticket booking scenarios
- `test-booking-validation.js` - Booking data validation
- `test-seat-availability.js` - Seat availability and conflicts
- `test-booking-email-flow.js` - Complete booking to email flow

## Running Tests

To run tests from the project root:

```bash
# Email tests
node tests/email/test-signup-flow.js
node tests/email/test-email-delivery.js
node tests/email/test-ticket-email.js
node tests/email/test-multi-ticket-email.js

# QR Code tests
node tests/qr/test-qr-generation.js
node tests/qr/test-qr-verification.js
node tests/qr/test-qr-bulk-verification.js
node tests/qr/test-qr-security.js

# Booking tests
node tests/booking/test-single-booking.js
node tests/booking/test-multi-ticket-booking.js
node tests/booking/test-booking-email-flow.js

# Database tests
node tests/database/check-db-state.js
node tests/database/check-bookings-table.js
node tests/database/check-qr-codes.js

# Data validation
node tests/data/check-venues.js

# General tests
node tests/general/test-photo-upload.js
```

## QR Code Testing Procedures

### 1. QR Code Generation Testing

```bash
# Test QR code generation for single booking
node tests/qr/test-qr-generation.js --single

# Test QR code generation for multi-ticket booking
node tests/qr/test-qr-generation.js --multi

# Test QR code uniqueness
node tests/qr/test-qr-generation.js --uniqueness
```

### 2. QR Code Verification Testing

```bash
# Test valid QR code verification
node tests/qr/test-qr-verification.js --valid

# Test invalid QR code verification
node tests/qr/test-qr-verification.js --invalid

# Test tampered QR code verification
node tests/qr/test-qr-verification.js --tampered
```

### 3. Multi-Ticket Booking Testing

```bash
# Test single attendee, multiple tickets
node tests/booking/test-multi-ticket-booking.js --same-email

# Test multiple attendees, different emails
node tests/booking/test-multi-ticket-booking.js --different-emails

# Test mixed scenario (some same, some different emails)
node tests/booking/test-multi-ticket-booking.js --mixed
```

### 4. Email Integration Testing

```bash
# Test single ticket email with QR code
node tests/email/test-ticket-email.js --single

# Test multi-ticket email with multiple QR codes
node tests/email/test-ticket-email.js --multi

# Test email grouping by attendee email
node tests/email/test-multi-attendee-booking.js
```

## Test Data Setup

Before running booking and QR tests, ensure test data is available:

```bash
# Seed test database with venues and performances
npm run db:seed:test

# Or manually create test data
node tests/setup/create-test-data.js
```

## Environment Variables for Testing

Set these environment variables for comprehensive testing:

```env
# Test database (optional, uses main DB if not set)
TEST_DATABASE_URL=postgresql://...

# QR code testing
QR_SECRET_KEY=test-secret-key-for-qr-codes

# Email testing
SEND_EMAILS=false  # Set to true to actually send emails
SMTP_HOST=smtp.postmarkapp.com
SMTP_USER=your-test-api-token
SMTP_PASS=your-test-api-token

# Test mode
NODE_ENV=test
```

## Test Coverage Areas

### QR Code System
- ✅ QR code generation with HMAC signatures
- ✅ QR code verification and validation
- ✅ QR code security (tampering detection)
- ✅ Bulk QR verification for event entry
- ✅ QR code uniqueness across bookings

### Multi-Ticket Booking
- ✅ Single attendee, multiple tickets
- ✅ Multiple attendees, same email
- ✅ Multiple attendees, different emails
- ✅ Seat availability validation
- ✅ Booking reference generation

### Email Integration
- ✅ PDF ticket generation with QR codes
- ✅ Email grouping by attendee email address
- ✅ Multiple PDF attachments per email
- ✅ Booking confirmation emails
- ✅ Email delivery status tracking

### Database Integrity
- ✅ Booking and attendee relationships
- ✅ QR code storage and retrieval
- ✅ Seat booking conflicts
- ✅ Data consistency across tables

## Notes

- All test files maintain their original functionality
- Email tests require proper Postmark configuration
- Database tests may require active database connection
- QR code tests require `QR_SECRET_KEY` environment variable
- Booking tests may create test data in the database
- Some tests may need environment variables to be set
- Use `NODE_ENV=test` to avoid affecting production data

## Continuous Integration

For CI/CD pipelines, run the full test suite:

```bash
# Run all tests
npm run test:all

# Run specific test categories
npm run test:qr
npm run test:booking
npm run test:email
```