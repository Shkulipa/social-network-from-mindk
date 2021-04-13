"use strict";
const express = require("express");
const router = express.Router();
const db = require("../db/db");
const jwt = require("jsonwebtoken");
const { generateTokens } = require("../functions/functions");

router.post("/", async (req, res) => {
    try {
        const { refreshToken } = req.body;

        const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const getUser = await db("users").where({ userId: payload.userId });

        const { userId, nameUser, permission } = getUser[0];
        const user = {
            userId,
            nameUser,
            permission,
        };

        // Generate token for user:
        const tokens = await generateTokens(user);

        await db("users")
            .where({ userToken: refreshToken })
            .update({ userToken: tokens.refresh.token });
        const userInfo = await db
            .select(
                "users.userId",
                "nameUser",
                "emailUser",
                "userToken",
                "permission",
                "avatarImg",
                "phone",
                "university",
                "university",
                "nameAvailable",
                "emailAvailable",
                "phoneAvailable",
                "universityAvailable"
            )
            .from("users")
            .join("usersInfoAvailable", function () {
                this.on("usersInfoAvailable.userId", "=", "users.userId");
            })
            .where("userToken", tokens.refresh.token)
            .first();

        res.send({ userInfo, tokens });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
