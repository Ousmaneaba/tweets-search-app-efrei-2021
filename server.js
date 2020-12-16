const app = require("./app.js");
const config = require('./config.js');

const PORT = config.port;
const HOST = config.host;

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
