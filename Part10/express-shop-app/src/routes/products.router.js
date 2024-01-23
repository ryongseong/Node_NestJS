const express = require('express');
const { getAllCategories } = require('../middleware/product');
const router = express.Router();
const Product = require('../models/products.model');

router.get('/', getAllCategories, async (req, res, next) => {
    try{
        const products = await Product.find();
        res.render('products', {
            products
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.get('/:category', getAllCategories, async (req, res, next) => {
    const categorySlug = req.params.category;
    try {
        const products = await Product.find({ category: categorySlug });
        res.render('products', {
            products: products
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
})

module.exports = router;