const { PrismaClient } = require('./lib/prisma-client');

const prisma = new PrismaClient();

async function checkTheatreIds() {
  try {
    console.log('Checking existing theatre IDs...');
    
    const theatres = await prisma.theatre.findMany({
      select: {
        id: true,
        name: true,
        content_language: true
      },
      orderBy: {
        id: 'asc'
      }
    });
    
    console.log('\nExisting theatres:');
    theatres.forEach(theatre => {
      console.log(`ID: ${theatre.id}, Name: ${theatre.name}, Language: ${theatre.content_language}`);
    });
    
  } catch (error) {
    console.error('Error checking theatre IDs:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkTheatreIds();