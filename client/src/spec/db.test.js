const { Summary, mongoose } = require("../../../database/index.js");
const mockingoose = require('mockingoose');
import "babel-polyfill";

describe('database', () => {
  afterAll(async done => {
    mongoose.connection.close();
});

  describe('Summary model', () => {

    it('should return the summary with find', () => {
      const _summary = {
        id: 12,
        summary: 'summary',
        short_summary: 'test short summary',
        copyright: 'copyright'
      };

      mockingoose(Summary).toReturn(_summary, 'find');

      return Summary.find({ id: '12' }).then(summary => {
        expect(JSON.parse(JSON.stringify(summary))).toMatchObject(_summary);
      });
    });

    it('should return summary with updated information', () => {
      const _summary = {
        id: 12,
        summary: 'summary',
        short_summary: 'test short summary',
        copyright: 'copyright'
      };

      mockingoose(Summary).toReturn(_summary, 'update');

      return Summary
        .update({ summary: 'this is the updated summary' })
        .where({ id: '12' })
        .then(summary => {
          expect(JSON.parse(JSON.stringify(summary))).toMatchObject(_summary);
        });
    });
  });
});