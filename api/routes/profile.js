const express = require("express");
const router = new express.Router();
const db = require("../db/db");
const { checkACL } = require("../middleware/acl");
const { recordFile } = require("../functions/functions");
const { validator } = require("../middleware/validator");

router
    .post("/:id", async (req, res) => {
        try {
            const id = req.params.id;
            const { userLoginId } = req.body;

            // get Data viewed user
            const data = await db
                .select(
                    "users.nameUser",
                    "users.emailUser",
                    "users.avatarImg",
                    "users.phone",
                    "users.university",
                    "usersInfoAvailable.nameAvailable",
                    "usersInfoAvailable.emailAvailable",
                    "usersInfoAvailable.phoneAvailable",
                    "usersInfoAvailable.universityAvailable"
                )
                .from("users")
                .join("usersInfoAvailable", function () {
                    // eslint-disable-next-line no-invalid-this
                    this.on("users.userId", "=", "usersInfoAvailable.userId");
                })
                .where("users.userId", id)
                .limit(1);

            // Fields for check for : All, Friends, Only me
            const CheckFields = [
                "nameUser",
                "emailUser",
                "phone",
                "university",
            ];
            const availableFields = {
                nameUser: data[0].nameAvailable,
                emailUser: data[0].emailAvailable,
                phone: data[0].phoneAvailable,
                university: data[0].universityAvailable,
            };

            // check logged in user
            if (userLoginId !== "not auth") {
                // if viewed user === logged in user
                if (parseInt(userLoginId, 10) !== parseInt(id, 10)) {
                    // eslint-disable-next-line no-new-object
                    const newObj = {};
                    newObj.avatarImg = data[0]["avatarImg"];

                    for (const key in data[0]) {
                        if (CheckFields.includes(key || "")) {
                            if (availableFields[key || ""] === "All") {
                                newObj[key || ""] = data[0][key || ""];
                            } else if (availableFields[key] === "Friends") {
                                const checkFriend = await db
                                    .select()
                                    .from("friends")
                                    .where(function () {
                                        // eslint-disable-next-line no-invalid-this
                                        this.where("fromUserId", id).andWhere(
                                            "toUserId",
                                            userLoginId
                                        );
                                    })
                                    .orWhere(function () {
                                        // eslint-disable-next-line no-invalid-this
                                        this.where(
                                            "fromUserId",
                                            userLoginId
                                        ).andWhere("toUserId", id);
                                    })
                                    .andWhere(function () {
                                        // eslint-disable-next-line no-invalid-this
                                        this.where("approve", true);
                                    })
                                    .limit(1);

                                if (checkFriend.length > 0) {
                                    if (checkFriend[0].approve) {
                                        newObj[key || ""] = data[0][key || ""];
                                    }
                                }
                            }
                        }
                    }
                    res.send(newObj);
                } else {
                    // if viewed user !== logged in user
                    const newObj = {};
                    newObj.avatarImg = data[0]["avatarImg"];

                    for (const key in data[0]) {
                        if (CheckFields.includes(key)) {
                            newObj[key || ""] = data[0][key || ""];
                        }
                    }

                    res.send(newObj);
                }
            } else {
                // For not logged in user
                const newObj = {};
                newObj.avatarImg = data[0]["avatarImg"];

                for (const key in data[0]) {
                    if (CheckFields.includes(key || "")) {
                        if (availableFields[key || ""] === "All") {
                            newObj[key || ""] = data[0][key || ""];
                        }
                    }
                }
                res.send(newObj);
            }
        } catch (err) {
            console.error(err.message);
        }
    })

    .put(
        "/update/:id",
        checkACL([
            {
                permission: "updateOwnProfile",
                checkAuthor: true,
                table: "users",
                column: "userId",
            },
        ]),
        validator({
            name: ["required", "max:255"],
            nameAvailable: ["required", "max:10"],

            email: ["required", "max:255"],
            emailAvailable: ["required", "max:10"],

            phone: ["required", "max:13"],
            phoneAvailable: ["required", "max:10"],

            university: ["max:99"],
            universityAvailable: ["required", "max:10"],

            dataImg: [
                "size:10000000",
                "max:255",
                "type:image/png||image/jpg||image/jpeg",
            ],
        }),
        async (req, res) => {
            try {
                const { email, phone, university, name, user } = req.body;
                const {
                    nameAvailable,
                    emailAvailable,
                    phoneAvailable,
                    universityAvailable,
                } = req.body;

                if (req.body.dataImg) {
                    const fileName = recordFile(
                        req.body.dataImg,
                        "images/avatars"
                    );

                    await db("users").where("userId", user.userId).update({
                        nameUser: name,
                        emailUser: email,
                        phone: phone,
                        avatarImg: fileName,
                        university: university,
                    });
                    await db("usersInfoAvailable")
                        .where("userId", user.userId)
                        .update({
                            nameAvailable: nameAvailable,
                            emailAvailable: emailAvailable,
                            phoneAvailable: phoneAvailable,
                            universityAvailable: universityAvailable,
                        });

                    res.send([{ success: "Your profile updated!" }]);
                } else {
                    await db("users").where("userId", user.userId).update({
                        nameUser: name,
                        emailUser: email,
                        phone: phone,
                        university: university,
                    });
                    await db("usersInfoAvailable")
                        .where("userId", user.userId)
                        .update({
                            nameAvailable: nameAvailable,
                            emailAvailable: emailAvailable,
                            phoneAvailable: phoneAvailable,
                            universityAvailable: universityAvailable,
                        });
                    res.send([{ success: "Your profile updated!" }]);
                }
            } catch (err) {
                console.error(err.message);
            }
        }
    )

    .post("/search", async (req, res) => {
        try {
            const { userId } = req.body;
            res.send(
                await db.select().from("users").where("userId", Number(userId))
            );
        } catch (err) {
            console.error(err.message);
        }
    });

module.exports = router;
