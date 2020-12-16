const config = require("../../config.js");

function isLocalhost(){
  return (config.host === "0.0.0.0" || config.host === "localhost")?true:false;
}

module.exports = isLocalhost;
