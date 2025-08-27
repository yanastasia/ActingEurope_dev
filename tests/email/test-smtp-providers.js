const nodemailer = require('nodemailer');
require('dotenv').config();

// Different SMTP provider configurations
const providers = {
  postmark: {
    name: 'Postmark',
    host: 'smtp.postmarkapp.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    }
  },
  gmail: {
    name: 'Gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER || 'your-gmail@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD || 'your-app-password',
    }
  },
  sendgrid: {
    name: 'SendGrid',
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false,
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY || 'your-sendgrid-api-key',
    }
  }
};

// Test a specific provider
async function testProvider(providerName) {
  const config = providers[providerName];
  if (!config) {
    console.log(`❌ Provider '${providerName}' not found`);
    return false;
  }

  console.log(`\n🧪 Testing ${config.name}...`);
  console.log(`Host: ${config.host}:${config.port}`);
  console.log(`User: ${config.auth.user}`);
  console.log('---');

  try {
    const transporter = nodemailer.createTransport(config);
    
    // Verify connection
    await transporter.verify();
    console.log(`✅ ${config.name} connection verified successfully!`);
    
    // Optional: Send test email (uncomment to actually send)
    /*
    const testEmail = {
      from: process.env.EMAIL_FROM || 'test@example.com',
      to: 'test@example.com', // Change this to your email
      subject: `Test Email from ${config.name}`,
      text: `This is a test email sent via ${config.name} SMTP.`,
    };
    
    const info = await transporter.sendMail(testEmail);
    console.log(`📧 Test email sent! Message ID: ${info.messageId}`);
    */
    
    return true;
  } catch (error) {
    console.log(`❌ ${config.name} test failed:`);
    console.log(`Error: ${error.message}`);
    
    // Provide specific guidance
    if (error.code === 'EAUTH') {
      console.log(`🔍 Check your ${config.name} credentials`);
      if (providerName === 'postmark') {
        console.log('   - Use your Server API Token for both user and password');
        console.log('   - Verify sender signature in Postmark dashboard');
      } else if (providerName === 'gmail') {
        console.log('   - Use App Password, not your regular Gmail password');
        console.log('   - Enable 2FA and generate App Password in Google Account settings');
      }
    }
    return false;
  }
}

// Test all providers or a specific one
async function runTests() {
  const args = process.argv.slice(2);
  const specificProvider = args[0];
  
  console.log('🔧 SMTP Provider Testing Tool');
  console.log('============================');
  
  if (specificProvider) {
    if (providers[specificProvider]) {
      await testProvider(specificProvider);
    } else {
      console.log(`❌ Unknown provider: ${specificProvider}`);
      console.log(`Available providers: ${Object.keys(providers).join(', ')}`);
    }
  } else {
    console.log('Testing all configured providers...');
    
    for (const providerName of Object.keys(providers)) {
      await testProvider(providerName);
    }
    
    console.log('\n📝 Usage:');
    console.log('  node test-smtp-providers.js [provider]');
    console.log('  Available providers: postmark, gmail, sendgrid');
    console.log('\n💡 To send actual test emails, uncomment the test email section in the script.');
  }
}

// Run the tests
runTests().catch(console.error);