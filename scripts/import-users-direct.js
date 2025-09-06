require('dotenv').config();
const fs = require('fs');
const { Client } = require('pg');

async function importUsersDirectly() {
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
        // Check if user already exists
        const checkQuery = 'SELECT id FROM users WHERE id = $1';
        const checkResult = await client.query(checkQuery, [user.id]);
        
        if (checkResult.rows.length > 0) {
          console.log(`User ${user.email} already exists, skipping...`);
          skipped++;
          continue;
        }
        
        // Insert user
        const insertQuery = `
          INSERT INTO users (id, email, first_name, last_name, phone, is_admin, email_notifications, marketing_preferences, created_at, updated_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `;
        
        await client.query(insertQuery, [
          user.id,
          user.email,
          user.first_name,
          user.last_name,
          user.phone,
          user.is_admin,
          user.email_notifications,
          user.marketing_preferences,
          user.created_at,
          user.updated_at
        ]);
        
        console.log(`✓ Imported user: ${user.email}`);
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
    
  } catch (error) {
    console.error('Import failed:', error);
  } finally {
    await client.end();
  }
}

// Run the import
importUsersDirectly();