const isLocalhost = require("../tests_functions/isLocalhost");
const config = require("../../config.js");

module.exports = () => {
  test("server must run on localhost", () => {
    expect(isLocalhost(config.host)).toEqual(true);
  });
};
