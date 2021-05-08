const db = require("../db/db");
const { recordFile } = require("../functions/functions");

const postsTable = "posts";

const getPosts = async (req, res) => {
    try {
        const limit = req.query.limit || 7;
        const offset = (req.query.page - 1) * limit || 0;

        const query = await db
            .select(
                "avatarImg",
                "nameUser",
                "users.userId",
                "available",
                "postImg",
                "description",
                "postId",
                db.raw('to_char("date", \'YYYY-MM-DD hh:mm:ss\') as "date"')
            )
            .from(postsTable)
            .limit(limit)
            .offset(offset)
            .join("users", function () {
                this.on("posts.userId", "=", "users.userId");
            })
            .orderBy("date", "desc");
        const [{ count }] = await db.count().from(postsTable);

        res.send({ data: query, count: count });
    } catch (err) {
        console.error(err.message);
    }
};

const getOnePost = async (req, res) => {
    try {
        const id = req.params.id;

        res.send(
            await db
                .select(
                    "avatarImg",
                    "nameUser",
                    "users.userId",
                    "available",
                    "postImg",
                    "description",
                    "postId",
                    "date"
                )
                .from(postsTable)
                .join("users", function () {
                    this.on("posts.userId", "=", "users.userId");
                })
                .where("postId", Number(id))
                .first()
        );
    } catch (err) {
        console.error(err.message);
    }
};

const delOnePosts = async (req, res) => {
    try {
        await db(postsTable).where("postId", req.params.id).del();
        res.send("post deleted");
    } catch (err) {
        console.error(err.message);
    }
};

const putOnePosts = async (req, res) => {
    try {
        const { description, userId, available } = req.body;
        if (req.body.dataImg) {
            const fileName = recordFile(req.body.dataImg, "images/posts");

            await db(postsTable).where("postId", req.params.id).update({
                description: description,
                userId: userId,
                available: available,
                postImg: fileName,
            });
            res.send([{ success: "Your post updated!" }]);
        } else {
            await db(postsTable).where("postId", req.params.id).update({
                description: description,
                userId: userId,
                available: available,
            });
            res.send([{ success: "Your post updated!" }]);
        }
    } catch (err) {
        console.error(err.message);
    }
};

const postPost = async function (req, res) {
    try {
        const { description, userId, available } = req.body;

        if (req.body.dataImg) {
            const fileName = recordFile(req.body.dataImg, "images/post");

            await db(postsTable).insert({
                description: description,
                userId: userId,
                available: available,
                postImg: fileName,
            });

            res.send("Your post added");
        } else {
            await db(postsTable).insert({
                description: description,
                userId: userId,
                available: available,
            });
            res.send("Your post added");
        }
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = {
    getPosts,
    getOnePost,
    delOnePosts,
    putOnePosts,
    postPost,
};
