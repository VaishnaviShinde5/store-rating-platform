/**
 * Run this once to seed the first admin user:
 *   node seed-admin.js
 *
 * Make sure your .env is configured and DB is running.
 */

const bcrypt = require('bcrypt');
const { Client } = require('pg');
require('dotenv').config();

async function seed() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  await client.connect();

  const password = 'Admin@1234';
  const hashed = await bcrypt.hash(password, 10);

  try {
    await client.query(
      `INSERT INTO users (name, email, password, address, role, "createdAt")
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (email) DO NOTHING`,
      [
        'System Administrator Account',
        'admin@ratestore.com',
        hashed,
        '123 Admin Street, Pune, Maharashtra 411001',
        'admin',
      ]
    );
    console.log('✅ Admin user created!');
    console.log('   Email:    admin@ratestore.com');
    console.log('   Password: Admin@1234');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await client.end();
  }
}

seed();
