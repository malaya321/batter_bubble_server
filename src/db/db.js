
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
});

exports.execute = async (query,data=[]) => {
    const conn = await pool.getConnection();
    let result=await conn.query(query,data);
    conn.release();
    return result;
}
