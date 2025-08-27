const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function debugVerification() {
  console.log('🔍 Debugging verification process...');
  console.log('Supabase URL:', supabaseUrl);
  console.log('Service Key configured:', !!supabaseServiceKey);
  
  try {
    // List all users to see their metadata
    const { data: users, error: fetchError } = await supabase.auth.admin.listUsers();
    
    if (fetchError) {
      console.error('❌ Error fetching users:', fetchError);
      return;
    }
    
    console.log(`📊 Found ${users.users.length} users`);
    
    // Show user metadata for debugging
    users.users.forEach((user, index) => {
      console.log(`\n👤 User ${index + 1}:`);
      console.log('  Email:', user.email);
      console.log('  Email confirmed:', user.email_confirmed_at ? 'Yes' : 'No');
      console.log('  User metadata:', JSON.stringify(user.user_metadata, null, 2));
      console.log('  Verification token:', user.user_metadata?.verification_token || 'None');
      console.log('  Email verified:', user.user_metadata?.email_verified || 'No');
    });
    
    // Find users with verification tokens
    const usersWithTokens = users.users.filter(u => u.user_metadata?.verification_token);
    console.log(`\n🔑 Users with verification tokens: ${usersWithTokens.length}`);
    
    if (usersWithTokens.length > 0) {
      const testUser = usersWithTokens[0];
      const testToken = testUser.user_metadata.verification_token;
      console.log(`\n🧪 Testing verification with token: ${testToken}`);
      
      // Test the verification logic
      const user = users.users.find(u => 
        u.user_metadata?.verification_token === testToken && 
        !u.user_metadata?.email_verified
      );
      
      if (user) {
        console.log('✅ Token found and user not yet verified');
        console.log('User email:', user.email);
      } else {
        console.log('❌ Token not found or user already verified');
      }
    }
    
  } catch (error) {
    console.error('❌ Debug error:', error);
  }
}

debugVerification().catch(console.error);