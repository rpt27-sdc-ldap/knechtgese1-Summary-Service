const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const save = require("./index.js");

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 10,
    min: 7
  },
  wordsPerSentence: {
    max: 16,
    min: 8
  }
});


for(let i = 0; i<100; i++){
  const paragraphLength = Math.floor(Math.random() * 2 + 1);
  const shortSummarySentenceLength = Math.floor(Math.random() * 3 + 2);
  const copyrightWordsLength = Math.floor(Math.random() * 2 + 5);
  // console.log(paragraphLength, shortSummarySentenceLength, copyrightWordsLength);

  const summary = lorem.generateParagraphs(paragraphLength);
  const short_summary = lorem.generateSentences(shortSummarySentenceLength);
  const year = Math.floor(Math.random() * 81) + 1940;

  const copyright = '©' + year + ' ' + lorem.generateWords(copyrightWordsLength);

  const summaryData = {
    id: i,
    summary: summary,
    short_summary: short_summary,
    copyright: copyright
  }
  save(summaryData, function(err, res){
    if(err){
      console.log(err);
    } else {
      console.log(res);
    }
  })
}

