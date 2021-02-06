"use strict";
const express = require("express");
let router = express.Router();
const pool = require("../db/db");

router
    .get("/", async (req, res) => {
        res.render('login.ejs');
    })

    .post("/", async (req, res) => {
        try {
            const email_user  = req.body.email;
            const password  = req.body.password;

            const checkLogin = await pool.query("SELECT * FROM users WHERE email_user=$1 AND password_user=$2", [email_user, password]);

            if( checkLogin.rows.length > 0) {
                res.redirect('profile');
            } else {
                res.redirect('login');
                console.log('такого юзера не существует')
            }
        } catch(err) {
            res.redirect('register');
            console.error(err.message)
        }
    })


module.exports = router;