const bcrypt = require("bcrypt");
const pool = require("../config/db");

exports.signupController = async (req, res) => {
  const { username, email, password, profile_image, bio, rating } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users (username, email, password_hash, profile_image, bio, rating, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    const values = [username, email, hashedPassword, profile_image, bio, rating];

    await pool.query(sql, values);

    res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
