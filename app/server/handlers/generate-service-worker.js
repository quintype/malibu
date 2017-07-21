const {generateRoutes} = require('../routes');
const {assetPath, readAsset} = require("../asset-helper");

function generateServiceWorker(req, res, {config}) {
  res.header("Content-Type", "application/javascript");
  res.header("Cache-Control", "public,max-age=3600");
  res.render("js/service-worker", {
    routes: generateRoutes(config),
    serviceWorkerHelper: readAsset("serviceWorkerHelper.js"),
    assetPath: assetPath
  });
  return new Promise((resolve) => resolve());
}

exports.generateServiceWorker = generateServiceWorker;
