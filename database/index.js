const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/summary');
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
  copyright: { type: String, required: true }
});

let Summary = mongoose.model('Summary', summarySchema);
Summary.createIndexes();



let save = (summaryData, callback) => {
  const query = { "id": summaryData.id };
  const update = { $set: {"id": summaryData.id, "summary": summaryData.summary, "short_summary": summaryData.short_summary, "copyright": summaryData.copyright } };
  const options = { upsert: true };
  Summary.updateOne(query, update, options, callback);
};



module.exports = save;



