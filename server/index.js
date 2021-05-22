const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../database/index.js');

let app = express();


const corsOpts = {
  origin: 'http://localhost:5500',
  optionsSuccessStatus: 200
};

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/api/summary/:bookId', async (req, res, next) => {
  await db.Summary.find({'id': req.params.bookId}).exec((err, result) => {
    if (err) {
      next(err);
    } else {
      res.send(result);
    }
  })
});


app.get('/api/summaries/:bookIds', async (req, res) => {
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
  console.log(`listening on port ${port}.CORS enabled from port 5500`);
});
};

module.exports = app;