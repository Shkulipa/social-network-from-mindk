const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../../models/user');
const GoogleStrategy = require('./strategies/google');
const db = require('../../db/db');

passport.use(
    new LocalStrategy(
        { usernameField: 'email', passwordField: 'password' },
        async function (user_email, password, done) {
            const user = await User.findByEmail(user_email);

             if (user && user.reg_type === 'native') {
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


            if(user) {
                return done(null, {user_id: user.user_id, name_user: user.name_user, permission: user.permission});
            } else {
                const addNewUser = await db('users').insert({
                    name_user: profile.name,
                    email_user: profile.email,
                    reg_type: 'social',
                    permission: ['deleteOwnPost','updateOwnPost','postPost', 'updateOwnProfile', 'addNewPost']
                }).returning('user_id');

                const idNewUser = addNewUser[0];

                await db('users_info_available').insert({
                    user_id: idNewUser,
                    name_available: 'All',
                    email_available: 'All',
                    phone_available: 'All',
                    university_available: 'All'
                });

                const newUser = await db.select().from('users').where('user_id', idNewUser ).first();
                return addNewUser ? done(null, {user_id: newUser.user_id, name_user: newUser.name_user, permission: newUser.permission}) : done('Google auth failed', null);
            }

    }),
);

module.exports = passport;
