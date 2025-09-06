require('dotenv').config();
const { Client } = require('pg');

async function verifyUsers() {
  const client = new Client({
    connectionString: process.env.DIRECT_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('Connected to database successfully!');
    
    // Count total users
    const countResult = await client.query('SELECT COUNT(*) FROM users');
    console.log(`Total users in database: ${countResult.rows[0].count}`);
    
    // Show all users
    const usersResult = await client.query('SELECT id, email, first_name, last_name FROM users ORDER BY id');
    console.log('\nAll users:');
    usersResult.rows.forEach(user => {
      console.log(`ID: ${user.id}, Email: ${user.email}, Name: ${user.first_name} ${user.last_name}`);
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.end();
  }
}

verifyUsers();