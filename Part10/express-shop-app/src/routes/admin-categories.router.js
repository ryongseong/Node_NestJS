const express = require('express');
const { checkAdmin } = require('../middleware/auth');
const router = express.Router();
const Category = require('../models/categories.model');

router.get('/add-category', checkAdmin, (req, res) => {
    res.render('admin/add-category');
})

router.post('/add-category', checkAdmin, async(req, res, next) => {
    try {
        const title = req.body.title;
        const slug = title.replace(/\s+/g, '-').toLowerCase();
        const category = await Category.findOne({ slug: slug});
        if (category) {
            req.flash('error', '카테고리 제목이 존재합니다. 다른 제목을 선택하세요.');
            res.render('admin/add-category', {
                title: title
            });
        }

        // 새로운 카테고리 생성
        const newCategory = new Category({
            title: title,
            slug: slug
        })

        await newCategory.save();
        req.flash('success', '카테고리가 추가되었습니다.');
        res.redirect('/admin/categories');
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.get('/', checkAdmin, async(req, res, next) => {
    try {
        const categories = await Category.find();
        res.render('admin/categories', {
            categories: categories
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.delete('/:id', checkAdmin, async(req, res, next) => {
    try {
        await Category.findByIdAndRemove(req.params.id);
        req.flash('success', '카테고리가 삭제되었습니다.');
        res.redirect('/admin/categories');
    } catch(error) {
        console.error(error);
        next(error);
    }
})

module.exports = router;