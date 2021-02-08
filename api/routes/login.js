"use strict";
const express = require("express");
let router = express.Router();
const db = require('../db/db');
const passport = require('../services/auth/passport');
const jwt = require('jsonwebtoken');
const {v4: uuidv4 } = require('uuid');
const User = require('../models/user');

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


                res.send({ user_token: jwtToken });
            },
        )(req, res),
    )


module.exports = router;