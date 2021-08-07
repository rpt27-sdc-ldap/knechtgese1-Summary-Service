require('newrelic');
const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index-pg2.js');
const process = require('process');
let app = express();
app.use(compression({ threshold: 0 }))
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//READ
app.get('/api/summary/:bookId', async (req, res) => {
  res.set({ 'Access-Control-Allow-Origin': '*' });
  try {
    let rec = await db.get(req.params.bookId);
    if (rec === undefined) {
      res.status(404).send([]);
    } else {
      res.send(rec);
    }
  } catch (err) { console.log(err); }
})

app.get('/api/summaries/:bookIds', async (req, res) => {
  res.set({ 'Access-Control-Allow-Origin': '*' });
  const ids = req.params.bookIds.split(',');
  let result = [];
  let rec;
  for (let i = 0; i < ids.length; i++) {
    rec = await db.get(ids[i]);
    if (rec === undefined) {
      res.status(404).send([]);
      break;
    }
    result.push(rec);
  }
  res.send(result);
});

//CREATE
app.post('/api/summary/new', async (req, res) => {
  res.set({ 'Access-Control-Allow-Origin': '*' });
  try {
    await db.save(req.body);
    res.send('create done');
  } catch (err) { console.log(err); }
})

//UPDATE
app.patch('/api/summary/update/:bookId', async (req, res) => {
  res.set({ 'Access-Control-Allow-Origin': '*' });
  try {
    await db.update(req.params.bookId, req.body);
    res.send('update done');
  } catch (err) {
    console.log(err);
    res.status(500).send('error updating')
  }
})

//DELETE
app.delete('/api/summary/delete/:bookId', async (req, res) => {
  res.set({ 'Access-Control-Allow-Origin': '*' });
  try {
    await db.del(req.params.bookId);
    res.send('delete done');
  } catch (err) { console.log(err); }
})

let port = process.env.port || 1220;
if (!module.parent) {
  app.listen(port, function () {
    console.log(`listening on port ${port}`);
  });
};

module.exports = app;