const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/review');
const summaryData = require('../data.js');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connection Successful!");
});

let summarySchema = new mongoose.Schema({
  id: { type: Number, unique: true, index: true},
  summary: { type: String, required: true },
  short_summary: { type: String, required: true },
  copyright: { type: Number, required: true }
});

let Summary = mongoose.model('Summary', summarySchema);
Summary.createIndexes();



module.exports = db;


