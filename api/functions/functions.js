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


module.exports = {
    recordFile,
    generateTokens
}
