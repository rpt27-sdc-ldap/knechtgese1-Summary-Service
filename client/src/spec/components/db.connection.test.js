//require("dotenv").config();
const mongoose = require("mongoose");
import summaryData from "../../../../data.js";
import "babel-polyfill";

describe("Connection", () => {

  beforeAll (async () => {
    await mongoose.connect('mongodb://localhost/summary', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
  });

  it("Retrieve article by Id", async () => {
    const _id = "60973956197222ffe5e26ad4";
    const expectedText = "Ea ea labore eiusmod esse aute laboris ipsum eiusmod nulla exercitation. Commodo ipsum sit irure pariatur Lorem consectetur ipsum reprehenderit mollit reprehenderit est officia consectetur labore. Enim nostrud in labore irure et et et elit sint dolor labore in voluptate adipisicing."
    const article =  await db.summaries.find({_id});
    expect(article.short_summary).toBe(expectedText);
  });

  afterAll(async done => {
    mongoose.disconnect();
    done();
});

});


// // import "babel-polyfill";

// import  MongoClient  from "mongodb";

// let client;
// let db;

// beforeAll(async () => {
//   client = await MongoClient.connect(global.MONGO_URI);
//   db = await client.db(global.MONGO_DB_NAME);
// });

// // afterAll(async () => {
// //   await client.close();
// // });

// beforeEach(async () => {
//   // Reset the database before each test
//   await db.dropDatabase();
// });

// it("should aggregate docs from collection", async () => {
//   const files = db.collection("files");

//   await files.insertMany([
//     { type: "Document" },
//     { type: "Video" },
//     { type: "Image" },
//     { type: "Document" },
//     { type: "Image" },
//     { type: "Document" },
//   ]);

//   const topFiles = await files
//     .aggregate([
//       { $group: { _id: "$type", count: { $sum: 1 } } },
//       { $sort: { count: -1 } },
//     ])
//     .toArray();

//   expect(topFiles).toEqual([
//     { _id: "Document", count: 3 },
//     { _id: "Image", count: 2 },
//     { _id: "Video", count: 1 },
//   ]);
// });