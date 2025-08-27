const { sendVerificationEmail, sendWelcomeEmail } = require('./lib/email-service.ts');
require('dotenv').config();

// Test email service functions
async function testEmailService() {
  console.log('Testing Email Service Functions...');
  console.log('Environment Variables:');
  console.log('- EMAIL_SERVER_HOST:', process.env.EMAIL_SERVER_HOST);
  console.log('- EMAIL_SERVER_PORT:', process.env.EMAIL_SERVER_PORT);
  console.log('- EMAIL_SERVER_USER:', process.env.EMAIL_SERVER_USER);
  console.log('- EMAIL_FROM:', process.env.EMAIL_FROM);
  console.log('---\n');

  // Test verification email
  console.log('1. Testing Verification Email...');
  try {
    const testEmail = 'test@example.com'; // Change this to your email
    const testToken = 'test-verification-token-123';
    
    const result = await sendVerificationEmail(testEmail, testToken);
    
    if (result.success) {
      console.log('✅ Verification email test passed!');
    } else {
      console.log('❌ Verification email test failed:', result.error);
    }
  } catch (error) {
    console.log('❌ Verification email test error:', error.message);
  }

  console.log('\n2. Testing Welcome Email...');
  try {
    const testEmail = 'test@example.com'; // Change this to your email
    const testName = 'Test User';
    
    const result = await sendWelcomeEmail(testEmail, testName);
    
    if (result.success) {
      console.log('✅ Welcome email test passed!');
    } else {
      console.log('❌ Welcome email test failed:', result.error);
    }
  } catch (error) {
    console.log('❌ Welcome email test error:', error.message);
  }

  console.log('\n📝 Note: If you see "Development mode: Email would be sent with:" messages,');
  console.log('   this means the isDevelopment flag is set to true in email-service.ts');
  console.log('   To actually send emails, set isDevelopment to false in that file.');
}

// Run the test
testEmailService().catch(console.error);