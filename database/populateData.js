const LoremIpsum = require('lorem-ipsum').LoremIpsum;
const process = require('process');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const args = process.argv;
const db = require('./index-pg2.js');

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
    for (let m = 0; m <= 10000; m++) {
      const tag_name = lorem.generateWords(1);
      const tag = {
        id: m,
        tag_name: tag_name
      };
      console.log('Tag', m);
      await db.saveTag(tag);
      }
    } catch (err) {console.log(err);}
}

const createEmployees = async () => {
  try {
    for (let n = 0; n <= 100; n++) {
      const name = lorem.generateWords(2);
      const employee = {
        id: n,
        name: name
      };
      console.log('Emp', n);
      await db.saveEmployee(employee);
    }
  } catch (err) {console.log(err);}
}

const generateCSV = async () => {
  const csvFile = fs.createWriteStream('./database/summaries.csv');
  writer.pipe(csvFile);
  for (let i = 0; i < 1e7 + 1; i++) {
    const paragraphLength = Math.floor(Math.random() * 2 + 2);
    const shortSummarySentenceLength = Math.floor(Math.random() * 4 + 3);
    const copyrightWordsLength = Math.floor(Math.random() * 2 + 2);
    const summary = lorem.generateParagraphs(paragraphLength);
    const short_summary = lorem.generateSentences(shortSummarySentenceLength);
    const year = Math.floor(Math.random() * 81) + 1940;
    const copyright = '©' + year + ' ' + lorem.generateWords(copyrightWordsLength) + ' (P)' + (year + Math.floor(Math.random() * 5 + 4)) + ' ' + lorem.generateWords(copyrightWordsLength);

    const employeeId = Math.floor(Math.random() * 100) + 1; // 100 external (1 indexed)
    let data = {
      id: i,
      summary: summary,
      short_summary: short_summary,
      copyright: copyright,
      employeeId: employeeId
    };
    if (i % 10000 === 0) { console.log('Writing', i)}
    if (!writer.write(data)) {
      await new Promise (resolve => writer.once('drain', resolve));
    }
  }
  writer.end();
}

const generateCSV2 = async () => {
  const csvFile2 = fs.createWriteStream('./database/summary_tag.csv');
  writer.pipe(csvFile2);
  counter = 0;
  for (let i = 0; i < 1e7 + 1; i++) {
    let tagQuantity = Math.floor(Math.random() * 5) + 1; // 1-5 tags
    for (let j = 0; j < tagQuantity; j++) {
      let data = {
        id: counter,
        summary_id: i,
        tag_id: Math.floor(Math.random() * 10000)
      };
      if (counter % 100000 === 0) { console.log('Writing', counter, i, data.tag_id); }
      if (!writer.write(data)) {
        await new Promise (resolve => writer.once('drain', resolve));
      }
      counter++;
    }
  }
  writer.end();
}


if (process.argv[2] === 'build') {
  db.initialize();
} else if (process.argv[2] === 'tags') {
  createTags();
} else if (process.argv[2] === 'employees') {
  createEmployees();
} else if (process.argv[2] === 'csv') {
  generateCSV();
} else if (process.argv[2] === 'save') {
  db.saveSummaries();
} else if (process.argv[2] === 'csv2') {
  generateCSV2();
} else if (process.argv[2] === 'save2') {
  db.saveSummaryTag();
}





