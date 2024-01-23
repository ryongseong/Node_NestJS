const express = require('express');
const mainRouter = express.Router();
const { checkAuthenticated, checkNotAuthenticated } = require('../middleware/auth');

mainRouter.get('/', (req, res) => {
    res.redirect('products');
});

mainRouter.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('auth/login');
})

mainRouter.get('/signup', checkNotAuthenticated, (req, res) => {
    res.render('auth/signup');
})

module.exports = mainRouter;