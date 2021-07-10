const LoremIpsum = require('lorem-ipsum').LoremIpsum;
const process = require('process');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const args = process.argv;
/*if (args[2] === 'mongo' || args[2] === undefined) {
  const db = require('./index-mongo.js');
}
if (args[2] === 'pg') { */
const db = require('./index-pg.js');
/*
}
if (args[2] === 'cass') {
  const db = require('./index-cass.js');
}
*/
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 6,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 8
  }
});
const createTags = async () => {
  try {
    for (let m = 0; m < 100; m++) {
      const tag_name = lorem.generateWords(1);
      const tag = {
        id: m,
        tag_name: tag_name
      };
      console.log('Tag', tag.id);
      await db.saveTag(tag);
    }
  } catch (err) {console.log(err);}
}

const createEmployees = async () => {
  try {
    for (let n = 0; n < 100; n++) {
      const name = lorem.generateWords(2);
      const employee = {
        id: n,
        name: name
      };
      console.log('Emp', employee.id);
      await db.saveEmployee(employee);
    }
  } catch (err) {console.log(err);}
}

const generateCSV = () => {
  const csvFile = fs.createWriteStream('./database/summaries.csv');
  writer.pipe(csvFile);
  let ok = true;
  for (let i = 0; i < 1e7; i++) {
    const paragraphLength = Math.floor(Math.random() * 2 + 2);
    const shortSummarySentenceLength = Math.floor(Math.random() * 4 + 3);
    const copyrightWordsLength = Math.floor(Math.random() * 2 + 2);
    const summary = lorem.generateParagraphs(paragraphLength);
    const short_summary = lorem.generateSentences(shortSummarySentenceLength);
    const year = Math.floor(Math.random() * 81) + 1940;
    const copyright = '©' + year + ' ' + lorem.generateWords(copyrightWordsLength) + ' (P)' + (year + Math.floor(Math.random() * 5 + 4)) + ' ' + lorem.generateWords(copyrightWordsLength);
    const tagQuantity = Math.floor(Math.random() * 1) + 1; // 1-5 tags
    const tags = [];
    for (let j = 0; j < tagQuantity; j++) {
      tags.push(Math.floor(Math.random() * 100)); // 100 external references to tags
    }
    const employeeId = Math.floor(Math.random() * 100); // 100 external
    let data = {
      id: i,
      summary: summary,
      short_summary: short_summary,
      copyright: copyright,
      tags: tags,
      employeeId: employeeId
    };
    if (i % 1000 === 0) { console.log('Writing', i)}
    write();
    function write() {
      while (i < 1e7 - 1 && ok) {
        if (i === 1e7 - 1) {
          writer.write(data);
        } else {
          ok = writer.write(data);
        }
      }
      if (i < 1e7 - 1) {
        writer.once('drain', write);
      }
    };
  }
  writer.end();
}

/*
const createSummaries = async () => {
  try {
    for (let i = 0; i < 10000000; i++) {
      const paragraphLength = Math.floor(Math.random() * 2 + 2);
      const shortSummarySentenceLength = Math.floor(Math.random() * 4 + 3);
      const copyrightWordsLength = Math.floor(Math.random() * 2 + 2);
      const summary = lorem.generateParagraphs(paragraphLength);
      const short_summary = lorem.generateSentences(shortSummarySentenceLength);
      const year = Math.floor(Math.random() * 81) + 1940;
      const copyright = '©' + year + ' ' + lorem.generateWords(copyrightWordsLength) + ' (P)' + (year + Math.floor(Math.random() * 5 + 4)) + ' ' + lorem.generateWords(copyrightWordsLength);
      const tagQuantity = Math.floor(Math.random() * 1) + 1; // 1-5 tags
      const tags = [];
      for (let j = 0; j < tagQuantity; j++) {
        tags.push(Math.floor(Math.random() * 100)); // 100 external references to tags
      }
      const employeeId = Math.floor(Math.random() * 100); // 100 external employee references

      const summaryData = {
        id: i,
        summary: summary,
        short_summary: short_summary,
        copyright: copyright,
        tags: tags,
        employeeId: employeeId
      };
      if (summaryData.id % 1000 === 0) { console.log('Summary', summaryData.id) }
      await db.save(summaryData);
    }
  } catch (err) {console.log(err);}
}
*/

// createTags();
// setTimeout(createEmployees, 5000);
setTimeout(generateCSV);
//


