var fs = require("fs");
var yaml = require("js-yaml");

var publisher = yaml.safeLoad(fs.readFileSync("config/publisher.yml"));

module.exports = publisher;
