const _ = require("lodash");
const {assetPath} = require("../asset-helper");

exports.renderLayout = function renderLayout(res, params){
  res.render("pages/layout", _.extend({
    assetPath: assetPath,
    content: "",
    title: "Sample Application"
  }, params))
}
