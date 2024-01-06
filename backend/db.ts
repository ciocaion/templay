import dotenv from 'dotenv';
import mysql from 'mysql2/promise'; // Import promise version of mysql2

dotenv.config();

// Create a connection pool instead of a single connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Set the limit for maximum number of connections
  queueLimit: 0
});

// Function to get a connection from the pool
export async function getConnection() {
  return await pool.getConnection();
}

export default pool;
