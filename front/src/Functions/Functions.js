function dataAboutImgForUpload(filDesc, crroperedImg) {
    const { name, size, type } = filDesc || "";
    const date = new Date();
    const time =
        date.getFullYear().toString() +
        date.getMonth().toString() +
        date.getMonth().toString() +
        date.getDate().toString() +
        date.getHours().toString() +
        date.getSeconds().toString() +
        date.getMilliseconds().toString();

    const dataImg = {
        name: time + name,
        type: type,
        size: size,
        img: crroperedImg,
    };

    return dataImg;
}

export { dataAboutImgForUpload };
