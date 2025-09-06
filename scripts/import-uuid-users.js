const { Client } = require('pg');
require('dotenv').config();

const userData = [
  {
    "id": "aee72e6f-560f-4589-beb7-8506c6fd4f65",
    "email": "tickets@actingeurope.eu",
    "first_name": "",
    "last_name": "",
    "phone": null,
    "is_admin": false,
    "email_notifications": true,
    "marketing_preferences": true,
    "created_at": "2025-09-05T14:22:24.842Z",
    "updated_at": "2025-09-05T14:22:24.843Z"
  },
  {
    "id": "66190a07-8689-44df-b6c1-d498acba764c",
    "email": "borazah@abv.bg",
    "first_name": "Борислава",
    "last_name": "Захариева",
    "phone": null,
    "is_admin": false,
    "email_notifications": true,
    "marketing_preferences": true,
    "created_at": "2025-09-05T14:22:24.843Z",
    "updated_at": "2025-09-05T14:22:24.843Z"
  },
  {
    "id": "c0ce61f9-806a-4abf-bb44-767d577c790e",
    "email": "atanasovognian@gmail.com",
    "first_name": "Ognyan",
    "last_name": "Atanasov",
    "phone": null,
    "is_admin": false,
    "email_notifications": true,
    "marketing_preferences": true,
    "created_at": "2025-09-05T14:22:24.843Z",
    "updated_at": "2025-09-05T14:22:24.843Z"
  },
  {
    "id": "6eec88ba-7af6-4f75-9227-e688d6c83d49",
    "email": "anastasiayakimovska@gmail.com",
    "first_name": "Anastasia",
    "last_name": "Y",
    "phone": null,
    "is_admin": false,
    "email_notifications": true,
    "marketing_preferences": true,
    "created_at": "2025-09-05T14:22:24.843Z",
    "updated_at": "2025-09-05T14:22:24.843Z"
  },
  {
    "id": "3fb997e3-7164-4bc1-aa17-9e9fe6306eb4",
    "email": "toni.jakimovski@gmail.com",
    "first_name": "Тони",
    "last_name": "Якимовски",
    "phone": null,
    "is_admin": false,
    "email_notifications": true,
    "marketing_preferences": true,
    "created_at": "2025-09-05T14:22:24.843Z",
    "updated_at": "2025-09-05T14:22:24.843Z"
  },
  {
    "id": "3c3b21e5-611a-4341-a401-a5b0bb8047d2",
    "email": "admin@actingeurope.eu",
    "first_name": "",
    "last_name": "",
    "phone": null,
    "is_admin": false,
    "email_notifications": true,
    "marketing_preferences": true,
    "created_at": "2025-09-05T14:22:24.843Z",
    "updated_at": "2025-09-05T14:22:24.844Z"
  }
];

async function importUsers() {
  const client = new Client({
    connectionString: process.env.DIRECT_URL
  });

  try {
    await client.connect();
    console.log('Connected to database');

    let imported = 0;
    let skipped = 0;
    let failed = 0;

    for (const user of userData) {
      try {
        // Check if user already exists by email
        const existingUser = await client.query(
          'SELECT id, email FROM users WHERE email = $1',
          [user.email]
        );

        if (existingUser.rows.length > 0) {
          console.log(`User ${user.email} already exists with ID ${existingUser.rows[0].id}`);
          skipped++;
          continue;
        }

        // Insert new user with auto-incremented integer ID
        const result = await client.query(`
          INSERT INTO users (
            email, 
            password_hash, 
            first_name, 
            last_name, 
            phone, 
            is_admin, 
            email_notifications, 
            marketing_preferences, 
            created_at, 
            updated_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          RETURNING id, email
        `, [
          user.email,
          'temp_hash', // Temporary password hash since this will be managed by Supabase auth
          user.first_name || '',
          user.last_name || '',
          user.phone,
          user.is_admin,
          user.email_notifications,
          user.marketing_preferences,
          user.created_at,
          user.updated_at
        ]);

        console.log(`✓ Imported user: ${result.rows[0].email} with new ID: ${result.rows[0].id} (original UUID: ${user.id})`);
        imported++;
      } catch (error) {
        console.error(`✗ Failed to import user ${user.email}:`, error.message);
        failed++;
      }
    }

    // Get final count
    const totalUsers = await client.query('SELECT COUNT(*) FROM users');
    
    console.log('\n=== Import Summary ===');
    console.log(`Successfully imported: ${imported}`);
    console.log(`Skipped (already exists): ${skipped}`);
    console.log(`Failed: ${failed}`);
    console.log(`Total users in database: ${totalUsers.rows[0].count}`);

  } catch (error) {
    console.error('Database connection error:', error);
  } finally {
    await client.end();
  }
}

importUsers();