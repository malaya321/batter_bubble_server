const bcrypt = require("bcrypt");
const pool = require("../config/db"); 

// ✅ Create new user
const createUser = async ({ username, email, password, profile_image = null, bio = null, rating = 0 }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `
    INSERT INTO users (username, email, password_hash, profile_image, bio, rating)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const [result] = await pool.execute(query, [
    username,
    email,
    hashedPassword,
    profile_image,
    bio,
    rating
  ]);

  return result;
};

// ✅ Find user by email
const getUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = ?`;
  const [rows] = await pool.execute(query, [email]);
  return rows[0];  // Return the first matching user
};

// ✅ Verify user credentials (for login)
const verifyUser = async (email, password) => {
    try {
      const query = "SELECT * FROM users WHERE email = ?";
      const [rows] = await pool.execute(query, [email]);
  
      if (rows.length === 0) {
        console.log("No user found");
        return null;
      }
  
      const user = rows[0];
      console.log("DB User:", user);
  
      // Ensure the password hash is a string
      const storedHash = Buffer.isBuffer(user.password_hash)
        ? user.password_hash.toString('utf-8')
        : user.password_hash;
  
      const isMatch = await bcrypt.compare(password, storedHash);
  
      if (!isMatch) {
        console.log("Password does not match");
        return null;
      }
  
      return user;
  
    } catch (error) {
      console.error("Error in verifyUser:", error);
      throw error;
    }
  };

module.exports = {
  createUser,
  getUserByEmail,
  verifyUser
};
