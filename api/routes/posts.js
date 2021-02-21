"use strict";
const express = require("express");
const router = express.Router();
const db = require('../db/db');
const checkAuthPosts = require('../middleware/acl').checkAuthPosts;
const checkAuthAddPosts = require('../middleware/acl').checkAuthAddPosts;

router
    .get("/:id", async (req, res) => {
        try {
            const id = req.params.id;
            res.send(await db.select().from('posts').where('post_id', id).orderBy('post_id', 'desc'));
        } catch(err) {
            console.error(err.message)
        }
    })

    .get("/", async (req, res) => {
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

    .delete("/delete/:id", [checkAuthPosts([
        {
            permission: 'deleteAnyPost'
        },
        {
            permission: 'deleteOwnPost',
            checkAuthor: true,
            table: 'posts',
            column: 'post_id',
        },
    ]), async (req, res, next) => {
        try {
            await db('posts').where('post_id', req.params.id).del()
            res.send('post deleted');
        } catch(err) {
            console.error(err.message);
        }
    }])

    .put("/update/:id", [checkAuthPosts([
        {
            permission: 'UpdateAnyPost'
        },
        {
            permission: 'UpdateOwnPost',
            checkAuthor: true,
            table: 'posts',
            column: 'post_id',
        },
    ]), async (req, res, next) => {
        try {
            await db('posts').where('post_id', req.params.id).update({ description: req.body.text })
            res.send('post deleted');
        } catch(err) {
            console.error(err.message);
        }
    }])

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

    .post("/",[checkAuthAddPosts([
        {
            permission: 'postPost',
        },
        ]), async (req, res, next) => {
        try {
            const description = req.body.description;
            const user_id = req.user.user_id;
            const newPost = await db('posts').insert({description: description, user_id: user_id});
            res.send('post added');
        } catch(err) {
            console.error(err.message)
        }
    }])

module.exports = router;