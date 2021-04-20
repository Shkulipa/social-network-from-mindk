const db = require("../db/db");

const commentTable = "commentsForPosts";

const getComments = async function (req, res) {
    const postId = req.query.postId;
    const limit = req.query.limit || 5;
    const offset = (req.query.page - 1) * limit || 0;

    try {
        const query = await db
            .select(
                "comment",
                "cfp.userId",
                "u.nameUser",
                "u.avatarImg",
                "commentId",
                db.raw('to_char("date", \'YYYY-MM-DD hh:mm:ss\') as "date"')
            )
            .from("commentsForPosts as cfp")
            .where("cfp.postId", postId)
            .join("users as u", function () {
                this.on("cfp.userId", "=", "u.userId");
            })
            .offset(offset)
            .limit(limit)
            .orderBy("date", "DESC");

        const [{ count }] = await db
            .count()
            .from(commentTable)
            .where("postId", postId);

        res.send({ data: query, count: count });
    } catch (err) {
        console.error(err.message);
    }
};

const putComments = async function (req, res) {
    try {
        const { comment } = req.body;
        await db(commentTable).where("commentId", req.params.id).update({
            comment: comment,
        });
        res.send([{ success: "Your comment updated!" }]);
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = {
    getComments,
    putComments,
};
