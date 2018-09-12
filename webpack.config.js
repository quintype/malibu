const { webpackConfig } = require("@quintype/build/webpack-config");

module.exports = Object.assign({node: {Buffer: false}}, webpackConfig("quintype-malibu", __dirname));
