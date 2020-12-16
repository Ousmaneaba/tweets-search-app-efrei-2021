const config = require("../../config");
const isServerReturningHtmlPage = require("../tests_functions/isServerReturningHtmlPage");

module.exports = () => {
  test("server must be returning an html page", async () => {

    let isHtml = false;

    await isServerReturningHtmlPage()
      .then(function(result){
        if(result.headers['content-type'].includes("text/html")){
          isHtml = true;
        }
      });
    expect(isHtml).toEqual(true);
  });
};
