"use strict";
const express = require("express");
const router = express.Router();
const regController = require("../controllers/registration");

router.post("/", regController.postNewUser);

module.exports = router;
