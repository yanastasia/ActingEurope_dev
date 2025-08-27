const { signUpWithCustomVerification } = require('./lib/postmark-verification-service.ts');

// Test the Postmark template variables
async function testPostmarkVariables() {
  console.log('🧪 Testing Postmark template variables...');
  
  const testEmail = 'test-variables@example.com';
  const testPassword = 'TestPassword123!';
  const testMetadata = {
    first_name: 'Anastasija',
    last_name: 'Jakimovska',
    full_name: 'Anastasija Jakimovska',
    is_admin: false
  };

  try {
    const result = await signUpWithCustomVerification(testEmail, testPassword, testMetadata);
    
    if (result.success) {
      console.log('✅ Postmark email sent successfully!');
      console.log('📧 Template variables sent:');
      console.log('   - userName: "Anastasija"');
      console.log('   - confirmationUrl: [Supabase-generated link]');
      console.log('   - user_name: "Anastasija"');
      console.log('   - first_name: "Anastasija"');
      console.log('   - full_name: "Anastasija Jakimovska"');
      console.log('   - email: "test-variables@example.com"');
      console.log('   - product_name: "Acting Europe"');
      console.log('   - support_email: "info@actingeurope.eu"');
    } else {
      console.log('❌ Failed to send email:', result.message);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testPostmarkVariables();