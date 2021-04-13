const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../../models/user");
const GoogleStrategy = require("./strategies/google");
const db = require("../../db/db");

passport.use(
    new LocalStrategy(
        { usernameField: "email", passwordField: "password" },
        async function (userEmail, password, done) {
            const user = await User.findByEmail(userEmail);

            if (user && user.regType === "native") {
                if (password === user.passwordUser) {
                    // Everything is ok, let's proceed:
                    return done(null, {
                        userId: user.userId,
                        nameUser: user.nameUser,
                        permission: user.permission,
                    });
                }
            }
            // Authentication failure:
            return done(null, false, { message: "Invalid user credentials" });
        }
    )
);

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
            audience: process.env.HOST,
        },
        function (jwtPayload, done) {
            // @TODO: Sanitize payload:
            return done(null, jwtPayload);
        }
    )
);

passport.use(
    new GoogleStrategy(async function (profile, done) {
        const userEmail = String(profile.email);
        const user = await User.findByEmail(userEmail);

        if (user) {
            return done(null, {
                userId: user.userId,
                nameUser: user.nameUser,
                permission: user.permission,
            });
        } else {
            const addNewUser = await db("users")
                .insert({
                    nameUser: profile.name,
                    emailUser: profile.email,
                    regType: "social",
                    permission: [
                        "deleteOwnPost",
                        "updateOwnPost",
                        "postPost",
                        "updateOwnProfile",
                        "addNewPost",
                    ],
                })
                .returning("userId");

            const idNewUser = addNewUser[0];

            await db("usersInfoAvailable").insert({
                userId: idNewUser,
                nameAvailable: "All",
                emailAvailable: "All",
                phoneAvailable: "All",
                universityAvailable: "All",
            });

            const newUser = await db
                .select()
                .from("users")
                .where("userId", idNewUser)
                .first();
            return addNewUser
                ? done(null, {
                      userId: newUser.userId,
                      nameUser: newUser.nameUser,
                      permission: newUser.permission,
                  })
                : done("Google auth failed", null);
        }
    })
);

module.exports = passport;
