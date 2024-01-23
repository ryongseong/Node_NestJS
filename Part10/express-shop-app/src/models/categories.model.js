const { default: mongoose } = require("mongoose");

const categorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String
    }
});

module.exports = mongoose.model('Category', categorySchema);