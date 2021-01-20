// env
require("dotenv").config();
const host = process.env.HOST;
const port = process.env.PORT;
const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db/db");
const posts = require("./routes/posts");
const register = require("./routes/register");
const login = require("./routes/login");
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const initializePassport = require('./passport-config');
// initializePassport(passport);

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());

app.use("/posts", posts);
app.use("/register", register);
app.use("/login", login);
app.use("/profile", login);

// app.get('/', (req, res) => {
//     res.render('index.ejs', {name: 'Oleksii'});
// });

app.listen(port, () => {
    console.log(`Example app listening at http://${host}:${port}`)
});

