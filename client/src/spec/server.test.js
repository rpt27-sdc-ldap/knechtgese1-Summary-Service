const request = require('supertest')
const express = require('express');
const mongoose = require("mongoose");
const app = require('../../../server/index.js');
const mockingoose = require('mockingoose');
const { Summary } = require("../../../database/index.js");

import "babel-polyfill";


describe("Testing the summary api", () => {
  afterAll(async done => {
    mongoose.connection.close();
});

	it("get endpoint should return summary from db", async () => {
    const _summary = {
      id: 12,
      summary: 'summary',
      short_summary: 'test short summary',
      copyright: 'copyright'
    };

    mockingoose(Summary).toReturn(_summary, 'find');
		await request(app).get('/api/summary/:12').expect(200)
		.then((response) => {
      expect(JSON.parse(response.text)).toMatchObject(_summary);
     });
	});

  it("get endpoint should return HTTP 500 when db fails", async () => {
    mockingoose(Summary).toReturn(new Error('database error'), 'find');
		await request(app).get('/api/summary/:12').expect(500).
    then((response) => {
      expect(response).toMatchObject({});
    });
	});

  it('default get should return 200', async () => {
    await request(app).get('/').expect(200);
  })

});