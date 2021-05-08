const db = require("../db/db");

const postNewUser = async (req, res) => {
    try {
        const nameUser = req.body.name;
        const emailUser = req.body.userEmail.toLowerCase();
        const passwordUser = req.body.userPassword;

        const checkUser = await db
            .select()
            .from("users")
            .where("emailUser", emailUser)
            .orderBy("userId", "desc");

        if (checkUser.findIndex((el) => el.emailUser === emailUser) > -1) {
            throw new Error("такой емейл уже занят");
        } else {
            const newUser = await db("users").insert({
                nameUser: nameUser,
                emailUser: emailUser,
                passwordUser: passwordUser,
            });

            res.send(newUser);
        }
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = {
    postNewUser,
};
