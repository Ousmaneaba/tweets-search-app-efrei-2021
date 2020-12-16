const config = require("../../config");
const isServerReturningHtmlPageOnSearch = require("../tests_functions/isServerReturningHtmlPageOnSearch");

module.exports = () => {
  test("server must be returning an html page on search", async () => {

    let isHtml = false;

    await isServerReturningHtmlPageOnSearch()
      .then(function(result){
        if(result.headers['content-type'].includes("text/html")){
          isHtml = true;
        }
      });
    expect(isHtml).toEqual(true);
  });
};
