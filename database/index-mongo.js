//CONFIGURED FOR MONGODB

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/summary');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connection Successful!');
});

let summarySchema = new mongoose.Schema({
  id: { type: Number, unique: true, index: true},
  summary: { type: String, required: true },
  short_summary: { type: String, required: true },
  copyright: { type: String, required: true }
});

let Summary = mongoose.model('Summary', summarySchema);
Summary.createIndexes();

let save = (records) => {
  records.forEach(record => {
    let entry = new Summary({
      id: record.id,
      summary: record.summary,
      short_summary: record.short_summary,
      copyright: record.copyright
    });
    Promise.resolve(entry.save())
      .then(doc => {
        console.log('Saved');
        return 'Saved';
      })
      .catch(err => console.log(err));
  });
};

let get = async (id) => {
  try {
  let doc = await Summary.find({id: id});
  return doc[0];
  } catch(err) {
    console.log(err);
    return;
  }
};

let update = async (id, obj) => {
  try {
    await Summary.findOneAndUpdate({id: id, '$set': obj})
    return('done');
  } catch(err) {
    console.log(err);
    return;
  }
}

let del = async (id) => {
  try{
    await Summary.deleteOne({id: id});
    return('done');
  } catch(err) {
    console.log(err);
    return;
  }
}

module.exports = { Summary, mongoose, db, save, get, update, del};





