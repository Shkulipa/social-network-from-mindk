require("dotenv").config();
const host = process.env.HOST;
const port = process.env.PORT;
const express = require('express');
var cors = require('cors');
const app = express();

const passport = require('./services/auth/passport');
const authRequest = require('./middleware/request-auth');

const posts = require("./routes/posts");
const registration = require("./routes/registration");
const login = require("./routes/login");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(passport.initialize());
app.use(authRequest);
app.use(cors())

app.use("/posts", posts);
app.use("/registration", registration);
app.use("/login", login);

app.listen(port, () => {
    console.log(`Example app listening at http://${host}:${port}`)
});

