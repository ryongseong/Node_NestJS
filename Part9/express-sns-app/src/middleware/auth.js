const Post = require('../models/posts.model')
const Comment = require('../models/comments.model')

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/posts');
    }
    next();
}

function checkPostOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        // id에 맞는 포스트가 있는 포스트인지
        Post.findById(req.params.id, (err, post) => {
            if (err || !post) {
                req.flash('error', 'Post not found');
                res.redirect("back");
            } else {
                // 포스트가 있는데 나의 포스트인지 확인
                if (post.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash('error', '권한이 없습니다.');
                    res.redirect("back");
                }
            }
        })
    } else {
        req.flash('error', '로그인을 먼저 해주세요.');
        res.redirect('/login');
    }
}

function checkCommentOwnership(req, res, next) {
    if (req.isAuthenticated()){
        Comment.findById(req.params.commentId, (err, comment) => {
            if (err || !comment ){
                req.flash('error', '댓글을 찾는 도중에 에러가 발생했습니다.');
                res.redirect('back');
            } else {
                // 내가 작성한 댓글인지 확인
                if (comment.author.id.equals(req.user._id)) {
                    req.comment = comment;
                    next();
                } else {
                    req.flash('error', '권한이 없습니다.');
                    res.redirect('back');
                }
            }
        })
    } else {
        req.flash('error', '로그인을 해주세요.');
        res.redirect('/login');
    }
}

module.exports = {
    checkAuthenticated,
    checkNotAuthenticated,
    checkPostOwnership,
    checkCommentOwnership
}