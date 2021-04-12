"use strict";
const express = require("express");
let router = express.Router();
const db = require('../db/db');
const jwt = require('jsonwebtoken');
const {generateTokens} = require("../functions/functions");

router
    .post("/", async (req, res) =>{
        try {
            const {refreshToken} = req.body;

            const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);
            const getUser = await db('users').where({ user_id: payload.user_id })

            const {user_id, name_user, permission} = getUser[0];
            const user = {
                user_id,
                name_user,
                permission
            }

            // Generate token for user:
            const tokens = await generateTokens(user);

            await db('users').where({ user_token: refreshToken }).update({ user_token: tokens.refresh.token });
            const userInfo = await db.select(
                'users.user_id', 'name_user', 'email_user', 'user_token', 'permission',
                'avatar_img', 'phone', 'university', 'university', 'name_available',
                'email_available', 'phone_available', 'university_available'
            ).from('users')
                .join('users_info_available', function() {
                    this.on
                    ('users_info_available.user_id', '=', 'users.user_id')
                })
                .where('user_token', tokens.refresh.token ).first();

            res.send({userInfo, tokens});
        } catch (err) {
            console.log(err);
        }
    })


module.exports = router;