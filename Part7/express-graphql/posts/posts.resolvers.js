const postsModel = require('./posts.model')

module.exports = {
    Query: {
        posts: () => {
            return postsModel.getAllPosts();
        },
        post: (_, args) => {
            return postsModel.getPostById(args.id);
        }
    }
}