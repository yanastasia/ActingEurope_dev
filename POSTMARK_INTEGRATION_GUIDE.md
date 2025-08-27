# Postmark Integration Guide

This guide covers the Postmark email service integration for email verification in the Acting Europe application.

## Overview

The application uses a **hybrid email approach**:
- **Postmark**: Email verification and signup confirmation emails (with templates)
- **Nodemailer**: Other transactional emails (welcome, tickets, reminders, contact forms)

## Setup

### 1. Postmark Account Configuration

1. **Create a Postmark Account**: Sign up at [postmarkapp.com](https://postmarkapp.com)
2. **Get Server API Token**: Navigate to Servers → Your Server → API Tokens
3. **Verify Sender Signature**: Add and verify your sending domain/email
4. **Create Email Template**: Use the template alias `confirm-sign-up-for-acting-eur`

### 2. Environment Variables

Add these variables to your `.env` file:

```env
# Postmark Configuration
POSTMARK_SERVER_TOKEN="your-postmark-server-token"
POSTMARK_VERIFICATION_TEMPLATE_ALIAS="confirm-sign-up-for-acting-eur"

# Email Control
SEND_EMAILS="true"  # Set to "true" to send emails in development
NODE_ENV="development"  # or "production"
```

### 3. Template Configuration

Your Postmark template must include these variables:
- `{{userName}}` - User's display name
- `{{confirmationUrl}}` - Email verification link

**Template Example**:
```html
<h1>Welcome {{userName}}!</h1>
<p>Please confirm your email address by clicking the link below:</p>
<a href="{{confirmationUrl}}">Confirm Email Address</a>
```

## Implementation Details

### Service Files

1. **`lib/postmark-verification-service.ts`**: Handles email verification with Postmark templates
2. **`lib/postmark-email-service.ts`**: General Postmark email service (currently verification only)
3. **`lib/email-service.ts`**: Nodemailer service for other email types

### Email Verification Flow

1. User signs up via `/app/auth/signup`
2. `signUpWithCustomVerification()` is called
3. Supabase creates user account
4. `sendVerificationEmail()` sends Postmark template email
5. User clicks confirmation link
6. Supabase handles verification via `/auth/callback`

### Development Mode

In development mode (`NODE_ENV=development` and `SEND_EMAILS≠true`):
- Emails are logged to console instead of being sent
- Useful for testing without sending real emails
- Set `SEND_EMAILS=true` to send real emails in development

## Testing

### Test Files Location

All email tests are located in `/tests/email/`:

```bash
# Check Postmark template configuration
node tests/email/check-postmark-template.js

# Test direct Postmark email delivery
node tests/email/test-email-delivery.js

# Test complete signup flow
node tests/email/test-signup-flow.js

# Clean up test users
node tests/email/delete-user.js
```

### Template Verification

```bash
# Inspect your Postmark template
node tests/email/check-postmark-template.js
```

This will show:
- Template ID and details
- Template variables found
- HTML/text content preview

### Email Delivery Test

```bash
# Test direct email sending
node tests/email/test-email-delivery.js
```

This will:
- Generate a Supabase confirmation link
- Send email via Postmark with correct variables
- Display delivery confirmation

## Troubleshooting

### Common Issues

1. **Template Variables Not Showing**
   - Check template uses `{{userName}}` and `{{confirmationUrl}}`
   - Verify template is active in Postmark
   - Run `node tests/email/check-postmark-template.js`

2. **Emails Not Sending**
   - Verify `POSTMARK_SERVER_TOKEN` is correct
   - Check `SEND_EMAILS=true` in development
   - Ensure sender signature is verified in Postmark

3. **Template Not Found**
   - Verify `POSTMARK_VERIFICATION_TEMPLATE_ALIAS` matches your template
   - Check template exists and is active

4. **Development Mode Issues**
   - Set `SEND_EMAILS=true` to send real emails
   - Check console logs for email content

### Debug Commands

```bash
# Check environment variables
echo $POSTMARK_SERVER_TOKEN
echo $SEND_EMAILS

# Test Postmark connection
node tests/email/test-email-delivery.js

# Verify template configuration
node tests/email/check-postmark-template.js
```

## API Reference

### `sendVerificationEmail(email, confirmationUrl, userName)`

Sends verification email using Postmark template.

**Parameters**:
- `email`: Recipient email address
- `confirmationUrl`: Supabase confirmation URL
- `userName`: User's display name

**Returns**: Promise with email delivery result

### `testPostmarkConnection()`

Tests Postmark API connection and returns server information.

**Returns**: Promise with connection status and server details

## Migration from SMTP-only

If migrating from pure SMTP setup:

1. **Keep existing SMTP configuration** for non-verification emails
2. **Add Postmark configuration** for verification emails
3. **Update signup flow** to use `signUpWithCustomVerification`
4. **Test both email types** work correctly

## Security Considerations

- **API Token Security**: Never commit Postmark tokens to version control
- **Template Security**: Ensure templates don't expose sensitive data
- **Rate Limiting**: Postmark has built-in rate limiting
- **Sender Verification**: Always verify sender signatures

## Support

For issues with this integration:
1. Check the troubleshooting section above
2. Run the test files to diagnose issues
3. Review Postmark documentation at [postmarkapp.com/developer](https://postmarkapp.com/developer)
4. Check application logs for detailed error messages