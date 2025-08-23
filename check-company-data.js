const { PrismaClient } = require('./lib/prisma-client');

const prisma = new PrismaClient();

async function checkCompanyData() {
  try {
    const events = await prisma.event.findMany({
      select: {
        id: true,
        title: true,
        company: true
      },
      take: 10
    });
    
    console.log('Events with company data:');
    events.forEach(event => {
      console.log(`ID: ${event.id}, Title: ${event.title}`);
      console.log(`Company type: ${typeof event.company}`);
      console.log(`Company value:`, event.company);
      console.log(`Is Array: ${Array.isArray(event.company)}`);
      console.log('---');
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCompanyData();