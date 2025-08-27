require('dotenv').config();

async function testVerification() {
  console.log('🧪 Testing email verification...');
  
  // Use the token from the debug output for jakimanastasija@gmail.com
  const testToken = 'ca02b9ad53d8c7f0011f5c36c544f3a171c63537f7dd2bdd45ec815087acdab3';
  
  try {
    console.log(`🔑 Testing token: ${testToken}`);
    
    const response = await fetch('http://localhost:3000/api/auth/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: testToken })
    });
    
    const result = await response.json();
    
    console.log('📊 Response status:', response.status);
    console.log('📋 Response body:', JSON.stringify(result, null, 2));
    
    if (response.ok) {
      console.log('✅ Verification successful!');
    } else {
      console.log('❌ Verification failed:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
}

testVerification().catch(console.error);