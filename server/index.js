const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

let app = express();

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/api/summary/:bookId', async (req, res) => {
  res.set({'Access-Control-Allow-Origin': '*'})
  await db.Summary.find({'id': req.params.bookId}).exec((err, result) => {
    if (err) {
      next(err);
    } else {
      res.send(result);
    }
  })
});


app.get('/api/summaries/:bookIds', async (req, res) => {
  res.set({'Access-Control-Allow-Origin': '*'})
  const ids = req.params.bookIds.split(',');
  await db.Summary.find({ id: { $in: ids } }).exec((err, result) => {
    if (err) {
      next(err);
    } else {
      res.send(result);
    }
  })
});


let port = process.env.port || 1220;

if(!module.parent){
app.listen(port, function () {
  console.log(`listening on port ${port}.CORS enabled from port 3300`);
});
};

module.exports = app;