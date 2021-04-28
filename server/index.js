const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



let port = process.env.port || 1220;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
