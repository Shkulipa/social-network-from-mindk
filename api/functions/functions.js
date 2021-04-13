const db = require('../db/db');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

function generateTokens(user) {
    const accessTokenExpires = moment().add(10, 'minutes');
    const accessToken = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: '600s',
        audience: process.env.HOST,
    });

    const refreshTokenExpires = moment().add(24, 'hours');
    const refreshToken = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: "24h",
        audience: process.env.HOST,
    });

    const tokens = {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate(),
        },
    };

    return tokens;
}

function recordFile (dataImg, path) {
    const {name, type, img} = dataImg;
    const imgType = type.split('/').pop();
    const b64Data = img.split(';base64,').pop();
    const fileName = `${name.toString()}.${imgType.toString()}`;

    const bufferImg = Buffer.from(b64Data.toString(), 'base64');

    fs.writeFile(`./${path}/${fileName}`, bufferImg, function (err) {
        if (err) return console.log(err);
    })

    return fileName;
}

function selectDataUser (tokenRefresh){
    return db.select(
        'users.user_id', 'name_user', 'email_user', 'user_token', 'permission',
        'avatar_img', 'phone', 'university', 'university', 'name_available',
        'email_available', 'phone_available', 'university_available'
    ).from('users')
        .join('users_info_available', function() {
            this.on
            ('users_info_available.user_id', '=', 'users.user_id')
        })
        .where('user_token', tokenRefresh ).first();
}

module.exports = {
    recordFile,
    generateTokens,
    selectDataUser
}
