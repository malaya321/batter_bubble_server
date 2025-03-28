const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
  // Create new user
  async createUser({ username, email, password, profile_image = null, bio = null, rating = 0 }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (username, email, password_hash, profile_image, bio, rating)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(query, [
      username,
      email,
      hashedPassword,
      profile_image,
      bio,
      rating
    ]);

    return result;
  },

  // Find user by email
  async findUserByEmail(email) {
    const query = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await db.execute(query, [email]);
    return rows[0];  // Return the first matching user
  }
};

module.exports = User;
