"use strict";
const express = require("express");
const router = express.Router();
const db = require('../db/db');
const checkACL = require('../middleware/acl').checkACL;
const validator = require('../middleware/validator').validator;

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

    .delete("/delete/:id", [checkACL([
        {
            permission: 'deleteAnyPost'
        },
        {
            permission: 'deleteOwnPost',
            checkAuthor: true,
            table: 'posts',
            column: 'user_id',
        },
    ]), async (req, res, next) => {
        try {
            await db('posts').where('post_id', req.params.id).del()
            res.send('post deleted');
        } catch(err) {
            console.error(err.message);
        }
    }])

    .put("/update/:id",
        validator({
            user_idPost: ['required', 'max:5'],
            description: ['required', 'max:880'],
            available: ['required'],
        }),
        async (req, res, next) => {
        try {
            await db('posts').where('post_id', req.params.id).update({ description: req.body.description })
            res.send('post updated');
        } catch(err) {
            console.error(err.message);
        }
    })

    .post("/",
        validator({
            user_id: ['required', 'max:5'],
            description: ['required', 'max:880'],
            available: ['required'],
        }),
        async (req, res) => {
            try {
                const description = req.body.description;
                const user_id = req.body.user_id;
                await db('posts').insert({description: description, user_id: user_id});

                res.send('post added');
            } catch (err) {
                console.error(err.message)
            }
        })

module.exports = router;