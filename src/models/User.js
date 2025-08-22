const bcrypt = require("bcrypt");
const pool = require("../config/db"); 


// Loginwith Google

const loginOrRegisterGoogleUser = async ({ email, username, avatar }) => {
  const existingUser = await getUserByEmail(email);
  if (existingUser) return existingUser;

  // Generate a random dummy password
  const dummyPassword = Math.random().toString(36).slice(-8); // e.g. 'a1b2c3d4'
  const hashedPassword = await bcrypt.hash(dummyPassword, 10);

  await createUser({
    username,
    email,
    password: hashedPassword, // use hashed dummy password here
    profile_image: avatar,
    bio: null,
    rating: 0,
    provider: 'google',
  });

  return getUserByEmail(email);
};

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


// Store OTP
const storeOtp = async (email, otp) => {
  // Remove any existing OTP for this email
  await db.execute("DELETE FROM user_otps WHERE email = ?", [email]);

  // Insert new OTP with 5-minute expiry
  const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min from now
  await db.execute(
    "INSERT INTO user_otps (email, otp, expires_at) VALUES (?, ?, ?)",
    [email, otp, expiry]
  );
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
  // ✅ Find user by ID
const getUserById = async (userId) => {
  const query = `SELECT * FROM users WHERE user_id = ?`;
  const [rows] = await pool.execute(query, [userId]);
  return rows[0];
};
// ✅ Update user profile
const updateUser = async (userId, { username, bio, profile_image }) => {
  const query = `
    UPDATE users SET username = ?, bio = ?, profile_image = ? WHERE user_id = ?
  `;
  const [result] = await pool.execute(query, [username, bio, profile_image, userId]);
  return result;
};

// ✅ Delete user account
const deleteUser = async (userId) => {
  const query = `DELETE FROM users WHERE user_id = ?`;
  const [result] = await pool.execute(query, [userId]);
  return result;
};

module.exports = {
  createUser,
  getUserByEmail,
  verifyUser,
  getUserById,
  updateUser,
  deleteUser,
  loginOrRegisterGoogleUser,
  storeOtp
};
