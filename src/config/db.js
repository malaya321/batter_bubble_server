const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err.message);
    process.exit(1);
  } else {
    console.log('✅ MySQL Database connected successfully');
    connection.release();
  }
});

module.exports = pool.promise();
