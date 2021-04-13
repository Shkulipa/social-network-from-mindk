"use strict";
const express = require("express");
const router = express.Router();
const db = require("../db/db");

router.post("/", async (req, res) => {
    try {
        const { refreshToken } = req.body;
        await db("users")
            .where({ userToken: refreshToken })
            .update({ userToken: null });

        res.status(200).send();
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
