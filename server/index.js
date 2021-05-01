const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
//const Summary = require('../database/index.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.end();
});

// app.get('/summary', async (req, res) => {
//   const book = await db.findBookId(req.params.bookId);
//   res.send(JSON.stringify(book.dataValues));
// });

app.get('/api/summary/:bookId', async (req, res) => {
  await db.Summary.find({'id': req.params.bookId}).exec((err, result) => {
    // console.log("this is the response from the server:", result)
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
});

// [ids]//http://localhost:1220/api/summaries/1,2,3,4,5
app.get('/api/summaries/:bookIds', async (req, res) => {
  const ids = req.params.bookIds.split(',');
  await db.Summary.find({ id: { $in: ids } }).exec((err, result) => {
    // console.log("this is the response from the server:", result)
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
});


let port = process.env.port || 1220;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
