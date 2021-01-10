// env
require("dotenv").config();
const host = process.env.HOST;
const port = process.env.PORT;
const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db/db");
const posts = require("./routes/posts")

app.use(cors());
app.use(express.json());

app.use("/posts", posts);

app.listen(port, () => {
    console.log(`Example app listening at http://${host}:${port}`)
});

