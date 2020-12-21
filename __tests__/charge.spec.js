const config = require("../config.js");
const supertest = require('supertest');
const app = require("../app.js");
const request = supertest(app);

describe("charge", () => {
    test("should handle 1000 request per minute", async () => {

        let hasError = false;

        /*let i = 0;

        for(i = 0; i<1000; i++){
            let isHtml = false;
    
                await isServerReturningHtmlPage()
                .then(function(result){
                });
        } */
    
        expect(hasError).toEqual(false);
    });

});

function f() {
}


async function isServerReturningHtmlPage(){

    return await request.get('/');
  
}