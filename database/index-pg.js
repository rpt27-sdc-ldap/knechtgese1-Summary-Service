require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

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



const save = async (record) => {
  try {
    await Summary.sync();
    Tag.belongsToMany(Summary, {through: 'summary_tag'});
    Summary.belongsToMany(Tag, {through: 'summary_tag'});
    Employee.hasMany(Summary);
    Summary.belongsTo(Employee);
    await sequelize.sync();
    let summ = await Summary.create({
      id: record.id,
      summary: record.summary,
      short_summary: record.short_summary,
      copyright: record.copyright,
      employeeId: record.employeeId
    });
    await summ.addTags(record.tags);
  } catch (err) { console.log(err); }
}

const saveTag = async (record) => {
  try {
    await Tag.sync();
    await Tag.create(record);
    console.log('Saved tag', record.id);
  } catch (err) { console.log(err); }
}

const saveEmployee = async (record) => {
  try {
    await Employee.sync();
    await Employee.create(record);
    console.log('Saved employee', record.id);
  } catch (err) { console.log(err); }
}


module.exports = { save, saveTag, saveEmployee };
