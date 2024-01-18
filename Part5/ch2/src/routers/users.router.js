const express = require('express');
const User = require('../models/users.model');
const passport = require('passport');
const sendMail = require('../mail/mail');

const usersRouter = express.Router();

// post
usersRouter.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.json({ msg: info});
        }

        req.logIn(user, function (err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    })(req, res, next)
})
usersRouter.post('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/login');
    });
});
usersRouter.post('/signup', async (req, res) => {
    // user 객체 생성
    const user = new User(req.body);

    // user 컬렉션에 유저를 저장
    try {
        await user.save();
        // 이메일 보내기
        sendMail('ryongseong@example.com', 'ryongseong', 'welcome');
        res.redirect('/login');
    } catch (error){
        console.error(error)
    }
})

// get
usersRouter.get('/google', passport.authenticate('google'));
usersRouter.get('/google/callback', passport.authenticate('google', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login'
}));

usersRouter.get('/kakao', passport.authenticate('kakao'));
usersRouter.get('/kakao/callback', passport.authenticate('kakao', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

module.exports = usersRouter;