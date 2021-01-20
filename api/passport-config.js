const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

async function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email);
        if (user == null) {
            return done(null, false, {message: "Нету такого юзера с таким емейлом"});
        }

        try {
            if (await bcrypt.compare(password.user.password)) {
                return done(null, user);
            } else {
                return done(null, false, {message: "неверный пароль"})
            }
        } catch (e) {
            return done(e);
        }
    }

    passport.use(new LocalStrategy({usernameField: 'email'}), authenticateUser);
    passport.serializeUser((user, done) => {});
    passport.deserializeUser((id, done) => {});
}

module.exports = initialize;
