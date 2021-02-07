"use strict";
const express = require("express");
let router = express.Router();
const db = require('../db/db');
const passport = require('../services/auth/passport');
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
                user.user_token = uuidv4();
                await User.saveUser(user);
                res.send({ user_token: user.user_token });
            },
        )(req, res),
    )


module.exports = router;