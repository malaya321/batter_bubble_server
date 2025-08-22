const pool = require("../config/db"); 

const createProfile = async (user_id, name, city, bio, avatar_url) => {
    const [result] = await pool.execute(
      'INSERT INTO profiles (user_id, name, city, bio, avatar_url) VALUES (?, ?, ?, ?, ?)',
      [user_id, name, city, bio, avatar_url]
    );
    return result.insertId; // Correct
  };
  const getProfileByUserId = async (profileId) => {
    const [rows] = await pool.execute(
      'SELECT * FROM profiles WHERE user_id = ?',
      [profileId]
    );
    return rows[0] || null;
  };
  module.exports = {
    createProfile,
    getProfileByUserId
  };