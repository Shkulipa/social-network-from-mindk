const db = require("../../db/db");
const commentTable = "commentsForPosts";
const commentTableCommentId = "commentId";

const addComment = async function (data) {
    try {
        const { comment, postId } = data;
        const { userId } = data.user;

        await db(commentTable).insert({
            userId: userId,
            postId: postId,
            comment: comment,
        });

        return { userId: userId, postId: postId, comment: comment };
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = {
    addComment,
};
