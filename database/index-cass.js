const ExpressCassandra = require('express-cassandra');
var models = ExpressCassandra.createClient({
  clientOptions: {
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1',
    protocolOptions: { port: 9042 },
    keyspace: 'summaries'
  },
  ormOptions: {
    defaultReplicationStrategy: {
      class: 'SimpleStrategy',
      replication_factor: 1
    },
    migration: 'safe'
  }
});

var Employee = models.loadSchema('Employee', {
  fields: {
    id: 'int',
    name: 'text'
  },
  key: ['id']
});

var Tag = models.loadSchema('Tag', {
  fields: {
    id: 'int',
    tag_name: 'text'
  },
  key: ['id']
});

var Summary = models.loadSchema('Summary', {
  fields: {
    id: 'int',
    summary: 'text',
    short_summary: 'text',
    copyright: 'text',
    employeeId: 'int',
    tags: {
      type: 'list',
      typeDef: '<int>'
    }
  },
  key: ['id']
});

const saveTag = (record) => {
  Tag.syncDB((err) => { console.log(err); });
  let tag = new Tag({
    id: record.id,
    tag_name: record.tag_name
  });
  tag.saveAsync()
    .then (() => console.log('Saved tag', record.id))
    .catch ((err) => console.log('Tag write error', err));
};

const saveEmployee = (record) => {
  Employee.syncDB((err) => { console.log(err); });
  let employee = new Employee({
    id: record.id,
    name: record.name
  });
  employee.saveAsync()
    .then (() => console.log('Saved employee', employee.id))
    .catch ((err) => console.log('Employee write error', err));
};

const save = () => {
  Summary.syncDB((err) => { console.log(err); });
  Summary.execute_query('COPY summaries.summaries FROM "summaries.csv" WITH DELIMITER="," AND HEADER=TRUE', null, (err, done) => {
    if (err) { console.log(err); }
    console.log('Done!', done);
  });
};

module.exports = { save, saveTag, saveEmployee };

