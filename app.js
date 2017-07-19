var cluster = require('cluster');
var process = require("process");

if(cluster.isMaster) {
  var os = require('os');
  for (var i = 0; i < 4; i++) {
    cluster.fork();
  }
  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
    cluster.fork();
  });
} else {
  var startApp = require("./app/server/app.js");
  startApp().catch(function() {
    var sleep = require("sleep-promise");
    console.log("Worker died - Aborting");
    return new Promise((resolve) => resolve(cluster.worker.disconnect()))
      .then(() => sleep(250))
      .then(() => process.exit());
  });
}
