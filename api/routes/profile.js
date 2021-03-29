"use strict";
const express = require("express");
const router = express.Router();
const db = require('../db/db');
const {recordFile} = require("../functions/functions");
const {validator} = require("../middleware/validator");

router
    .get("/:id", async (req, res) => {
        try {
            const id = req.params.id;
            res.send(await db.select().from('users').join('users_info_available', function() {
                this.on
                ('users.user_id', '=', Number(id))
            }))

        } catch(err) {
            console.error(err.message)
        }
    })

    .put("/update/:id",
        validator({
            user_id: ['required', 'max:5'],
            user_id_available: ['required', 'max:10'],

            name: ['required', 'max:255'],
            name_available: ['required', 'max:10'],

            email:  ['required', 'max:255'],
            email_available: ['required', 'max:10'],

            phone: ['required', 'max:13'],
            phone_available: ['required', 'max:10'],

            university: ['max:99'],
            university_available: ['required', 'max:10'],

            dataImg: ['size:10000000', 'max:255', 'type:image/png||image/jpg||image/jpeg']
        }),
        async (req, res) => {
            try {
                const {user_id, email, phone, university, name} = req.body;
                const {name_available, email_available, phone_available, university_available} = req.body;

                if(req.body.dataImg) {
                    const fileName = recordFile(req.body.dataImg, 'images/avatars');

                    await db('users').where('user_id', user_id).update({ name_user: name, email_user: email, phone: phone, avatar_img: fileName, university: university})
                    await db('users_info_available').where('user_id', user_id).update({ name_available: name_available, email_available: email_available, phone_available: phone_available, university_available: university_available})
                    res.status(200);
                } else {
                    await db('users').where('user_id', user_id).update({ name_user: name, email_user: email, phone: phone, university: university})
                    res.status(200);
                }
            } catch(err) {
                console.error(err.message);
            }
        })



    .post("/search", async (req, res) => {
        try {
            const { user_id } = req.body;
            res.send(await db.select().from('users').where('user_id', Number(user_id) ));
        } catch(err) {
            console.error(err.message)
        }
    })

module.exports = router;