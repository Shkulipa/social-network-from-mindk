"use strict";
const express = require("express");
let router = express.Router();
const db = require('../db/db');
const passport = require('../services/auth/passport');
const {v4: uuidv4 } = require('uuid');
const fetch = require('node-fetch');
const {generateTokens} = require("../functions/functions");

router
    .get("/", async (req, res) => {
        try {
            res.send(await db.select().from('users').orderBy('user_id', 'desc'));
        } catch(err) {
            console.error(err.message)
        }
    })

    .post("/", async (req, res) =>
        passport.authenticate(
            'local',
            {
                usernameField: 'email',
                passwordField: 'password',
                session: false,
            },
            async (err, user, trace) => {
                if (err || !user) {
                    return res.send(trace);
                }

                // Generate token for user:
                const tokens = await generateTokens(user);

                //update and get user data
                await db('users').where({ user_id: user.user_id }).update({ user_token:  tokens.refresh.token });
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
            },
        )(req, res)
    )

    .post('/social/google', (req, res) =>
        passport.authenticate(
            'google',
            {
                scope: ['email', 'profile'],
            },
            async (err, user, trace) => {
                if (err || !user) {
                    throw new Error(trace.message || 'Authentication error');
                }
                // Generate tokens for user:
                const tokens = await generateTokens(user);
                await db('users').where({ user_id: user.user_id }).update({ user_token:  tokens.refresh.token });

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
            },
        )(req, res),
    )

    .post('/social/facebook',
        async (req, res) => {
        try {
            const {accessToken} = req.body._token;
            const {id} = req.body._profile;
            const URL = `https://graph.facebook.com/v2.9/${id}/?fields=id,name,email,picture&access_token=${accessToken}`;
            const {name, email} = await fetch(URL).then(res => res.json()).then(res => {return res})

            const user = await db.select().from('users').where({email_user: email}).first();

            if(user) {
                const tokens = await generateTokens({user_id: user.user_id, name_user: user.name_user, permission: user.permission});

                await db('users').where({ user_id: user.user_id }).update({ user_token:  tokens.refresh.token });

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

                return res.send({userInfo, tokens});
            } else {
                const addNewUser = await db('users').insert({
                    name_user: name,
                    email_user: email,
                    reg_type: 'social',
                    permission: ['deleteOwnPost','updateOwnPost','postPost', 'updateOwnProfile', 'addNewPost']
                }).returning('user_id');

                const idNewUser = addNewUser[0];

                await db('users_info_available').insert({
                    user_id: idNewUser,
                    name_available: 'All',
                    email_available: 'All',
                    phone_available: 'All',
                    university_available: 'All'
                });

                const newUser = await db.select().from('users').where('user_id', idNewUser ).first();
                const tokens = await generateTokens({user_id: newUser.user_id, name_user: newUser.name_user, permission: newUser.permission});

                await db('users').where({ user_id: newUser.user_id }).update({ user_token:  tokens.refresh.token });

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

                return res.send({userInfo, tokens});
            }
        } catch (err) {
            console.log(err);
        }
    })


module.exports = router;