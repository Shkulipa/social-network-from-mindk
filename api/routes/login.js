"use strict";
const express = require("express");
let router = express.Router();
const db = require('../db/db');
const passport = require('../services/auth/passport');
const jwt = require('jsonwebtoken');
const {v4: uuidv4 } = require('uuid');
const fetch = require('node-fetch');

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
                usernameField: 'user_email',
                passwordField: 'user_password',
                session: false,
            },
            async (err, user, trace) => {
                if (err || !user) {
                    throw new Error(trace.message || 'Authentication error');
                }
                // Generate token for user and actualize:
                const jwtToken = jwt.sign(user, process.env.JWT_SECRET, {
                    expiresIn: '1d',
                    audience: process.env.HOST,
                });

                res.send(await db('users').where({ user_id: user.user_id }).update({ user_token: jwtToken }, ['user_token']));
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

                const jwtToken = jwt.sign(user, process.env.JWT_SECRET, {
                    expiresIn: '1d',
                    audience: process.env.HOST,
                });

                res.send({ user_token: jwtToken });
            },
        )(req, res),
    )

    .post('/social/facebook', async (req, res) =>{
        try {
            const {accessToken, userID} = req.body;
            const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;
            const data = await fetch(URL).then(res => res.json()).then(res => {return res})


            // Generate token for user and actualize:
            const jwtToken = jwt.sign(data, process.env.JWT_SECRET, {
                expiresIn: '1d',
                audience: process.env.HOST,
            });

            res.send({ user_token: jwtToken });
        } catch (err) {
            console.log(err);
        }
    })


module.exports = router;