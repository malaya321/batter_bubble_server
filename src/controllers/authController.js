const jwt = require("jsonwebtoken");
const { createUser, getUserByEmail, verifyUser } = require("../models/User");

// ✅ Signup Controller
const signup = async (req, res) => {
  const { username, email, password, profile_image, bio, rating } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Username, email, and password are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create new user
    await createUser({ username, email, password, profile_image, bio, rating });

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Login Controller
const login = async (req, res) => {
    const { email, password } = req.body;
  
    console.log("Received Email:", email);
    console.log("Received Password:", password);
  
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    try {
      const user = await verifyUser(email, password);
      console.log("User from DB:", user);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      // ✅ Generate JWT Token
      const token = jwt.sign(
        { userId: user.user_id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.user_id,
          username: user.username,
          email: user.email,
          bio: user.bio,
          profile_image: user.profile_image,
          rating: user.rating,
          created_at: user.created_at,
          updated_at: user.updated_at
        }
      });
  
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

module.exports = {
  signup,
  login
};
