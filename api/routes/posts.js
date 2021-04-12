"use strict";
const express = require("express");
const router = express.Router();
const db = require('../db/db');
const {recordFile} = require("../functions/functions");
const checkACL = require('../middleware/acl').checkACL;
const validator = require('../middleware/validator').validator;
const moment = require('moment');

router
    .get("/:id", async (req, res) => {
        try {
            const id = req.params.id;

            res.send(await db.select('avatar_img', 'name_user', 'users.user_id',
                'available', 'post_img', 'description', 'post_id', 'date')
                .from('posts').join('users', function() {
                    this.on
                    ('posts.user_id', '=', 'users.user_id')
                }).where('post_id', Number(id)).first());
        } catch(err) {
            console.error(err.message)
        }
    })

    .get("/", async (req, res) => {
        try {
            const limit = req.query.limit || 7;
            const offset = (req.query.page - 1) * limit || 0;

            const query = await db.select('avatar_img', 'name_user', 'users.user_id',
                'available', 'post_img', 'description', 'post_id', 'date')
                .from('posts').limit(limit).offset(offset)
                .join('users', function() {
                    this.on
                    ('posts.user_id', '=', 'users.user_id')
                })
                .orderBy('post_id', 'desc');
            const [{count}] = await db.count().from('posts');

            res.send({data: query, count: count});
        } catch(err) {
            console.error(err.message)
        }
    })

    .delete("/delete/:id", [checkACL([
        {
            permission: 'deleteAnyPost'
        },
        {
            permission: 'deleteOwnPost',
            checkAuthor: true,
            table: 'posts',
            column: 'post_id',
        },
    ]), async (req, res) => {
        try {
            await db('posts').where('post_id', req.params.id).del()
            res.send('post deleted');
        } catch(err) {
            console.error(err.message);
        }
    }])

    .put("/update/:id",
        checkACL([
            {
                permission: 'updateAnyPost'
            },
            {
                permission: 'updateOwnPost',
                checkAuthor: true,
                table: 'posts',
                column: 'post_id',
            },
        ]),
        validator({
            description: ['required', 'max:880'],
            available: ['required'],
            dataImg: ['size:10000000', 'max:255', 'type:image/png||image/jpg||image/jpeg']
        }),
        async (req, res) => {
        try {
            const {description, user_id, available} = req.body;
            if(req.body.dataImg) {
                const fileName = recordFile(req.body.dataImg, 'images/posts');

                await db('posts').where('post_id', req.params.id).update({ description: description, user_id: user_id, available: available, post_img: fileName})
                res.send([{success: 'Your post updated!'}]);
            } else {
                await db('posts').where('post_id', req.params.id).update({ description: description, user_id: user_id, available: available})
                res.send([{success: 'Your post updated!'}]);
            }
        } catch(err) {
            console.error(err.message);
        }
    })

    .post("/",
        validator({
            description: ['required', 'max:880'],
            available: ['required'],
            dataImg: ['size:10000000', 'max:255', 'type:image/png||image/jpg||image/jpeg']
        }),
        async function (req, res) {
            try {
                const {description, user_id, available} = req.body;
                const nowDate = moment().format('MMMM Do YYYY, h:mm:ss a');

                if(req.body.dataImg) {
                    const fileName = recordFile(req.body.dataImg, 'images/post');

                    await db('posts').insert({description: description, user_id: user_id, available: available, post_img: fileName, date: nowDate});

                    res.send('Your post added');
                } else {
                    await db('posts').insert({description: description, user_id: user_id, available: available, date: nowDate});
                    res.send('Your post added');
                }
            } catch(err) {
                console.error(err.message);
            }
    })

module.exports = router;