const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.end();
});


app.get('/api/summary/:bookId', async (req, res, next) => {
  await db.Summary.find({'id': req.params.bookId}).exec((err, result) => {
    // console.log("this is the response from the server:", result)
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
});

app.get('/api/summaries/:bookIds', async (req, res) => {
  const ids = req.params.bookIds.split(',');
  await db.Summary.find({ id: { $in: ids } }).exec((err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
});


let port = process.env.port || 1220;

if(!module.parent){
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
};

module.exports = app;