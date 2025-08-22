const express = require("express");
const { signup, login,googleLoginController,sendOtp } = require("../controllers/authController");

const router = express.Router();
// Send Otp
router.post("/send-otp", sendOtp);  
// ✅ Signup Route
router.post("/signup", signup);

// ✅ Login Route
router.post("/login", login);

router.post("/google-login", googleLoginController);

module.exports = router;
