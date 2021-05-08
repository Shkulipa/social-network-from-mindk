"use strict";
const express = require("express");
const router = express.Router();
const controllerLogout = require("../controllers/logout");

router.post("/", controllerLogout.logout);

module.exports = router;
