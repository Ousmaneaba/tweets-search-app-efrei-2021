const config = require("../config.js");
const supertest = require('supertest');
const app = require("../app.js");

describe("charge test", () => {

    for(let i = 0; i < 1000; i++){

        let div = Math.trunc(i/17);

        if((i%17) == 0){

            setTimeout(()=>{}, 1000 * div);
        }

        it('attempt ' + i + ' ( slept for ' + div + "s )", async () => {

            let hasError = true;
    
            await supertest(app).get('/tweets?message=trump')
            .then(function(result){
                if(result.headers['content-type'].includes("text/html")){
                hasError = false;
                }
            })
          .catch(function(err){
          });
            
            expect(hasError).toEqual(false);
        });
    }

});