// src/app/app.js
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require('helmet');
const mysql = require('mysql2/promise');
const db = require('./src/db/db');
const cors = require('cors');
const app = express();
dotenv.config();
const productRoutes = require('./src/routes/ProductRouter/productRoutes');
const authRouters = require('./src/routes/AuthRouter/Auth');
const cartRouter = require('./src/routes/CartRouter/cartRouter')
app.use(express.static('public'))

// Add middleware
app.use(cors({ origin: 'http://localhost:5174' }));
// http://localhost:5173
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());

app.use('/products', productRoutes);
app.use('/auth',authRouters);
app.use('/cart',cartRouter);

app.get("/", async (req, res) => {
    try {
        let result = await db.execute('SELECT * FROM ecommerceshop.posts');
        // console.log(result, 'sssss');
        res.send(result);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Error fetching products");
    }
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});