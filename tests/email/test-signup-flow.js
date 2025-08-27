require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const { ServerClient } = require('postmark');
const crypto = require('crypto');

// Initialize clients
const postmarkClient = new ServerClient(process.env.POSTMARK_API_KEY || process.env.POSTMARK_SERVER_TOKEN || "");
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Generate verification token
function generateVerificationToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Send verification email
async function sendVerificationEmail(email, token) {
  const verificationUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth/verify?token=${token}`;
  
  const templateAlias = process.env.POSTMARK_VERIFICATION_TEMPLATE_ALIAS || 'confirm-sign-up-for-acting-eur';
  
  await postmarkClient.sendEmailWithTemplate({
    From: process.env.EMAIL_FROM || 'info@actingeurope.eu',
    To: email,
    TemplateAlias: templateAlias,
    TemplateModel: {
      verification_url: verificationUrl,
      user_email: email
    }
  });
}

// Signup function
async function signUpWithCustomVerification(email, password, metadata) {
  try {
    const verificationToken = generateVerificationToken();
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: false,
      user_metadata: {
        ...metadata,
        verification_token: verificationToken,
        email_verified: false
      }
    });
    
    if (error) {
      throw new Error(error.message);
    }
    
    await sendVerificationEmail(email, verificationToken);
    
    return {
      success: true,
      userId: data.user.id
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

async function testSignupFlow() {
  console.log('🧪 Testing complete signup flow...');
  
  const testEmail = 'jakimanastasija@gmail.com';
  const testPassword = 'TestPassword123!';
  const testMetadata = {
    first_name: 'Test',
    last_name: 'User',
    full_name: 'Test User',
    is_admin: false
  };
  
  try {
    console.log(`📧 Creating user: ${testEmail}`);
    
    const result = await signUpWithCustomVerification(
      testEmail,
      testPassword,
      testMetadata
    );
    
    if (result.success) {
      console.log('✅ User created successfully!');
      console.log('User ID:', result.userId);
      console.log('📬 Verification email should be sent');
      console.log('\n🔗 Check your email for the verification link');
    } else {
      console.log('❌ Signup failed:', result.message);
    }
    
  } catch (error) {
    console.error('❌ Test error:', error);
  }
}

testSignupFlow().catch(console.error);