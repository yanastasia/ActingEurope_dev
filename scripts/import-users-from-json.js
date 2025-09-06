require('dotenv').config();
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client for direct database access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function importUsersFromJson() {
  try {
    console.log('Reading user data from JSON file...');
    
    // Read the exported user data
    const jsonData = fs.readFileSync('scripts/auth-users-export.json', 'utf8');
    const users = JSON.parse(jsonData);
    
    console.log(`Found ${users.length} users to import`);
    
    // Import users one by one using Supabase client
    let imported = 0;
    let skipped = 0;
    
    for (const user of users) {
      try {
        // Insert user into the users table
        const { data, error } = await supabase
          .from('users')
          .insert({
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            phone: user.phone,
            is_admin: user.is_admin,
            email_notifications: user.email_notifications,
            marketing_preferences: user.marketing_preferences,
            created_at: user.created_at,
            updated_at: user.updated_at
          })
          .select();
        
        if (error) {
          if (error.code === '23505') { // Unique constraint violation
            console.log(`User ${user.email} already exists, skipping...`);
            skipped++;
          } else {
            console.error(`Error importing user ${user.email}:`, error.message);
          }
        } else {
          console.log(`✓ Imported user: ${user.email}`);
          imported++;
        }
      } catch (userError) {
        console.error(`Failed to import user ${user.email}:`, userError.message);
      }
    }
    
    console.log(`\n=== Import Summary ===`);
    console.log(`Total users processed: ${users.length}`);
    console.log(`Successfully imported: ${imported}`);
    console.log(`Skipped (already exist): ${skipped}`);
    console.log(`Failed: ${users.length - imported - skipped}`);
    
    // Verify the import by counting users in the database
    const { count, error: countError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });
    
    if (!countError) {
      console.log(`\nTotal users now in database: ${count}`);
    }
    
  } catch (error) {
    console.error('Import failed:', error);
  }
}

// Run the import
importUsersFromJson();