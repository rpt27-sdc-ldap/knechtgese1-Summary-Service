const LoremIpsum = require('lorem-ipsum').LoremIpsum;
const process = require('process');
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

for (let i = 0; i < 100; i++) {
  const paragraphLength = Math.floor(Math.random() * 2 + 2);
  const shortSummarySentenceLength = Math.floor(Math.random() * 4 + 3);
  const copyrightWordsLength = Math.floor(Math.random() * 2 + 2);
  const summary = lorem.generateParagraphs(paragraphLength);
  const short_summary = lorem.generateSentences(shortSummarySentenceLength);
  const year = Math.floor(Math.random() * 81) + 1940;
  const copyright = '©' + year + ' ' + lorem.generateWords(copyrightWordsLength) + ' (P)' + (year + Math.floor(Math.random() * 5 + 4)) + ' ' + lorem.generateWords(copyrightWordsLength);
  const tagQuantity = Math.floor(Math.random() * 4) + 1; // 1-5 tags
  const tags = [];
  for (let j = 0; j < tagQuantity; j++) {
    tags.push(Math.floor(Math.random() * 100)); // 100 external references to tags
  }
  const employeeID = Math.floor(Math.random * 100); // 100 external employee references

  const summaryData = {
    id: i,
    summary: summary,
    short_summary: short_summary,
    copyright: copyright,
    tags: tags,
    employeeID: employeeID
  };
  db.save(summaryData);
}

for (let m = 0; m < 100; m++) {
  const tagName = lorem.generateWords(1);
  const tag = {
    id: m,
    tagName: tagName
  };
  db.saveTag(tag);
}

for (let n = 0; n < 100; n++) {
  const name = lorem.generateWords(2);
  const employee = {
    id: n,
    name: name
  };
  db.saveEmployee(employee);
}