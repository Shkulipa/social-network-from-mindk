require("dotenv").config();
const host = process.env.HOST;
const port = process.env.PORT;
const express = require("express");
const cors = require("cors");
const passport = require("./services/auth/passport");
const db = require("./db/db");

const posts = require("./routes/posts");
const registration = require("./routes/registration");
const login = require("./routes/login");
const profile = require("./routes/profile");
const logout = require("./routes/logout");
const refreshTokens = require("./routes/refreshTokens");
const comments = require("./routes/comments");
const ws = require("ws");

const app = express();
const webSocketService = require("./services/webSocketsComments/commentsServices");

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
app.use("/comments", comments);
app.use("/registration", registration);
app.use("/login", login);
app.use("/profile", profile);
app.use("/logout", logout);
app.use("/refresh-tokens", refreshTokens);

const wss = new ws.Server(
    {
        port: 5000,
    },
    () => {
        console.log(`wss port 5000`);
    }
);

wss.on("connection", function connection(ws) {
    ws.on("message", async function (message) {
        message = JSON.parse(message);
        const commentTable = "commentsForPosts";
        const commentTableCommentId = "commentId";

        switch (message.event) {
            case "message":
                const mess = await webSocketService.addInBase(message.data);

                const resObjNewMess = {
                    event: "newMess",
                    data: mess,
                };

                webSocketService.broadcastComments(wss, resObjNewMess);
                break;

            case "deleteComm":
                const { commentId, postId } = message.data;

                await db(commentTable)
                    .where(commentTableCommentId, commentId)
                    .del();

                const resObjDelMess = {
                    event: "delMess",
                    data: {
                        commentId: commentId,
                        postId: postId,
                    },
                };

                webSocketService.broadcastComments(wss, resObjDelMess);
                break;
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://${host}:${port}`);
});
