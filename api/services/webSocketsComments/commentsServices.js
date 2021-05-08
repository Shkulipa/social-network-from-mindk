const db = require("../../db/db");
const commentTable = "commentsForPosts";
const commentTableCommentId = "commentId";

const broadcastComments = (wss, data) => {
    wss.clients.forEach(async (client) => {
        try {
            client.send(JSON.stringify(data));
        } catch (e) {
            console.log(e);
        }
    });
};

const addInBase = async (data) => {
    const { comment, userId, postId } = data;

    const idNewMess = await db(commentTable)
        .insert({
            userId: userId,
            postId: postId,
            comment: comment,
        })
        .returning(commentTableCommentId);

    return db
        .select(
            "comment",
            "cfp.userId",
            "u.nameUser",
            "u.avatarImg",
            "commentId",
            "cfp.postId",
            db.raw('to_char("date", \'YYYY-MM-DD hh:mm:ss\') as "date"')
        )
        .from("commentsForPosts as cfp")
        .where("cfp.commentId", idNewMess[0])
        .join("users as u", function () {
            this.on("cfp.userId", "=", "u.userId");
        });
};

module.exports = {
    broadcastComments,
    addInBase,
};
