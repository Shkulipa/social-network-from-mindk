"use strict";
const express = require("express");
let router = express.Router();
const db = require('../db/db');

router
    .post("/", async (req, res) =>{
        try {
            const {refreshToken} = req.body;
            await db('users').where({ user_token: refreshToken }).update({ user_token: null });

            res.status(200).send();
        } catch (err) {
            console.log(err);
        }
    })


module.exports = router;