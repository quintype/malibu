
var Client = require("quintype-backend").Client;
var config = require("./publisher-config");

module.exports = new Client(config.sketches_host);
