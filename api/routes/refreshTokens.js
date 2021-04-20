"use strict";
const express = require("express");
const router = express.Router();
const refreshtokenController = require("../controllers/refreshToken");

router.post("/", refreshtokenController.refreshToken);

module.exports = router;
