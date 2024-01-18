const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    description: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    author: {
        id: {
            type: 
        }
    }
})