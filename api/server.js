require("dotenv").config();
const host = process.env.HOST;
const port = process.env.PORT;
const express = require("express");
const cors = require("cors");
const passport = require("./services/auth/passport");

const posts = require("./routes/posts");
const registration = require("./routes/registration");
const login = require("./routes/login");
const profile = require("./routes/profile");
const logout = require("./routes/logout");
const refreshTokens = require("./routes/refreshTokens");
const comments = require("./routes/comments");
const commentServices = require("./services/comments/commentServices");

const enableWs = require("express-ws");
const commentController = require("./controllers/comments");

const app = express();
enableWs(app);

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

let clients = [];

app.ws("/subscribeWSComment", async (ws, req) => {
    const id = Math.random();

    ws.on("message", async (items) => {
        const addCommentInBase = commentServices.addComment(JSON.parse(items));
        Object.entries(clients).forEach(([id, cb]) => {
            try {
                cb(addCommentInBase);
            } catch (e) {
                delete clients[id];
            }
        });

      console.log(clients);
    });


    ws.on("close", function () {
        delete clients[id];
    });
});

app.use("/posts", posts);
app.use("/comments", comments);
app.use("/registration", registration);
app.use("/login", login);
app.use("/profile", profile);
app.use("/logout", logout);
app.use("/refresh-tokens", refreshTokens);

app.listen(port, () => {
    console.log(`Example app listening at http://${host}:${port}`);
});
