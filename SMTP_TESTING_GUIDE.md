# SMTP Testing Guide

## Current Status

❌ **SMTP Authentication Failed**

Your SMTP test revealed an authentication error with Postmark:
```
Error: Invalid login: 535 5.7.8 Error: authentication failed
```

## Current Configuration

- **SMTP Host**: smtp.postmarkapp.com
- **SMTP Port**: 587
- **SMTP User**: 1f860c79-fd05-4e58-9081-00b5d1105948
- **Email From**: ActingEurope <noreply@actingeurope.eu>

## How to Fix SMTP Authentication

### 1. Verify Postmark Credentials

1. **Login to Postmark Dashboard**:
   - Go to [https://postmarkapp.com](https://postmarkapp.com)
   - Login to your account

2. **Check Server Token**:
   - Navigate to "Servers" in your dashboard
   - Select your server
   - Go to "API Tokens" tab
   - Copy the **Server API Token** (not the Account API Token)

3. **Update Environment Variables**:
   ```env
   EMAIL_SERVER_HOST="smtp.postmarkapp.com"
   EMAIL_SERVER_PORT="587"
   EMAIL_SERVER_USER="<your-server-api-token>"
   EMAIL_SERVER_PASSWORD="<your-server-api-token>"
   EMAIL_FROM="ActingEurope <noreply@actingeurope.eu>"
   ```

   **Note**: For Postmark SMTP, both `EMAIL_SERVER_USER` and `EMAIL_SERVER_PASSWORD` should be the same Server API Token.

### 2. Verify Sender Signature

1. **Check Sender Signatures**:
   - In Postmark dashboard, go to "Sender Signatures"
   - Ensure `noreply@actingeurope.eu` is verified
   - If not, add and verify this email address

2. **Alternative**: Use a verified domain
   - If you have domain verification set up, you can use any email from that domain

### 3. Test SMTP Connection

After updating your credentials:

```bash
# Run the SMTP test
node test-smtp.js
```

### 4. Test Email Service Functions

```bash
# Test your actual email service
node test-email-service.js
```

**Note**: Your email service has `isDevelopment = true`, which means emails are logged but not sent. To actually send emails:

1. Open `lib/email-service.ts`
2. Change `const isDevelopment = true` to `const isDevelopment = false`
3. Run the test again

## Alternative SMTP Providers

If Postmark continues to have issues, consider these alternatives:

### Gmail SMTP
```env
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-gmail@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="Your Name <your-gmail@gmail.com>"
```

### SendGrid SMTP
```env
EMAIL_SERVER_HOST="smtp.sendgrid.net"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="apikey"
EMAIL_SERVER_PASSWORD="your-sendgrid-api-key"
EMAIL_FROM="Your Name <verified@yourdomain.com>"
```

### Mailgun SMTP
```env
EMAIL_SERVER_HOST="smtp.mailgun.org"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="postmaster@your-domain.mailgun.org"
EMAIL_SERVER_PASSWORD="your-mailgun-password"
EMAIL_FROM="Your Name <noreply@your-domain.com>"
```

## Testing Steps

1. **Update your `.env` file** with correct SMTP credentials
2. **Run basic SMTP test**: `node test-smtp.js`
3. **If successful, test email service**: `node test-email-service.js`
4. **For actual email sending**, set `isDevelopment = false` in `lib/email-service.ts`
5. **Test in your application** by trying to sign up a new user

## Troubleshooting

### Common Issues:

1. **Wrong API Token**: Make sure you're using the Server API Token, not Account API Token
2. **Unverified Sender**: Ensure your "From" email is verified in Postmark
3. **Firewall/Network**: Some networks block SMTP ports
4. **Rate Limits**: Check if you've exceeded Postmark's sending limits

### Debug Commands:

```bash
# Test with verbose output
DEBUG=nodemailer* node test-smtp.js

# Check environment variables
echo $EMAIL_SERVER_HOST
echo $EMAIL_SERVER_USER
```

## Next Steps

1. Fix the Postmark credentials
2. Test the connection
3. Update `isDevelopment` flag if you want to send real emails
4. Test user registration to ensure email verification works

Once SMTP is working, your application will be able to send:
- Email verification emails
- Welcome emails
- Ticket confirmation emails
- Reminder emails