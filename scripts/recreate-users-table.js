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

async function recreateUsersTable() {
  const client = new Client({
    connectionString: process.env.DIRECT_URL
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Start transaction
    await client.query('BEGIN');

    try {
      // Drop existing foreign key constraints that reference users table
      console.log('Dropping foreign key constraints...');
      await client.query('ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_user_id_fkey');
      
      // Drop existing users table
      console.log('Dropping existing users table...');
      await client.query('DROP TABLE IF EXISTS users CASCADE');
      
      // Create new users table with UUID primary key matching JSON structure
      console.log('Creating new users table with UUID structure...');
      await client.query(`
        CREATE TABLE users (
          id UUID PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          first_name VARCHAR(100) NOT NULL DEFAULT '',
          last_name VARCHAR(100) NOT NULL DEFAULT '',
          phone VARCHAR(20),
          is_admin BOOLEAN NOT NULL DEFAULT false,
          email_notifications BOOLEAN NOT NULL DEFAULT true,
          marketing_preferences BOOLEAN NOT NULL DEFAULT false,
          created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
        )
      `);

      // Update bookings table to use UUID for user_id if it exists
      const bookingsTableExists = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'bookings'
        )
      `);

      if (bookingsTableExists.rows[0].exists) {
        console.log('Updating bookings table to use UUID for user_id...');
        await client.query('ALTER TABLE bookings ALTER COLUMN user_id TYPE UUID USING user_id::text::uuid');
        
        // Re-add foreign key constraint
        await client.query(`
          ALTER TABLE bookings 
          ADD CONSTRAINT bookings_user_id_fkey 
          FOREIGN KEY (user_id) REFERENCES users(id) 
          ON DELETE CASCADE
        `);
      }

      // Insert user data
      console.log('Inserting user data...');
      let imported = 0;
      
      for (const user of userData) {
        await client.query(`
          INSERT INTO users (
            id, email, first_name, last_name, phone, 
            is_admin, email_notifications, marketing_preferences, 
            created_at, updated_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `, [
          user.id,
          user.email,
          user.first_name || '',
          user.last_name || '',
          user.phone,
          user.is_admin,
          user.email_notifications,
          user.marketing_preferences,
          user.created_at,
          user.updated_at
        ]);
        
        console.log(`✓ Imported user: ${user.email} with UUID: ${user.id}`);
        imported++;
      }

      // Commit transaction
      await client.query('COMMIT');
      
      // Get final count
      const totalUsers = await client.query('SELECT COUNT(*) FROM users');
      
      console.log('\n=== Table Recreation Summary ===');
      console.log('✓ Users table recreated with UUID structure');
      console.log('✓ Bookings table updated to use UUID foreign keys');
      console.log(`✓ Successfully imported: ${imported} users`);
      console.log(`✓ Total users in database: ${totalUsers.rows[0].count}`);
      
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    }

  } catch (error) {
    console.error('Error recreating users table:', error);
    throw error;
  } finally {
    await client.end();
  }
}

recreateUsersTable().catch(console.error);