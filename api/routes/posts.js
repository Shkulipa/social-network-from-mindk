"use strict";
const express = require("express");
const router = express.Router();
const db = require('../db/db');

router
    .get("/:id", async (req, res) => {
        try {
            const id = req.params.id;
            res.send(await db.select().from('posts').where('post_id', id).orderBy('post_id', 'desc'));
        } catch(err) {
            console.error(err.message)
        }
    })

    .get("/", async (req, res) => {
        try {
            res.send(await db.select().from('posts').orderBy('post_id', 'desc'));
        } catch(err) {
            console.error(err.message)
        }
    })

    .post("/", async (req, res) => {
        try {
            const description = req.body.description;
            const newPost = await db('posts').insert({description: description});
            res.send(newPost);
        } catch(err) {
            console.error(err.message)
        }
    })

module.exports = router;