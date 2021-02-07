"use strict";
const express = require("express");
let router = express.Router();
const db = require('../db/db');

router
    .get("/", async (req, res) => {
        try {
            res.send(await db.select().from('users').orderBy('post_id', 'desc'));
        } catch(err) {
            console.error(err.message)
        }
    })

    .post("/", async (req, res) => {
        try {
            const name_user  = req.body.name;
            const email_user  = req.body.email;
            const password_user  = req.body.password;

            const check_user = await db.select().from('users').where('email_user', email_user).orderBy('user_id', 'desc');

            if( check_user.findIndex(el => el.email_user == email_user) > -1 ) {
                throw new Error('такой емейл уже занят');
            } else {
                const new_user = await db('users').insert({name_user: name_user, email_user: email_user, password_user: password_user});

                res.send(new_user);
            }
        } catch(err) {
            console.error(err.message)
        }
    })

module.exports = router;