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
                const { comment, userId, postId } = message.data;
                const addInBase = await db(commentTable)
                    .insert({
                        userId: userId,
                        postId: postId,
                        comment: comment,
                    })
                    .returning(commentTableCommentId);

                const idNewMess = addInBase[0];

                const mess = await db
                    .select(
                        "comment",
                        "cfp.userId",
                        "u.nameUser",
                        "u.avatarImg",
                        "commentId",
                        "cfp.postId",
                        db.raw(
                            'to_char("date", \'YYYY-MM-DD hh:mm:ss\') as "date"'
                        )
                    )
                    .from("commentsForPosts as cfp")
                    .where("cfp.commentId", idNewMess)
                    .join("users as u", function () {
                        this.on("cfp.userId", "=", "u.userId");
                    });
                const resObjNewMess = {
                    event: "newMess",
                    data: mess,
                };
                sendComm(resObjNewMess);
                break;

            case "deleteComm":
                const { commentId } = message.data;
                await db(commentTable)
                    .where(commentTableCommentId, commentId)
                    .del();

                const resObjDelMess = {
                    event: "delMess",
                    data: commentId,
                };
                delComm(resObjDelMess);
                break;
        }
    });
});
const sendComm = (data) => {
    wss.clients.forEach(async (client) => {
        try {
            client.send(JSON.stringify(data));
        } catch (e) {
            console.log(e);
        }
    });
};
const delComm = (data) => {
    wss.clients.forEach(async (client) => {
        try {
            client.send(JSON.stringify(data));
        } catch (e) {
            console.log(e);
        }
    });
};

app.listen(port, () => {
    console.log(`Example app listening at http://${host}:${port}`);
});
