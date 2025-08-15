const { prisma } = require('../lib/prisma');

async function testDatabaseConnection() {
  
  try {
    console.log('Testing database connection...');
    
    // Test basic connection
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Test a simple query
    const userCount = await prisma.user.count();
    console.log(`✅ Query successful - Found ${userCount} users`);
    
    // Test theatre query
    const theatreCount = await prisma.theatre.count();
    console.log(`✅ Theatre query successful - Found ${theatreCount} theatres`);
    
    // Test creating a simple theatre (and then delete it)
    console.log('Testing theatre creation...');
    const testTheatre = await prisma.theatre.create({
      data: {
        name: 'Test Theatre Connection',
        city: 'Test City',
        country: 'Test Country',
        content_language: 'en'
      }
    });
    console.log(`✅ Theatre creation successful - Created theatre with ID ${testTheatre.id}`);
    
    // Clean up test theatre
    await prisma.theatre.delete({
      where: { id: testTheatre.id }
    });
    console.log('✅ Test theatre cleaned up');
    
    console.log('\n🎉 All database operations successful!');
    
  } catch (error) {
    console.error('❌ Database connection error:', error);
    
    if (error.code) {
      console.error('Error code:', error.code);
    }
    
    if (error.message.includes('connect')) {
      console.error('\n💡 This appears to be a connection issue. Check:');
      console.error('   - DATABASE_URL environment variable');
      console.error('   - Network connectivity');
      console.error('   - Database server status');
    }
    
    if (error.message.includes('timeout')) {
      console.error('\n💡 This appears to be a timeout issue. Check:');
      console.error('   - Database server load');
      console.error('   - Connection pool settings');
      console.error('   - Network latency');
    }
    
    if (error.message.includes('authentication')) {
      console.error('\n💡 This appears to be an authentication issue. Check:');
      console.error('   - Database credentials');
      console.error('   - User permissions');
    }
    
  } finally {
    await prisma.$disconnect();
    console.log('\nDatabase connection closed.');
  }
}

testDatabaseConnection();