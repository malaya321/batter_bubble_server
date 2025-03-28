const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const dotenv = require("dotenv");
// const dotenv = require('../../../index');
dotenv.config();
// POST route to add a new product
router.post("/addProduct", async (req, res) => {
    const { title, body, categoryId } = req.body;
    if (!title || !body || !categoryId) {
        return res.status(400).send("Title, description, and created_at are required");
    }
    try {
        const sqlQuery = `INSERT INTO ecommerceshop.posts (title, body,category_id) VALUES (?,?,?)`;
        console.log('SQL Query:', sqlQuery, [title, body, categoryId]);
        // Execute the query and store the result
        const result = await db.execute(sqlQuery, [title, body, categoryId]);
        const insertedId = result[0].insertId;

        // Send a successful response
        res.status(201).json({ message: 'Product added successfully', insertedId });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ error: "Error adding product" });
    }
});

//get all product
router.get('/getProduct', async (req, res) => {
    const appUrl = process.env.APP_URL;
    console.log('App URL::::::', appUrl);
    try {
        const [product] = await db.execute('SELECT * FROM ecommerceshop.posts');
        let productImage = [];
        product.forEach((products) => {
            const id = products.id;
            const title = products.title;
            const description = products.body;
            const imagePath = appUrl + products.product_image;
            const category_id = products.category_id
            productImage.push({ id, title, description, imagePath, category_id });
        })
        res.status(200).json(productImage);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "error fetching products" });
    }
})
//get all category
router.get('/getCategory', async (req, res) => {
    const appUrl = process.env.APP_URL;
    console.log('App URL:', appUrl);
    try {
        const [categories] = await db.execute('SELECT * FROM ecommerceshop.categories');
        let categoriesWithImages = [];
        categories.forEach((category) => {
            const id = category.id;
            const name = category.name;
            const imagePath = appUrl + category.category_image;
            console.log(`Category ID: ${id}`);
            console.log(`Category Name: ${name}`);
            console.log(`ImagePath: ${imagePath}`);
            categoriesWithImages.push({ id, name, imagePath });
        });
        // Send the response here after loop is done
        res.status(200).json(categoriesWithImages);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ error: "Error fetching categories" });
    }
});

// Get products by category ID
router.get('/getProductsByCategory/:categoryId', async (req, res) => {
    const categoryId = req.params.categoryId;
    const appUrl = process.env.APP_URL;
    try {
        const [products] = await db.execute('SELECT * FROM ecommerceshop.posts WHERE category_id = ?', [categoryId]);
        let productImage = [];
        products.forEach((products) => {
            const id = products.id;
            const title = products.title;
            const description = products.body;
            const imagePath = appUrl + products.product_image;
            const category_id = products.category_id;
            productImage.push({ id, title, description, imagePath, category_id });
        })
        res.status(200).json(productImage);
    } catch (error) {
        console.error("Error fetching products by category:", error);
        res.status(500).json({ error: "Error fetching products by category" });
    }
});


//get get single product with details
router.get('/getSingleProducts/:productId', async (req, res) => {
    try {
        const productId = req.params.productId
        console.log('product Id', productId);
        const [productDetails] = await db.execute('SELECT * FROM ecommerceshop.posts WHERE id = ?', [productId])
        if (productDetails.length === 0) {
            return res.status(404).json({ error: 'Product not Found' })
        }
        const product = productDetails[0]
        const { id, title, body, category_id, product_image,quantity } = product;
        const appUrl = process.env.APP_URL;
        const imageUrl = appUrl + product_image;
        res.status(200).json({ id, title, body, category_id, product_image: imageUrl,quantity, status: 1 });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Error fetching user details'});
    }
})


module.exports = router;
