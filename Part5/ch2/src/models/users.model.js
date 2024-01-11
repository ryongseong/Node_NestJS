const mongoose = require('mongoose');

// email, password => 로그인 1 ===> googleId: null
// google          => 로그인 1 ===> googleId: dsafndfdaf
// email, password => 로그인   ===> googleId: null    ===> Error!!

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        minLength: 5
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    // bcrypt compare
    // plain password => client, this.password => database
    if(plainPassword === this.password){
        cb(null, true);
    } else {
        cb(null, false);
    }

    return cb({error: 'error'});
}

const User = mongoose.model('User', userSchema);

module.exports = User;