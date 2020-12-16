const config = require("../../config.js");
const supertest = require('supertest');
const app = require("../../app.js");
const request = supertest(app);

async function isServerReturningHtmlPage(){

  return await request.get('/');

}

module.exports = isServerReturningHtmlPage;
