// cartRouter.js
const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const dotenv = require("dotenv");


// addTo Cart
router.post("/addToCart", async (req, res) => {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || !quantity || quantity <= 0) {
        return res.status(400).json({ error: 'Invalid userId, productId, or quantity' });
    }
    try {
        // Check if the product exists in the database
        const [existingProduct] = await db.execute('SELECT * FROM ecommerceshop.posts WHERE id = ?', [productId]);
        if (existingProduct.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Check if the product is already in the user's cart
        const [existingCartItem] = await db.execute('SELECT * FROM ecommerceshop.cart WHERE userId = ? AND productId = ?', [userId, productId]);
        if (existingCartItem.length > 0) {
            // If the product is already in the cart, update its quantity
            const updatedQuantity = existingCartItem[0].quantity + quantity;
            await db.execute('UPDATE ecommerceshop.cart SET quantity = ? WHERE userId = ? AND productId = ?', [updatedQuantity, userId, productId]);                            ß
            res.status(200).json({ message: 'Item quantity updated in cart' });
        } else {
            // If the product is not in the cart, insert it
            const sqlQuery = `INSERT INTO ecommerceshop.cart (userId, productId, quantity) VALUES (?, ?, ?)`;
            console.log('SQL Query:', sqlQuery, [userId, productId, quantity]);
            const result = await db.execute(sqlQuery, [userId, productId, quantity]);
            const insertedId = result[0].insertId;
            res.status(200).json({ message: 'Item added to cart successfully', insertedId });
        }
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: 'Error adding item to cart' });
    }
});

// Get cart product




module.exports = router;
