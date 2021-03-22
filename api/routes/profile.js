"use strict";
const express = require("express");
const router = express.Router();
const db = require('../db/db');
const multer  = require('multer');
const upload = multer({dest: 'images/avatars'});

/*var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/avatars')
    },
    filename: function (req, file, cb) {
        const typeImg = file.mimetype.split('/')[1];
        cb(null, file.fieldname + '-' + Date.now() + '.' + typeImg);
    }
})*/

// var upload = multer({ storage: storage })

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
        const {filename} = req.file;
        const {user_id} = req.body;

        try {
            await db('users').where('user_id', user_id).update({ avatar_img: filename })
            res.sendStatus(200);
        } catch(err) {
            console.error(err.message);
        }
    })

module.exports = router;