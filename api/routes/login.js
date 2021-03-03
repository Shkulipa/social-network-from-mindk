"use strict";
const express = require("express");
let router = express.Router();
const db = require('../db/db');
const passport = require('../services/auth/passport');
const jwt = require('jsonwebtoken');
const {v4: uuidv4 } = require('uuid');
const User = require('../models/user');
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
                // res.send({ user_token: jwtToken });
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

                // @TODO: Match Google to system user and get appropriate one from DB [...]
                const jwtToken = jwt.sign(user, process.env.JWT_SECRET, {
                    expiresIn: '1d',
                    audience: process.env.HOST,
                });

                res.send({ user_token: jwtToken });
            },
        )(req, res),
    )

/*    .get('/auth/facebook',
        passport.authenticate(
            'facebook',
            {
            scope: ['public_profile', 'email']
            }
        )
    )

    .get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/error'
        })
    )*/

/*    .get('/auth/facebook',
        passport.authenticate('facebook'))

    .get('/auth/facebook/callback', (req, res) =>
        passport.authenticate(
            'facebook',
            {
                failureRedirect: '/login'
            },
            async (err, user, trace) => {
                if (err || !user) {
                    throw new Error(trace.message || 'Authentication error');
                }

                // @TODO: Match Google to system user and get appropriate one from DB [...]
                const jwtToken = jwt.sign(user, process.env.JWT_SECRET, {
                    expiresIn: '1d',
                    audience: process.env.HOST,
                });

                res.send({ user_token: jwtToken });
            },
            )(req, res),
        )*/

    // .get('/auth/facebook/callback', (req, res) =>
    //     passport.authenticate(
    //         'facebook',
    //         {
    //             failureRedirect: '/login'
    //         },
    //         async (err, user, trace) => {
    //             if (err || !user) {
    //                 throw new Error(trace.message || 'Authentication error');
    //             }
    //
    //             // @TODO: Match Google to system user and get appropriate one from DB [...]
    //             const jwtToken = jwt.sign(user, process.env.JWT_SECRET, {
    //                 expiresIn: '1d',
    //                 audience: process.env.HOST,
    //             });
    //             console.log(user);
    //             res.send({ user_token: jwtToken });
    //         },
    //     )(req, res),
    // )
    //
    // .post('/social/facebook', (req, res) =>
    //     passport.authenticate(
    //         'facebook',
    //         {
    //             failureRedirect: '/login',
    //             clientID: '243090580632360',
    //             clientSecret: '47bcee4e452de4a4fdcefa921004528c',
    //             callbackURL: "http://localhost:3000/login/auth/facebook/callback"
    //         },
    //         async (err, user, trace) => {
    //             if (err || !user) {
    //                 throw new Error(trace.message || 'Authentication error');
    //             }
    //
    //             // @TODO: Match Google to system user and get appropriate one from DB [...]
    //             const jwtToken = jwt.sign(user, process.env.JWT_SECRET, {
    //                 expiresIn: '1d',
    //                 audience: process.env.HOST,
    //             });
    //
    //             res.send({ user_token: jwtToken });
    //         },
    //     )(req, res),
    // )

    .post('/social/facebook', async (req, res) =>{
        try {
            const {accessToken, userID} = req.body;
            const id = '1361134677569483';
            const acces_token = 'EAADdFuZB08ygBAFjXYyLkQPGMPiOP8t3jBIXcqRDrzBOBhCZBd4DQomJWk4ZAhLQBxiWRZCoPVCtwtEjWqdZAbyCe7iBflLAOIp7BrmYWxphKdK1cdv2egy5WFpBL90newpv7g6u1FJ7OxDWHiuY5uompE3eP6SCiVffrIjpRhLLKgueNCHi0q1x0ZBqGhasnjl9hMtyo33qCaIV7n50G0';
            // const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;
            const URL = `https://graph.facebook.com/v2.9/${id}/?fields=id,name,email,picture&access_token=${acces_token}`;
            const data = await fetch(URL).then(res => res.json()).then(res => {return res})

            //проверяем есть ли уже юзер по емейлу , если нету то регистрируем
            console.log(data);


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