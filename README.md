# Audible Publishers Summary

This is an mock-up audible item page built during the Hack Reactor immersive's Front End Capstone project. This project is designed to maintain all original functionality and mimic the style of audible item page. This component of the project - Publisher's Summary Service - displayes the publisher's summary and copyright information for a given book.

## Related Projects

  - https://github.com/huang-pei-mei/title-service
  - https://github.com/huang-pei-mei/reviews-service
  - https://github.com/huang-pei-mei/price-service
  - https://github.com/huang-pei-mei/FEC-Agg.Review

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage
Install dependencies (See section below)
Run 'npm run webpack' to transpile .jsx files.
Run 'npm start' and navigate to localhost:1220 in your browser.

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

Node 6.13.0
npm v3.5.2
MongoDB v3.6.3


## Development
The database folder includes two helper functions which generates random data and populates into the database. The first helper function which generates random data is located in database/populateData.js file. The mongo db setup file which specifies the database schema and a save function that loads the generated data into the database is located in database/index.js file

The App componet which includes RenderDom is located in client/src/index.js file. Using the following url `http://localhost:1220/api/summary/${bookId}` the app component fetches publisher's review and copyright information from the server to be rendered.

The server with two endpoints are located in server/index.js. The first endpoint is `/api/summary/:bookId` This takes a random book id and return an object with the following data {id: Number, summary: String, short_summary: String, copyright: String}.

The second endpont`http://localhost:1220/api/summaries/:bookIds` will accept array of book ids and returns an array of objects with the following data for each of the book ids {id: Number, summary: String, short_summary: String, copyright: String}

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```


