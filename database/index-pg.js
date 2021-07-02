require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: true
});

const Summary = sequelize.define('Summary', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  summary: {
    type: DataTypes.STRING
  },
  short_summary: {
    type: DataTypes.STRING
  },
  copyright: {
    type: DataTypes.STRING
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.INTEGER)
  },
  employeeID: {
    type: DataTypes.INTEGER
  }
});

const Tag = sequelize.define('Tag', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  tagName: {
    type: DataTypes.STRING
  }
})

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  name: {
    type: DataTypes.STRING
  }
})

const syncing = async () => {
  await sequelize.sync();
};
syncing();

const save = async (record) => {
  try {
    const doc = await Summary.create(record);
    console.log('Saved record', record.id);
  } catch (err) { console.log(err); }
}

const saveTag = async (record) => {
  try {
    const doc = await Tag.create(record);
    console.log('Saved tag', record.id);
  } catch (err) { console.log(err); }
}

const saveEmployee = async (record) => {
  try {
    const doc = await Employee.create(record);
    console.log('Saved employee', record.id);
  } catch (err) { console.log(err); }
}

module.exports = { save, saveTag, saveEmployee };
