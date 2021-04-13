require("dotenv").config();
const host = process.env.HOST;
const port = process.env.PORT;
const express = require("express");
const cors = require("cors");
const app = express();

const passport = require("./services/auth/passport");

const posts = require("./routes/posts");
const registration = require("./routes/registration");
const login = require("./routes/login");
const profile = require("./routes/profile");
const logout = require("./routes/logout");
const refreshTokens = require("./routes/refreshTokens");

app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json({ limit: "10mb" }));

app.use("/images/avatars/", express.static(__dirname + "/images/avatars/"));
app.use("/images/posts/", express.static(__dirname + "/images/posts/"));

app.use(
    cors({
        origin: ["http://localhost:3001"],
        methods: "GET,PUT,POST,DELETE",
        optionsSuccessStatus: 200,
    })
);

app.use(passport.initialize());
app.use(cors());

app.use("/posts", posts);
app.use("/registration", registration);
app.use("/login", login);
app.use("/profile", profile);
app.use("/logout", logout);
app.use("/refresh-tokens", refreshTokens);

app.listen(port, () => {
    console.log(`Example app listening at http://${host}:${port}`);
});
