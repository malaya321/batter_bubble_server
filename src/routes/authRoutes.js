const express = require("express");
const { signupController } = require("../controllers/authController");
const router = express.Router();

// ✅ Signup Route
router.post("/signup", signupController);

module.exports = router;
