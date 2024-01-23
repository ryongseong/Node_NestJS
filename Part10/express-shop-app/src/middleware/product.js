const Category = require('../models/categories.model');

async function getAllCategories(req, res, next) {
    try {
        const categories = await Category.find();
        res.locals.categories = categories;
        next();
    } catch (error) {
        console.error(error);
        next(error);
    }
}

module.exports = {
    getAllCategories
}