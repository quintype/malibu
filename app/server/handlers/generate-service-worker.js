const {generateRoutes} = require('../routes');
const {assetPath, readAsset} = require("../asset-helper");

const serviceWorkerContents = readAsset("serviceWorkerHelper.js");

function generateServiceWorker(req, res, {config}) {
  res.header("Content-Type", "application/javascript");
  res.header("Cache-Control", "public,max-age=300");
  res.render("js/service-worker", {
    routes: generateRoutes(config),
    serviceWorkerHelper: serviceWorkerContents,
    assetPath: assetPath
  });
  return new Promise((resolve) => resolve());
}

exports.generateServiceWorker = generateServiceWorker;
