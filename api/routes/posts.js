"use strict";
const express = require("express");
const router = express.Router();
const db = require('../db/db');
const checkACL = require('../middleware/acl').checkACL;
const validator = require('../middleware/validator').validator;
const multer  = require('multer');
/*const upload = multer({ storage: multer.memoryStorage({}) });
const fs = require('fs');*/
const upload = multer({dest: 'images/posts'});

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
            const limit = req.query.limit || 7;
            const offset = (req.query.page - 1) * limit || 0;

            const query = await db.select().from('posts').limit(limit).offset(offset).orderBy('post_id', 'desc');
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

    /*.post("/",
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
    })*/

    .post("/",
        upload.single('fileToUpload'),
        async function (req, res, next) {
            try {
                console.log('req.file:', req.file);
                console.log('req.body:', req.body);
            } catch(err) {
                console.error(err.message);
            }

            // req.file is the fileToUpload file
            // req.body will hold the text fields, if there were any
    })

    /*.post("/", upload.single('avatar-img'), async function (req, res, next) {
        const {filename} = req.file;
        const {user_id} = req.body;

        try {
            await db('users').where('user_id', user_id).update({ avatar_img: filename })
            res.sendStatus(200);
        } catch(err) {
            console.error(err.message);
        }
    })*/





module.exports = router;