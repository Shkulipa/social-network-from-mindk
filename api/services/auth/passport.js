const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const GoogleStrategy = require('./strategies/google');
// const FacebookStrategy = require('./strategies/facebook');
// const FacebookStrategy = require('passport-facebook').Strategy;

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

passport.use(
    new GoogleStrategy(
        async function (profile, done) {

            const user_email = String(profile.email);
            const user = await User.findByEmail(user_email);

            return user ? done(null, user) : done('Google auth failed', null);
    }),
);

// passport.use(
//     new FacebookStrategy({
//         clientID: '243090580632360',
//         clientSecret: '47bcee4e452de4a4fdcefa921004528c',
//         callbackURL: "http://localhost:3000/login/auth/facebook/callback"
//     },
//     function(accessToken, refreshToken, profile, cb) {
//         console.log(accessToken, refreshToken, profile);
//         return cb(err, user);
//     }
// ));

// passport.use(
//     new FacebookStrategy(
//         async function (profile, done) {
//             console.log(profile);
//             const user_email = String(profile.email);
//             const user = await User.findByEmail(user_email);
//
//             return user ? done(null, user) : done('Google auth failed', null);
//         }),
// );


// passport.use(new FacebookStrategy({
//         clientID: config.facebookAuth.clientID,
//         clientSecret: config.facebookAuth.clientSecret,
//         callbackURL: config.facebookAuth.callbackURL
//     }, function (accessToken, refreshToken, profile, done) {
//         return done(null, profile);
//     }
// ));

module.exports = passport;
