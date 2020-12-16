const config = require("../../config.js");
const supertest = require('supertest');
const app = require("../../app.js");
const request = supertest(app);

async function isServerReturningHtmlPageOnSearch(){

  return await request.get('/tweets?message=trump');

}

module.exports = isServerReturningHtmlPageOnSearch;
