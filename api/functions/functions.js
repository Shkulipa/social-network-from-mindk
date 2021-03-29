const fs = require('fs');

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
    recordFile
}
