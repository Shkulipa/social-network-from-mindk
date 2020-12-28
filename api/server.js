// env
require("dotenv").config();
const host = process.env.HOST;
const port = process.env.PORT;

const express = require('express');
const app = express();

const posts = require("./routes/posts")

app.use("/posts", posts);

app.listen(port, () => {
    console.log(`Example app listening at http://${host}:${port}`)
});

