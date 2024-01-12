const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// email, password => 로그인 1 ===> googleId: null
// google          => 로그인 1 ===> googleId: dsafndfdaf
// email, password => 로그인   ===> googleId: null    ===> Error!!

const saltRounds = 10;

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        minLength: 5
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    kakaoId: {
        type: String,
        unique: true,
        sparse: true
    }
})

userSchema.pre('save', function(next) {
    let user = this;
    // 비밀번호가 변경될 때만
    if(user.isModified('password')) {
        // salt를 생성
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);
                user.password = hash
                next()
            })
        })
    } else {
        next();
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    // bcrypt compare
    // plain password => client, this.password => database
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    })
}

const User = mongoose.model('User', userSchema);

module.exports = User;