"use strict";
const express = require("express");
let router = express.Router();
const pool = require("../db/db");

router
    .get("/", async (req, res) => {
        res.render('register.ejs');
    })

    .post("/", async (req, res) => {
        try {
            const name_user  = req.body.name;
            const email_user  = req.body.email;
            const password  = req.body.password;

            const registerUser = await pool.query("SELECT * FROM users");

            if( (registerUser.rows).findIndex(el => el.email_user == email_user) > -1 ) {
                console.log('такой емейл уже занят');
            } else {
                await pool.query("INSERT INTO users (name_user, email_user, password_user) VALUES ($1, $2, $3)", [name_user, email_user, password]);
                res.redirect('login');
            }
        } catch(err) {
            res.redirect('register');
            console.error(err.message)
        }
    })

module.exports = router;