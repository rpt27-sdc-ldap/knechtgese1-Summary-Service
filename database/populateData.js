const LoremIpsum = require("lorem-ipsum").LoremIpsum;
<<<<<<< Updated upstream
const { save } = require("./index.js");

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 10,
    min: 2
=======
const { Summary, mongoose } = require("./index.js");

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 6,
    min: 4
>>>>>>> Stashed changes
  },
  wordsPerSentence: {
    max: 16,
    min: 8
  }
});

<<<<<<< Updated upstream

for(let i = 0; i<100; i++){
  const paragraphLength = Math.floor(Math.random() * 3 + 1);
=======
let save = (summaryData, callback) => {
  const query = { "id": summaryData.id };
  const update = { $set: {"id": summaryData.id, "summary": summaryData.summary, "short_summary": summaryData.short_summary, "copyright": summaryData.copyright } };
  const options = { upsert: true };
  Summary.updateOne(query, update, options, callback);
};


for(let i = 0; i<100; i++){
  const paragraphLength = Math.floor(Math.random() * 2 + 2);
>>>>>>> Stashed changes
  const shortSummarySentenceLength = Math.floor(Math.random() * 4 + 3);
  const copyrightWordsLength = Math.floor(Math.random() * 2 + 2);
  // console.log(paragraphLength, shortSummarySentenceLength, copyrightWordsLength);

  const summary = lorem.generateParagraphs(paragraphLength);
  const short_summary = lorem.generateSentences(shortSummarySentenceLength);
  const year = Math.floor(Math.random() * 81) + 1940;

<<<<<<< Updated upstream
  const copyright = '©' + year + ' ' + lorem.generateWords(copyrightWordsLength) + ' (P)'+(year + Math.floor(Math.random() * 4 + 3)) + ' ' + lorem.generateWords(copyrightWordsLength);
=======
  const copyright = '©' + year + ' ' + lorem.generateWords(copyrightWordsLength) + ' (P)'+(year + Math.floor(Math.random() * 5 + 4)) + ' ' + lorem.generateWords(copyrightWordsLength);
>>>>>>> Stashed changes

  const summaryData = {
    id: i,
    summary: summary,
    short_summary: short_summary,
    copyright: copyright
  }
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
  save(summaryData, function(err, res){
    if(err){
      console.log(err);
    } else {
<<<<<<< Updated upstream
      console.log(res);
    }
  })
=======
      console.log(i, ': ' + JSON.stringify(res));
      if(i===99) {
        mongoose.connection.close();
        process.exit();
      }
    }
  });



>>>>>>> Stashed changes
}

