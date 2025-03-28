const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const db = require('../../db/db');
require('dotenv').config(); // Load environment variables

const secretKey = process.env.JWT_SECRET || 'your_secret_key'; // Use .env for security

// 🟢 User Signup (Registration)
router.post("/signup", async (req, res) => {
    const { username, password, mobile_number, name, lastname, email, address } = req.body;

    if (!username || !password || !mobile_number) {
        return res.status(400).json({ error: "Username, password, and mobile number are required" });
    }
    try {
        const [existingUsers] = await db.execute(
            'SELECT * FROM ecommerceshop.users WHERE username = ?', [username]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({ error: "Username already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10); // 🔒 Hash password
        await db.execute(
            'INSERT INTO ecommerceshop.users (username, password, mobile_number, name, lastname, email, address) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [username, hashedPassword, mobile_number, name, lastname, email, address]
        );
        res.status(201).json({ message: "User registered successfully", status: 1 });
    } catch (error) {
        console.error("❌ Error registering user:", error);
        res.status(500).json({ error: "Error registering user" });
    }
});
// 🟢 User Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }
    try {
        const [users] = await db.execute("SELECT * FROM ecommerceshop.users WHERE username = ?", [username]);
        // console.log("User Data from DB:", users);

        if (users.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const user = users[0];
        // Compare hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });
        // Successful login response
        res.status(200).json({
            message: "Login successful",
            userId: user.id,
            token,
            status: 1,
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Error logging in", details: error.message });
    }
});
router.get('/allusers', async (req, res) => {
    try {
        const [users] = await db.execute(
            'SELECT id, username, mobile_number, name, lastname, email, address FROM ecommerceshop.users'
        );
        if (users.length === 0) {
            return res.status(404).json({ error: 'No users found', status: 0 });
        }
        res.status(200).json({ users, status: 1 });
    } catch (error) {
        console.error('❌ Error fetching all users:', error);
        res.status(500).json({ error: 'Error fetching all users', status: 0 });
    }
});
// 🟢 Get User Details
router.get('/userdetails/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const [userDetails] = await db.execute('SELECT id, username, mobile_number, name, lastname, email, address FROM ecommerceshop.users WHERE id = ?', [userId]);
        if (userDetails.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ ...userDetails[0], status: 1 });
    } catch (error) {
        console.error('❌ Error fetching user details:', error);
        res.status(500).json({ error: 'Error fetching user details' });
    }
});

// 🟢 Update User Profile
router.put('/edituserdetails/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const { username, mobile_number, name, lastname, email, address } = req.body;

        const [result] = await db.execute(
            'UPDATE ecommerceshop.users SET username = ?, mobile_number = ?, name = ?, lastname = ?, email = ?, address = ? WHERE id = ?',
            [username, mobile_number, name, lastname, email, address, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User details updated successfully', status: 1 });

    } catch (error) {
        console.error('❌ Error updating user details:', error);
        res.status(500).json({ error: 'Error updating user details' });
    }
});

module.exports = router;
