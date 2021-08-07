require('dotenv').config();
const { Pool, Client } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0
});

const initialize = async () => {
  try {
    const client = await pool.connect();
    await client.query('CREATE TABLE IF NOT EXISTS employees(id INT PRIMARY KEY, name VARCHAR(100))');
    await client.query('CREATE TABLE IF NOT EXISTS tags(id INT PRIMARY KEY, tag_name VARCHAR(100))');
    await client.query('CREATE TABLE IF NOT EXISTS summaries(id INT PRIMARY KEY, summary VARCHAR(2048), short_summary VARCHAR(1024), copyright VARCHAR(100), employee_id INT, FOREIGN KEY(employee_id) REFERENCES employees(id))');
    await client.query('CREATE TABLE IF NOT EXISTS summary_tag(id SERIAL PRIMARY KEY, summary_id INT, tag_id INT, FOREIGN KEY (tag_id) REFERENCES tags(id), FOREIGN KEY (summary_id) REFERENCES summaries(id))');
    client.release();
    console.log('Table creation complete');
  } catch (err) { console.log(err); }
}

const saveTag = async (record) => {
  try {
    const client = await pool.connect();
    await client.query('INSERT INTO tags(id, tag_name) VALUES ($1, $2)', [record.id, record.tag_name]);
    await client.release();
    console.log('Inserted', record.id);
  } catch (err) { console.log(err); }
}

const saveEmployee = async (record) => {
  try {
    const client = await pool.connect();
    await client.query('INSERT INTO employees(id, name) VALUES ($1, $2)', [record.id, record.name]);
    await client.release();
    console.log('Inserted', record.id);
  } catch (err) { console.log(err); }
}

const saveSummaries = async () => {
  try {
    const client = await pool.connect();
    await client.query(`COPY summaries FROM '/Users/ericknechtges/Documents/HackReactor/Summary-Service/database/summaries.csv' DELIMITER ',' CSV HEADER`);
    await client.release();
    console.log('Summary table inserted!');
  } catch (err) { console.log(err); }
}

const saveSummaryTag = async () => {
  try {
    const client = await pool.connect();
    await client.query(`COPY summary_tag(id, summary_id, tag_id) FROM '/Users/ericknechtges/Documents/HackReactor/Summary-Service/database/summary_tag.csv' DELIMITER ',' CSV HEADER`);
    await client.release();
    console.log('Summary_tag table inserted!');
  } catch (err) { console.log(err); }
}

const get = async (id) => {
  try {
    const client = await pool.connect();
    const record = await client.query('SELECT * FROM summaries WHERE id = $1', [id]);
    await client.release();
    return record.rows;
  } catch (err) { console.log(err); }
}



const save = async (record) => {
  try {
    const client = await pool.connect();
    if (record.tags) {
      for (let i = 0; i < record.tags.length; i++) {
        await client.query('INSERT INTO summary_tag(summary_id, tag_id) VALUES ($1, $2)', [record.id, record.tags[i]])
      }
      let max = await client.query('SELECT MAX(id) FROM summaries');
    }
    await client.query('INSERT INTO summaries VALUES ($1, $2, $3, $4, $5)', [record.id, record.summary, record.short_summary, record.copyright, record.employee_id]);
    await client.release();
  } catch (err) { console.log(err) }
}

const update = async (id, record) => {
  try {
    const client = await pool.connect();
    for (let key in record) {
      if (key !== 'tags') {
        await client.query(`UPDATE summaries SET ${key} = $1 WHERE id = $2`, [record[key], id]);
      }
    }
    await client.release();
  } catch (err) { console.log(err); }
}


const del = async (id) => {
  try {
    const client = await pool.connect();
    await client.query('DELETE FROM summaries WHERE id = $1', [id]);
    await
  } catch (err) { console.log(err); }
}

module.exports = { initialize, saveTag, saveEmployee, saveSummaries, saveSummaryTag, get, save, update, del };
//initialize, save, saveTag, saveEmployee