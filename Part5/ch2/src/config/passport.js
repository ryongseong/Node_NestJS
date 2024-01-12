const passport = require('passport');
const User = require('../models/users.model');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const KaKaoStrategy = require('passport-kakao').Strategy;
require('dotenv').config();

const googleStrategyConfig = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    scope: ['email', 'profile']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({ googleId: profile.id });
    
        if (existingUser) {
            return done(null, existingUser);
        } else {
            const user = new User();
            user.email = profile.emails[0].value;
            user.googleId = profile.id;
    
            await user.save();
            done(null, user);
        }
    } catch (err) {
        console.error(err);
        done(err);
    }
})

const localStrategyConfig = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({email: email.toLocaleLowerCase()})
        if (!user) {
            return done(null, false, {message: `Email ${email} not found`});
        }
        const isMatch = await user.comparePassword(password, (err, isMatch) => {
            if (err) return done(err);
            if (isMatch) {
                return done(null, user);
            }
            return done(null, false, {message: 'Invalid email or password'});
        });
    } catch(err) {
        return done(err);
    }
})

const kakaoStrategyConfig = new KaKaoStrategy({
    clientID: process.env.KAKAO_CLIENT_ID,
    callbackURL: '/auth/kakao/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({kakaoId: profile.id});

        if (existingUser){
            return done(null, existingUser);
        } else {
            const user = new User();
            user.email = profile._json?.kakao_account.email;
            user.kakaoId = profile.id;
            await user.save();
            done(null, user);
        }
    } catch (err) {
        done(err);
    }
})

// req.login(user)
passport.serializeUser((user, done) => {
    done(null, user.id);
})

// client => session => request
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
})

passport.use('local', localStrategyConfig)
passport.use('google', googleStrategyConfig)
passport.use('kakao', kakaoStrategyConfig)