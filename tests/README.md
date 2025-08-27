# Test Files Organization

This directory contains all test files organized by category:

## 📧 Email Tests (`/email`)
Tests related to email functionality, Postmark integration, and verification flows:
- `test-email-delivery.js` - Direct Postmark email delivery test
- `test-signup-flow.js` - Complete signup and email verification flow
- `test-email-service.js` - Email service functionality tests
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
- `cleanup-duplicates.js` - Database cleanup utilities

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

## Running Tests

To run tests from the project root:

```bash
# Email tests
node tests/email/test-signup-flow.js
node tests/email/test-email-delivery.js

# Database tests
node tests/database/check-db-state.js

# Data validation
node tests/data/check-venues.js

# General tests
node tests/general/test-photo-upload.js
```

## Notes

- All test files maintain their original functionality
- Email tests require proper Postmark configuration
- Database tests may require active database connection
- Some tests may need environment variables to be set