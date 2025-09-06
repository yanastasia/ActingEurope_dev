require('dotenv').config();
const fs = require('fs');
const { Client } = require('pg');

async function importUsersWithIntegerIds() {
  const client = new Client({
    connectionString: process.env.DIRECT_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('Connecting to database...');
    await client.connect();
    
    console.log('Reading user data from JSON file...');
    const jsonData = fs.readFileSync('scripts/auth-users-export.json', 'utf8');
    const users = JSON.parse(jsonData);
    
    console.log(`Found ${users.length} users to import`);
    
    let imported = 0;
    let skipped = 0;
    
    for (const user of users) {
      try {
        // Check if user already exists by email
        const checkQuery = 'SELECT id FROM users WHERE email = $1';
        const checkResult = await client.query(checkQuery, [user.email]);
        
        if (checkResult.rows.length > 0) {
          console.log(`User ${user.email} already exists, skipping...`);
          skipped++;
          continue;
        }
        
        // Insert user with auto-incremented integer ID
        const insertQuery = `
          INSERT INTO users (email, first_name, last_name, phone, is_admin, email_notifications, marketing_preferences, password_hash)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING id
        `;
        
        const result = await client.query(insertQuery, [
          user.email,
          user.first_name || '',
          user.last_name || '',
          user.phone,
          user.is_admin,
          user.email_notifications,
          user.marketing_preferences,
          'supabase_auth' // placeholder password hash since they use Supabase auth
        ]);
        
        console.log(`✓ Imported user: ${user.email} with ID: ${result.rows[0].id}`);
        imported++;
        
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
    const countResult = await client.query('SELECT COUNT(*) FROM users');
    console.log(`\nTotal users now in database: ${countResult.rows[0].count}`);
    
    // Show all users
    console.log('\n=== All Users in Database ===');
    const allUsers = await client.query('SELECT id, email, first_name, last_name FROM users ORDER BY id');
    console.table(allUsers.rows);
    
  } catch (error) {
    console.error('Import failed:', error.message);
  } finally {
    await client.end();
  }
}

// Run the import
importUsersWithIntegerIds();