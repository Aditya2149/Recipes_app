const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false, // This may be necessary for self-signed certificates
    ca: process.env.DB_SSL_CA
  }
});

pool.connect(async (err, client, release) => {
    if (err) {
        console.error('Error connecting to Aiven database:', err);
    } else {
        console.log('Connected to Aiven database!');
    }
});

module.exports = pool;