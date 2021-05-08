"use strict";
const express = require("express");
const router = express.Router();
const checkACL = require("../middleware/acl").checkACL;
const validator = require("../middleware/validator").validator;
const commentsController = require("../controllers/comments");

const commentTable = "commentsForPosts";
const commentTableCommentId = "commentId";

router
    .get("/", commentsController.getComments)

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
        validator({
            comment: ["required", "max:255"],
        }),
        commentsController.getComments
    );
module.exports = router;
