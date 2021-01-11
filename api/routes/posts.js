"use strict";
const express = require("express");
let router = express.Router();
const pool = require("../db/db");

router
    .get("/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const getPost = await pool.query("SELECT * FROM posts WHERE post_id=$1", [id]);

            res.json(getPost.rows[0]);
        } catch(err) {
            console.error(err.message)
        }
    })

    .get("/", async (req, res) => {
        try {
            const getPostAll = await pool.query("SELECT * FROM posts");

            res.json(getPostAll.rows);
        } catch(err) {
            console.error(err.message)
        }
    })

    .post("/", async (req, res) => {
        try {
            // const { description } = req.body;
            const newPost = await pool.query("INSERT INTO posts (description) VALUES ('нуу.. тут какая - то там статья например')");

            res.json(newPost);
        } catch(err) {
            console.error(err.message)
        }
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