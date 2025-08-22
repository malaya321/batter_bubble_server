const jwt = require("jsonwebtoken");
const {loginOrRegisterGoogleUser, createUser, getUserByEmail, verifyUser } = require("../models/User");
const { OAuth2Client } = require('google-auth-library');


const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'your_google_client_id';
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// Google login
const googleLoginController = async (req, res) => {
  const { idToken } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    const user = await loginOrRegisterGoogleUser({
      email,
      username: name,
      avatar: picture,
    });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      user: {
        user_id: user.id,
        username: user.username,
        email: user.email,
        profile_image: user.profile_image,
        provider: user.provider
      },
      token,
    });
  } catch (err) {
    console.error('Google Login Error:', err);
    res.status(500).json({ message: 'Google login failed' });
  }
};

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
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
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

  // Otp based Login 
  // Send Otp
 const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in DB or cache (e.g., Redis, MySQL with expiry)
    await storeOtp(email, otp);

    // Send OTP via email (using nodemailer)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Login OTP",
      text: `Your OTP is: ${otp}. It will expire in 5 minutes.`
    });

    res.status(200).json({ message: "OTP sent to your email" });

  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  signup,
  login,
  sendOtp,
  googleLoginController
};
