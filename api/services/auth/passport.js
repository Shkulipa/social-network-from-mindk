const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../../models/user');
const GoogleStrategy = require('./strategies/google');

passport.use(
    new LocalStrategy(
        { usernameField: 'user_email', passwordField: 'user_password' },
        async function (user_email, password, done) {
            const user = await User.findByEmail(user_email);
            if (user) {
                if (password == user.password_user) {
                    // Everything is ok, let's proceed:
                    return done(null, {user_id: user.user_id, name_user: user.name_user, permission: user.permission});
                }
            }
            // Authentication failure:
            return done(null, false, { message: 'Invalid user credentials' });
        },
    ),
);

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
            audience: process.env.HOST,
        },
        function (jwt_payload, done) {
            // @TODO: Sanitize payload:
            return done(null, jwt_payload);
        },
    ),
);

passport.use(
    new GoogleStrategy(
        async function (profile, done) {

            const user_email = String(profile.email);
            const user = await User.findByEmail(user_email);

            return user ? done(null, user) : done('Google auth failed', null);
    }),
);

module.exports = passport;
