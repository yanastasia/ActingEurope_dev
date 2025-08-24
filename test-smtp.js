const nodemailer = require('nodemailer');
require('dotenv').config();

// Create transporter with your SMTP settings
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number.parseInt(process.env.EMAIL_SERVER_PORT || "587"),
  secure: process.env.EMAIL_SERVER_PORT === "465", // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

// Test SMTP connection
async function testSMTPConnection() {
  console.log('Testing SMTP connection...');
  console.log('SMTP Host:', process.env.EMAIL_SERVER_HOST);
  console.log('SMTP Port:', process.env.EMAIL_SERVER_PORT);
  console.log('SMTP User:', process.env.EMAIL_SERVER_USER);
  console.log('Email From:', process.env.EMAIL_FROM);
  console.log('---');

  try {
    // Verify connection configuration
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');
    
    // Send a test email
    const testEmail = {
      from: process.env.EMAIL_FROM,
      to: 'test@example.com', // Change this to your email for actual testing
      subject: 'SMTP Test Email',
      text: 'This is a test email to verify SMTP configuration.',
      html: '<p>This is a <strong>test email</strong> to verify SMTP configuration.</p>'
    };
    
    console.log('\nSending test email...');
    const info = await transporter.sendMail(testEmail);
    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    
  } catch (error) {
    console.error('❌ SMTP test failed:');
    console.error('Error:', error.message);
    
    // Provide specific error guidance
    if (error.code === 'EAUTH') {
      console.error('\n🔍 Authentication failed. Check your EMAIL_SERVER_USER and EMAIL_SERVER_PASSWORD.');
    } else if (error.code === 'ECONNECTION') {
      console.error('\n🔍 Connection failed. Check your EMAIL_SERVER_HOST and EMAIL_SERVER_PORT.');
    } else if (error.code === 'ETIMEDOUT') {
      console.error('\n🔍 Connection timed out. Check your network connection and SMTP settings.');
    }
  }
}

// Run the test
testSMTPConnection();