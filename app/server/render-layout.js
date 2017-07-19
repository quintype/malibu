const fs = require("fs");
const config = require("./publisher-config");
const _ = require("lodash");

const assets = JSON.parse(fs.readFileSync("webpack-assets.json"));

function assetPath(asset) {
  const path = _.get(assets, asset);
  if (path) {
    return [config.asset_host, path].join("");
  }
}

exports.renderLayout = function renderLayout(res, params){
  res.render("pages/layout", _.extend({
    assetPath: assetPath,
    content: "",
    title: "Sample Application"
  }, params))
}
