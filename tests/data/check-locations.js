const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkLocations() {
  try {
    const theatres = await prisma.theatre.findMany({
      select: {
        city: true,
        country: true
      }
    });
    
    const uniqueLocations = [...new Set(theatres.map(t => `${t.city}, ${t.country}`))];
    
    console.log('Unique locations found in database:');
    uniqueLocations.forEach(loc => console.log('- ' + loc));
    
    console.log('\nUnique cities:');
    const uniqueCities = [...new Set(theatres.map(t => t.city))];
    uniqueCities.forEach(city => console.log('- ' + city));
    
    console.log('\nUnique countries:');
    const uniqueCountries = [...new Set(theatres.map(t => t.country))];
    uniqueCountries.forEach(country => console.log('- ' + country));
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkLocations();