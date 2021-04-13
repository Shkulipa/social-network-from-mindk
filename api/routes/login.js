"use strict";
const express = require("express");
const router = express.Router();
const db = require("../db/db");
const passport = require("../services/auth/passport");
const fetch = require("node-fetch");
const { selectDataUser } = require("../functions/functions");
const { generateTokens } = require("../functions/functions");

router
    .get("/", async (req, res) => {
        try {
            res.send(await db.select().from("users").orderBy("userId", "desc"));
        } catch (err) {
            console.error(err.message);
        }
    })

    .post("/", async (req, res) =>
        passport.authenticate(
            "local",
            {
                usernameField: "email",
                passwordField: "password",
                session: false,
            },
            async (err, user, trace) => {
                if (err || !user) {
                    return res.send(trace);
                }

                // Generate token for user:
                const tokens = await generateTokens(user);

                // update and get user data
                await db("users")
                    .where({ userId: user.userId })
                    .update({ userToken: tokens.refresh.token });
                const userInfo = await selectDataUser(tokens.refresh.token);

                res.send({ userInfo, tokens });
            }
        )(req, res)
    )

    .post("/social/google", (req, res) =>
        passport.authenticate(
            "google",
            {
                scope: ["email", "profile"],
            },
            async (err, user, trace) => {
                if (err || !user) {
                    throw new Error(trace.message || "Authentication error");
                }
                // Generate tokens for user:
                const tokens = await generateTokens(user);
                await db("users")
                    .where({ userId: user.userId })
                    .update({ userToken: tokens.refresh.token });

                const userInfo = await selectDataUser(tokens.refresh.token);

                res.send({ userInfo, tokens });
            }
        )(req, res)
    )

    .post("/social/facebook", async (req, res) => {
        try {
            /**
             * @param {{_token:string}} token of user
             */
            const { accessToken } = req.body._token;
            /**
             * @param {{_profile:object}} data of user
             */
            const { id } = req.body._profile;
            const URL = `https://graph.facebook.com/v2.9/${id}/?fields=id,name,email,picture&access_token=${accessToken}`;
            const { name, email } = await fetch(URL)
                .then((res) => res.json())
                .then((res) => {
                    return res;
                });

            const user = await db
                .select()
                .from("users")
                .where({ emailUser: email })
                .first();

            if (user) {
                const tokens = await generateTokens({
                    userId: user.userId,
                    nameUser: user.nameUser,
                    permission: user.permission,
                });

                await db("users")
                    /**
                     * @param {{userId:number}} data
                     */
                    .where({ userId: user.userId })
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
                        this.on(
                            "usersInfoAvailable.userId",
                            "=",
                            "users.userId"
                        );
                    })
                    .where("userToken", tokens.refresh.token)
                    .first();

                return res.send({ userInfo, tokens });
            } else {
                const addNewUser = await db("users")
                    .insert({
                        nameUser: name,
                        emailUser: email,
                        regType: "social",
                        permission: [
                            "deleteOwnPost",
                            "updateOwnPost",
                            "postPost",
                            "updateOwnProfile",
                            "addNewPost",
                        ],
                    })
                    .returning("userId");

                const idNewUser = addNewUser[0];

                await db("usersInfoAvailable").insert({
                    userId: idNewUser,
                    nameAvailable: "All",
                    emailAvailable: "All",
                    phoneAvailable: "All",
                    universityAvailable: "All",
                });

                const newUser = await db
                    .select()
                    .from("users")
                    .where("userId", idNewUser)
                    .first();
                const tokens = await generateTokens({
                    userId: newUser.userId,
                    nameUser: newUser.nameUser,
                    permission: newUser.permission,
                });

                await db("users")
                    .where({ userId: newUser.userId })
                    .update({ userToken: tokens.refresh.token });

                const userInfo = await selectDataUser(tokens.refresh.token);

                return res.send({ userInfo, tokens });
            }
        } catch (err) {
            console.log(err);
        }
    });

module.exports = router;
