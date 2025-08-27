const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkEventTheatre() {
  try {
    const event = await prisma.event.findUnique({
      where: { id: 211 },
      select: { id: true, title: true, theatre_id: true }
    });
    console.log('Event:', event);
    
    if (event && event.theatre_id) {
      const theatre = await prisma.theatre.findUnique({
        where: { id: event.theatre_id },
        select: { id: true, name: true, content_language: true }
      });
      console.log('Theatre:', theatre);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkEventTheatre();