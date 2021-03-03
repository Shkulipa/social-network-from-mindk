"use strict";
const express = require("express");
const router = express.Router();
const db = require('../db/db');
const checkAuthorizedPosts = require('../middleware/acl').checkAuthorizedPosts;
const checkAuthPostsUpdate = require('../middleware/acl').checkAuthPostsUpdate;
const checkAuthUser = require('../middleware/acl').checkAuthUser;

router
    .get("/:id", async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        try {
            const id = req.params.id;
            res.send(await db.select().from('posts').where('post_id', id).orderBy('post_id', 'desc'));
        } catch(err) {
            console.error(err.message)
        }
    })

    .get("/", async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        try {
            res.send(await db.select().from('posts').orderBy('post_id', 'desc'));
        } catch(err) {
            console.error(err.message)
        }
    })

    /*.delete("/delete/:id", [checkAuth([
        {
            permission: 'deleteOwnPost'
        },
    ]), async (req, res, next) => {
        try {
            const req_db = await db('posts').select().from('posts').where('post_id', req.params.id);

            if (req_db.length > 0) {
                const post_user_id = req_db[0].user_id;
                const user_id =  req.user.user_id;

                if(post_user_id == user_id) {
                    res.send(await db('posts').where('post_id', req.params.id).del(), res.json('post deleted'));
                } else {
                    res.json('you haven\'t access for delete this post')
                }
            } else {
                res.json('post didn\'t found')
            }

        } catch(err) {
            console.error(err.message)
        }
    }])*/

    .delete("/delete/:id", [checkAuthorizedPosts([
        {
            permission: 'deleteAnyPost'
        },
        {
            permission: 'deleteOwnPost',
            checkAuthor: true
        },
    ])])

    .put("/update/:id", [checkAuthPostsUpdate([
        {
            permission: 'UpdateAnyPost'
        },
        {
            permission: 'UpdateOwnPost',
            checkAuthor: true
        },
    ])])

    /*.put("/update/:id", [checkAuth([
        {
            permission: 'updateOwnPost'
        },
    ]), async (req, res, next) => {
        try {
            const req_db = await db('posts').select().from('posts').where('post_id', req.params.id);

            if (req_db.length > 0) {
                const post_user_id = req_db[0].user_id;
                const user_id =  req.user.user_id;

                if(post_user_id == user_id) {
                    res.send(await db('posts').where('post_id', req.params.id).update({ description: req.body.text }), res.json('post success updated'));
                } else {
                    res.json('you can\'t update this post, you haven\'t access')
                }
            } else {
                res.json('post didn\'t found')
            }
        } catch(err) {
            console.error(err.message)
        }
    }])*/

    /*.post("/",[checkAuthUser([
        {
            permission: 'postPost'
        },
        ]), async (req, res, next) => {
        try {
            const description = req.body.description;
            const user_id = req.user.user_id;
            const newPost = await db('posts').insert({description: description, user_id: user_id});
            res.send(newPost, next('post added'));
        } catch(err) {
            console.error(err.message)
        }
    }])*/

    .post("/", checkAuthUser);

module.exports = router;