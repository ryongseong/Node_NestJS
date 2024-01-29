const express = require('express');
const router = express.Router();
const Product = require('../models/products.model');

router.post('/:product', async (req, res, next) => {
    const slug = req.params.product;
    try{
        const product = await Product.findOne({ slug: slug });

        // 처음 카트에 상품을 넣을 때
        if (!req.session.cart) {
            req.session.cart = [];
            req.session.cart.push({
                title: slug,
                qty: 1,
                price: product.price,
                image: '/product-images/' + product._id + '/' + product.image
            })
        } else {
            let cart = req.session.cart;
            let newItem = true;

            // 만약 이미 카트에 있는 상품이라면 한 개 추가하고 loop break
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].title === slug) {
                    cart[i].qty++;
                    newItem = false;
                    break;
                }
            }

            // 처음 추가 하는 상품이라면
            if (newItem) {
                cart.push({
                    title: slug,
                    qty: 1,
                    price: product.price,
                    image: '/product-images/' + product._id + '/' + product.image
                });
            }
        }
        req.flash('success', '상품이 추가되었습니다.');
        res.redirect('back');
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.get('/checkout', (req, res) => {
    res.render('checkout');
})

router.get('/update/:product', (req, res) => {
    const slug = req.params.product;
    const action = req.query.action;
    let cart = req.session.cart;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].title === slug) {
            switch (action) {
                case "add":
                    cart[i].qty++;
                    break;
                case "remove":
                    cart[i].qty--;
                    if (cart[i].qty < 1) {
                        cart.splice(i, 1);
                    }
                    break;
                case "clear":
                    cart.splice(i, 1);
                    if (cart.length === 0) {
                        delete req.session.cart;
                    }
                    break;
                default:
                    console.log("update problem");
                    break;
            }
            break;
        }
    }

    req.flash('success', '장바구니 업데이트되었습니다.');
    res.redirect('/cart/checkout');
})

router.delete('/', (req, res) =>  {

    delete req.session.cart;

    req.flash('success', '장바구니가 비워졌습니다.');
    res.redirect('back');
})

router.get('/complete-order', (req, res) => {
    delete req.session.cart;

    res.sendStatus(200);
})

module.exports = router;