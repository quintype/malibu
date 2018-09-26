const { webpackConfig } = require("@quintype/build/webpack-config");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const config = Object.assign({node: {Buffer: false}}, webpackConfig("quintype-malibu", __dirname));

if (process.env.ANALYZE_STATS === 'true') {
  config.plugins.push(new BundleAnalyzerPlugin({
    generateStatsFile: true,
    analyzerMode: "static",
    statsFilename: "prod-stats.json"
  }));
}

module.exports = config;
