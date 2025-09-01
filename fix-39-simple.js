// Simple script to fix 39 Monkeys to 36 Monkeys using existing database connection
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fix39To36() {
  try {
    console.log('🔍 Checking for events with "39 Monkeys"...');
    
    // First, let's see what events exist
    const { data: allEvents, error: fetchError } = await supabase
      .from('events')
      .select('id, title, company, content_language')
      .limit(10);
    
    if (fetchError) {
      console.error('Error fetching events:', fetchError);
      return;
    }
    
    console.log(`Found ${allEvents?.length || 0} events total`);
    if (allEvents && allEvents.length > 0) {
      console.log('Sample events:');
      allEvents.slice(0, 3).forEach(event => {
        console.log(`- ${event.id}: "${event.title}" - Company: ${JSON.stringify(event.company)}`);
      });
    }
    
    // Look for events with 39 Monkeys
    const { data: events39, error: search39Error } = await supabase
      .from('events')
      .select('id, title, company, content_language')
      .or('company.cs.{"OSAIK \"39 Monkeys\""}, company.cs.{"ОСАИК \"39 Маймуни\""}, company.cs.{"ОСАИК \"39 Мајмуни\""}, company.cs.{"ОСАИК \"39 Мајмуна\""}')
    
    if (search39Error) {
      console.error('Error searching for 39 Monkeys:', search39Error);
      return;
    }
    
    console.log(`\nFound ${events39?.length || 0} events with "39 Monkeys"`);
    
    if (events39 && events39.length > 0) {
      for (const event of events39) {
        console.log(`\n🔄 Updating event ${event.id}: "${event.title}"`);
        console.log(`Current company: ${JSON.stringify(event.company)}`);
        
        // Update the company array
        let updatedCompany = [...event.company];
        updatedCompany = updatedCompany.map(company => {
          if (company === 'OSAIK "39 Monkeys"') return 'OSAIK "36 Monkeys"';
          if (company === 'ОСАИК "39 Маймуни"') return 'ОСАИК "36 Маймуни"';
          if (company === 'ОСАИК "39 Мајмуни"') return 'ОСАИК "36 Мајмуни"';
          if (company === 'ОСАИК "39 Мајмуна"') return 'ОСАИК "36 Мајмуна"';
          return company;
        });
        
        const { error: updateError } = await supabase
          .from('events')
          .update({ company: updatedCompany })
          .eq('id', event.id);
        
        if (updateError) {
          console.error(`❌ Error updating event ${event.id}:`, updateError);
        } else {
          console.log(`✅ Updated event ${event.id}`);
          console.log(`New company: ${JSON.stringify(updatedCompany)}`);
        }
      }
    } else {
      console.log('✅ No events found with "39 Monkeys" - database is already correct!');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

fix39To36();