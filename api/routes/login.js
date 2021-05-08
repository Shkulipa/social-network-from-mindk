"use strict";
const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login");

router
    .get("/", loginController.getUsers)

    .post("/", loginController.nativeLogin)

    .post("/social/google", loginController.googleLogin)

    .post("/social/facebook", loginController.facebookLogin);

module.exports = router;
