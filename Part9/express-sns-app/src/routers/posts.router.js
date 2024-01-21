const express = require('express');
const multer = require('multer');
const path = require('path');
const { checkAuthenticated, checkPostOwnership } = require('../middleware/auth');
const Post = require('../models/posts.model');
const Comment = require('../models/comments.model');
const router = express.Router();

const storageEngine = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '../public/assets/images'))
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

const upload = multer({ storage: storageEngine}).single('image');

router.post('/', checkAuthenticated, upload, (req, res, next) => {
    let name = req.body.name;
    let desc = req.body.desc;
    let image = req.file ? req.file.filename: "";

    Post.create({
        name: name,
        image: image,
        description: desc,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    }, (err, _) => {
        if (err) {
            // next(err);
            req.flash('error', '포스트 생성 실패');
            res.redirect("back");
        } else {
            req.flash('success', '포스트 생성 성공');
            res.redirect("back");
        }
    })
})

router.get('/', checkAuthenticated, (req, res) => {
    Post.find()
        .populate("comments")
        .sort({ createdAt: -1})
        .exec((err, posts) => {
            if (err) {
                console.log(err)
            } else {
                res.render('posts/index', {
                    posts: posts
                })
            }
        })
})

router.get("/:id/edit", checkPostOwnership, (req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if (err) {
            res.redirect("/posts");
        } else {
            res.render("posts/edit", {
                post: post
            })
        }
    })
})

router.put("/:id", checkPostOwnership, (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, (err, _) => {
        if (err) {
            req.flash('error', '게시물을 수정하는데 오류가 발생했습니다.');
        } else {
            req.flash('success', '게시물 수정을 완료했습니다.');
        }
        res.redirect('/posts');
    })
})

router.delete("/:id", checkPostOwnership, (req, res) => {
    Post.findByIdAndDelete(req.params.id, (err, _) => {
        if (err) {
            req.flash('error', '게시물을 지우는데 실패했습니다.');
        } else {
            req.flash('success', '게시물을 지우는데 성공했습니다.');
        }
        res.redirect('/posts');
    })
})

module.exports = router;