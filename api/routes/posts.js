"use strict";
const express = require("express");
let router = express.Router();

router
    .get("/", (req, res) => {
        res.status(200).json({
            posts: [{id: 0, content: "get method"}]
        })
    })

    .post("/", (req, res) => {
        res.status(200).json({
            posts: [{id: 0, content: "post method"}]
        })
    })

    .put("/:id", (req, res) => {
        res.status(200).json({
            posts: [{id: 0, content: "put(update) method"}]
        })
    })
    .delete("/:id", (req, res) => {
        res.status(200).json({
            posts: [{id: 0, content: "delete method"}]
        })
    });

module.exports = router;