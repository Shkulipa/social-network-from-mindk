const db = require("../db/db");

const commentTable = "commentsForPosts";

const addComment = async function (req, res) {
    try {
        const { userId, postId, comment } = req.body;

        await db(commentTable).insert({
            userId: userId,
            postId: postId,
            comment: comment,
        });

        res.send("Comment Added");
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = {
    addComment,
};
