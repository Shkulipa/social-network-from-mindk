"use strict";
const express = require("express");
const router = express.Router();
const db = require("../db/db");
const checkACL = require("../middleware/acl").checkACL;
const validator = require("../middleware/validator").validator;

const commentTable = "commentsForPosts";
const commentTableCommentId = "commentId";

router
    .post(
        "/",
        checkACL([
            {
                permission: "addComment",
            },
        ]),
        validator({
            comment: ["required", "max:255"],
        }),
        async function (req, res) {
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
        }
    )

    .get("/", async function (req, res) {
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
    })

    .put(
        "/update/:id",
        checkACL([
            {
                permission: "updateAnyComment",
            },
            {
                permission: "updateOwnComment",
                checkAuthor: true,
                table: commentTable,
                column: commentTableCommentId,
            },
        ]),
        async function (req, res) {
            try {
                const { comment } = req.body;
                await db(commentTable)
                    .where("commentId", req.params.id)
                    .update({
                        comment: comment,
                    });
                res.send([{ success: "Your comment updated!" }]);
            } catch (err) {
                console.error(err.message);
            }
        }
    )

    .delete("/delete/:id", [
        checkACL([
            {
                permission: "deleteAnyComment",
            },
            {
                permission: "deleteOwnComment",
                checkAuthor: true,
                table: commentTable,
                column: commentTableCommentId,
            },
        ]),
        async (req, res) => {
            try {
                console.log(req.body);
                await db(commentTable)
                    .where(commentTableCommentId, req.params.id)
                    .del();
                res.send("Comment deleted");
            } catch (err) {
                console.error(err.message);
            }
        },
    ]);

module.exports = router;
