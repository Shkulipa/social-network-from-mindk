// env
require("dotenv").config();
const host = process.env.HOST;
const port = process.env.PORT;
const file = process.env.FILE;

var fs = require('fs');
const express = require('express');
const app = express();

class apiClass {
  constructor(host, port) { 
    this.host = host; 
    this.port = port; 
  };
}

const varApiClass = new apiClass(host, port);

 // Если есть файл
app.get('/', (req, res, next) => {
  fs.readFile(file, 'utf8', function (err, content) {
    if (err) {
      next(err) // Pass errors to Express.
    } else {
      res.send(content)
    }
  })
});

 // Если нету файла
/* app.get('/', (req, res, next) => {
  fs.readFile('data-missing.txt', 'utf8', function (err, content) {
    if (err) {
      next(err) // Pass errors to Express.
    } else {
      res.send(content)
    }
  })
}); */

app.listen(port, () => {
  console.log(`Example app listening at http://${varApiClass.host}:${varApiClass.port}`)
});

