const Client = require("quintype-backend").Client;
const config = require("./publisher-config");

module.exports = new Client(config.sketches_host);
