require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs').promises;
const Promise = require('bluebird');
const createReadStreamPromise = require('fs').createReadStream;
const csv = require('csv');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false
});

const Summary = sequelize.define('summary', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  summary: {
    type: DataTypes.STRING(2048)
  },
  short_summary: {
    type: DataTypes.STRING(1024)
  },
  copyright: {
    type: DataTypes.STRING
  },
  employeeId: {
    type: DataTypes.INTEGER
  }
});

const Tag = sequelize.define('tag', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  tag_name: {
    type: DataTypes.STRING
  }
});

const Employee = sequelize.define('employee', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  name: {
    type: DataTypes.STRING
  }
});


const save = async () => {
  //const createReadStreamPromise = Promise.promisify(fs.createReadStream);
  const input = await createReadStreamPromise('./database/summaries.csv');
  const parser = await csv.parse({
    delimiter: ',',
    columns: true
  }, (err, input) => {
    if (err) { console.log(err) }
    console.log('Parsed:', input)})
  try {
    await Summary.sync();
    Tag.belongsToMany(Summary, {through: 'summary_tag'});
    Summary.belongsToMany(Tag, {through: 'summary_tag'});
    Employee.hasMany(Summary);
    Summary.belongsTo(Employee);
    await sequelize.sync();
  } catch (err) { console.log(err) }
  const transform = csv.transform(async (row) => {
    let resultObj = {
      id: row.id,
      summary: row.summary,
      short_summary: row.short_summary,
      copyright: row.copyright,
      employeeId: row.employeeId
    };
    try {
      console.log('Before write', resultObj.id)
      let summ = await Summary.create(resultObj);
      await summ.addTags(row.tags);
      console.log('Creating record', row.id);
      return row.id;
    } catch (err) { console.log(err); }
  })
  try {
    await input
      .on('error', (err) => {console.log(err)})
      .pipe(parser)
      .pipe(transform)
      .on('data', async (chunk) => { return await chunk })
      .on('error', (err) => {console.log(err)})
      .on('end', () => { console.log('Done!'); })
  } catch (err) { console.log(err); }
}

const saveTag = async (record) => {
  try {
    await Tag.sync();
    await Tag.create(record);
    console.log('Saved tag', record.id);
  } catch (err) { () => {console.log(err);} }
}

const saveEmployee = async (record) => {
  try {
    await Employee.sync();
    await Employee.create(record);
    console.log('Saved employee', record.id);
  } catch (err) { console.log(err); }
}


module.exports = { save, saveTag, saveEmployee };
