"use strict";
const express = require("express");
const router = express.Router();
const checkACL = require("../middleware/acl").checkACL;
const validator = require("../middleware/validator").validator;
const postsController = require("../controllers/posts");

const postsTable = "posts";
const postsTablePostId = "postId";

router
    .get("/", postsController.getPosts)

    .get("/:id", postsController.getOnePost)

    .delete(
        "/delete/:id",
        checkACL([
            {
                permission: "deleteAnyPost",
            },
            {
                permission: "deleteOwnPost",
                checkAuthor: true,
                table: postsTable,
                column: postsTablePostId,
            },
        ]),
        postsController.delOnePosts
    )

    .put(
        "/update/:id",
        checkACL([
            {
                permission: "updateAnyPost",
            },
            {
                permission: "updateOwnPost",
                checkAuthor: true,
                table: postsTable,
                column: postsTablePostId,
            },
        ]),
        validator({
            description: ["required", "max:880"],
            available: ["required"],
            dataImg: [
                "size:10000000",
                "max:255",
                "type:image/png||image/jpg||image/jpeg",
            ],
        }),
        postsController.putOnePosts
    )

    .post(
        "/",
        validator({
            description: ["required", "max:880"],
            available: ["required"],
            dataImg: [
                "size:10000000",
                "max:255",
                "type:image/png||image/jpg||image/jpeg",
            ],
        }),
        postsController.postPost
    );

module.exports = router;
