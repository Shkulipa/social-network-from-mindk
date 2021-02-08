const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const User = require('../../models/user');

passport.use(
    new LocalStrategy(
        { usernameField: 'user_email', passwordField: 'user_password' },
        async function (user_email, password, done) {
            const user = await User.findByEmail(user_email);
            if (user) {
                // Check for passwords match:
                // const pwdMatch = await bcrypt.compare(password, user.password);

                if (password == user.password_user) {
                    // Everything is ok, let's proceed:

                    return done(null, user);
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
            //jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
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

module.exports = passport;
