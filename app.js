"use strict";
require('node-jsx').install({harmony: true})

const {generateRoutes, matchBestRoute} = require("./src/isomorphic/routes");

console.log(matchBestRoute("/", generateRoutes()));
console.log(matchBestRoute("/sect", generateRoutes()));
console.log(matchBestRoute("/sect/sub-sect", generateRoutes()));
console.log(matchBestRoute("/sect/foo", generateRoutes()));
console.log(matchBestRoute("/sect/sub-sect/foo", generateRoutes()));
