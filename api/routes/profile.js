"use strict";
const express = require("express");
const router = express.Router();
const db = require('../db/db');
const {checkACL} = require("../middleware/acl");
const {recordFile} = require("../functions/functions");
const {validator} = require("../middleware/validator");

router
    .post("/:id", async (req, res) => {
        try {
            const id = req.params.id;
            const {userLoginId} = req.body;

            //get Data viewed user
            const data = await db.select(
                'users.name_user','users.email_user','users.avatar_img','users.phone','users.university',
                'users_info_available.name_available', 'users_info_available.email_available',
                'users_info_available.phone_available', 'users_info_available.university_available'
            ).from('users').join('users_info_available', function() {
                this.on
                ('users.user_id', '=', 'users_info_available.user_id')
            }).where('users.user_id', id).limit(1);

            //Fields for check for : All, Friends, Only me
            const CheckFields = ['name_user', 'email_user', 'phone', 'university'];
            const availableFields = {
                name_user: data[0].name_available,
                email_user:  data[0].email_available,
                phone:  data[0].phone_available,
                university: data[0].university_available
            }

            //check logged in user
            if(userLoginId !== 'not auth') {
                //if viewed user === logged in user
                if(parseInt(userLoginId, 10) !== parseInt(id, 10)) {
                    let newObj = new Object();
                    newObj.avatar_img = data[0]['avatar_img'];

                    for (let key in data[0]) {
                        if(CheckFields.includes(key)) {
                            if(availableFields[key] === 'All') {
                                newObj[key] = data[0][key];
                            } else if (availableFields[key] === 'Friends') {
                                const checkFriend = await db.select().from('friends').where(function() {
                                    this.where('from_user_id', id).andWhere('to_user_id', userLoginId)
                                }).orWhere(function() {
                                        this.where('from_user_id', userLoginId).andWhere('to_user_id', id)
                                    }
                                ).andWhere(function() {
                                    this.where('approve', true)
                                }).limit(1);

                                if(checkFriend.length > 0) {
                                    if(checkFriend[0].approve) {
                                        newObj[key] = data[0][key];
                                    }
                                }
                            }
                        }
                    }
                    res.send(newObj);
                } else { //if viewed user !== logged in user
                    let newObj = new Object();
                    newObj.avatar_img = data[0]['avatar_img'];

                    for (let key in data[0]) {
                        if(CheckFields.includes(key)) {
                            newObj[key] = data[0][key];
                        }
                    }

                    res.send(newObj);
                }
            } else { //For not logged in user
                let newObj = new Object();
                newObj.avatar_img = data[0]['avatar_img'];

                for (let key in data[0]) {
                    if(CheckFields.includes(key)) {
                        if(availableFields[key] === 'All') {
                            newObj[key] = data[0][key];
                        }
                    }
                }
                res.send(newObj);
            }
        } catch(err) {
            console.error(err.message)
        }
    })

    .put("/update/:id",
        checkACL([
            {
                permission: 'updateOwnProfile',
                checkAuthor: true,
                table: 'users',
                column: 'user_id',
            },
        ]),
        validator({
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

                    res.send([{success: 'Your profile updated!'}]);
                } else {
                    await db('users').where('user_id', user_id).update({ name_user: name, email_user: email, phone: phone, university: university})
                    await db('users_info_available').where('user_id', user_id).update({ name_available: name_available, email_available: email_available, phone_available: phone_available, university_available: university_available})
                    res.send([{success: 'Your profile updated!'}]);
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