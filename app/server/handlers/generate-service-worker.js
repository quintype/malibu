const _ = require("lodash");
const fs = require("fs");
const process = require("process");

const config = require("../publisher-config");
const {generateRoutes} = require('../routes');

const assets = JSON.parse(fs.readFileSync("webpack-assets.json"));
function serviceWorkerHelperContents() {
  const filePath = _.get(assets, ["serviceWorkerHelper", "js"]);
  return fs.readFileSync(process.cwd() + "/public" + filePath)
}

function assetPath(asset) {
  const path = _.get(assets, asset);
  if (path) {
    return [config.asset_host, path].join("");
  }
}

function generateServiceWorker(req, res, {config}) {
  res.header("Content-Type", "application/javascript");
  res.header("Cache-Control", "public,max-age=3600");
  res.render("js/service-worker", {
    routes: generateRoutes(config),
    serviceWorkerHelper: serviceWorkerHelperContents(),
    assetPath: assetPath
  });
  return new Promise((resolve) => resolve());
}

exports.generateServiceWorker = generateServiceWorker;
