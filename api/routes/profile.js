"use strict";
const express = require("express");
const router = express.Router();
const db = require('../db/db');
const multer  = require('multer');
const upload = multer({dest: 'images/avatars'});

router
    .post("/search", async (req, res) => {
        try {
            const { user_id } = req.body;
            res.send(await db.select().from('users').where('user_id', Number(user_id) ));
        } catch(err) {
            console.error(err.message)
        }
    })


    .post("/", upload.single('avatar-img'), async function (req, res, next) {
        const {filename, mimetype} = req.file;
        const {user_id} = req.body;

        const typeImg = mimetype.split('/')[1];

        try {
            await db('users').where('user_id', user_id).update({ avatar_img: filename + '.' + typeImg })
        } catch(err) {
            console.error(err.message);
        }
    })

module.exports = router;