const commentsModel = require('./comments.model')

module.exports = {
    Query: {
        comments: () => {
            return commentsModel.getAllComments();
        },
        commentsByLikes: (_, args) => {
            return commentsModel.getCommentsByLikes(args.minLikes);
        }
    },
    Mutation: {
        addNewComment: (_, args) => {
            return commentsModel.addNewComment(args.id, args.text);
        }
    }
}