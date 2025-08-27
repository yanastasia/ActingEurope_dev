// Debug script to check company data
const fetch = require('node-fetch');

async function checkCompanyData() {
  try {
    const response = await fetch('http://localhost:3000/api/events?language=en');
    const events = await response.json();
    
    const aivarEvent = events.find(event => event.title.includes('Aivar'));
    
    if (aivarEvent) {
      console.log('Found Aivar event:');
      console.log('Title:', aivarEvent.title);
      console.log('Company:', aivarEvent.company);
      console.log('Is Array:', Array.isArray(aivarEvent.company));
      console.log('Company length:', aivarEvent.company?.length);
      console.log('Company joined:', Array.isArray(aivarEvent.company) ? aivarEvent.company.join(' & ') : aivarEvent.company);
    } else {
      console.log('Aivar event not found');
      console.log('Available events:', events.map(e => e.title));
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

checkCompanyData();