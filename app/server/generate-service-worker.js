const client = require("./client");

const {generateRoutes} = require('./routes');

function generateServiceWorker(req, res) {
  res.header("Content-Type", "application/javascript");
  var config;
  client.getConfig()
    .then((c) => config = c)
    .then(() => {
      res.render("js/service-worker", {
        routes: generateRoutes(config)
      });
    })
}

exports.generateServiceWorker = generateServiceWorker;
