const path = require('path');

function getPost(req, res) {
    res.render('posts', {
        templateName: 'post',
    });
    // res.sendFile(path.join(__dirname, '..', 'public', 'images', 'forest.jpeg'));
    // res.send('<div><h1>Post Title</h1><p>This is a post</p></div>');
}

module.exports = {
    getPost
}