const passport = require('passport');
const User = require('../models/users.model');
const LocalStrategy = require('passport-local').Strategy;

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


passport.use('local', new LocalStrategy({usernameField: 'email', passwordField: 'password'},
    async (email, password, done) => {
        console.log('haha')

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
        // (err, user) => {
        //     if (err) return done(err);
            
        //     user.comparePassword(password, (err, isMatch) => {
        //         if (err) return done(err);
        //         if (isMatch) {
        //             return done(null, user);
        //         }
        //         return done(null, false, {message: 'Invalid email or password'});
        //     })
        // })
    }
))