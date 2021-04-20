const express = require("express");
const router = new express.Router();
const profileController = require("../controllers/profile");
const { checkACL } = require("../middleware/acl");
const { validator } = require("../middleware/validator");

router
    .post("/:id", profileController.getOneUser)

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
        profileController.putOneUser
    );

module.exports = router;
