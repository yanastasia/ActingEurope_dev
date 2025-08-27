const { ServerClient } = require('postmark');
require('dotenv').config();

// Initialize Postmark client
const postmarkClient = new ServerClient(process.env.POSTMARK_SERVER_TOKEN);

async function sendTestVerificationEmail() {
  console.log('📧 Sending test verification email...');
  
  // CHANGE THIS TO YOUR EMAIL ADDRESS
  const testEmail = 'jakimanastasija@gmail.com'; // ⚠️ UPDATE THIS!
  
  if (testEmail === 'your-email@example.com') {
    console.log('❌ Please update the testEmail variable with your actual email address!');
    return;
  }
  
  const templateModel = {
    email: testEmail,
    confirmationUrl: 'https://actingeurope.eu/verify-email?token=test-token-123',
    userName: 'Test User'
  };
  
  try {
    const result = await postmarkClient.sendEmailWithTemplate({
      TemplateAlias: process.env.POSTMARK_VERIFICATION_TEMPLATE_ALIAS,
      To: testEmail,
      From: process.env.EMAIL_FROM || 'info@actingeurope.eu',
      TemplateModel: templateModel
    });
    
    console.log('✅ Verification email sent successfully!');
    console.log('📬 Message ID:', result.MessageID);
    console.log('📧 Check your inbox at:', testEmail);
    
  } catch (error) {
    console.log('❌ Failed to send verification email:');
    console.log('Error:', error.message);
    
    if (error.code === 1101) {
      console.log('\n🔍 Template not found. Make sure you\'ve updated your Postmark template.');
    } else if (error.code === 422) {
      console.log('\n🔍 Template validation failed. Check your template variables.');
    } else if (error.code === 300) {
      console.log('\n🔍 Invalid email address or sender signature not verified.');
    }
  }
}



async function runEmailTests() {
  console.log('🚀 Postmark Email Test\n');
  console.log('⚠️  IMPORTANT: Update the testEmail variable in this script with your real email address!\n');
  
  await sendTestVerificationEmail();
  
  console.log('\n✨ Test completed!');
  console.log('\n📝 Next steps:');
  console.log('   1. Check your email inbox for the test email');
  console.log('   2. If email looks good, your Postmark integration is working!');
  console.log('   3. If not, update your Postmark templates using POSTMARK_TEMPLATE_SETUP.md');
}

// Run the tests
runEmailTests().catch(console.error);