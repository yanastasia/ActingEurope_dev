const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkVenues() {
  try {
    const venues = await prisma.venue.findMany();
    console.log('Current venues:');
    venues.forEach(v => {
      console.log(`ID: ${v.id}, Name: ${v.name}`);
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkVenues();