const fs = require("fs");
const config = require("quintype-toddy-libs/server/publisher-config");
const assets = JSON.parse(fs.readFileSync("asset-manifest.json"));

exports.assetPath = function assetPath(asset) {
  const path = assets[asset];
  if (path) {
    return [config.asset_host, path].join("");
  }
}

exports.readAsset = function readAsset(asset) {
  return fs.readFileSync("public" + assets[asset])
}
