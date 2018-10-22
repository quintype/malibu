const { webpackConfig } = require("@quintype/build/webpack-config");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const ShakePlugin = require("webpack-common-shake").Plugin;

const config = Object.assign(
  { node: { Buffer: false } },
  webpackConfig("quintype-malibu", __dirname)
);

config.plugins.push(new ShakePlugin());
config.plugins.push(
  new DuplicatePackageCheckerPlugin({
    verbose: true
  })
);

if (process.env.ANALYZE_STATS === "true") {
  config.plugins.push(
    new BundleAnalyzerPlugin({
      generateStatsFile: true,
      analyzerMode: "static",
      statsFilename: "prod-stats.json"
    })
  );
}

module.exports = config;
