"use strict";
const express = require("express");
let router = express.Router();
const pool = require("../db/db");

router
    .get("/", async (req, res) => {
        res.render('profile.ejs');
    })

module.exports = router;