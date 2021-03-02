const { produce } = require("immer");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const LoadablePlugin = require("@loadable/webpack-plugin");
const path = require("path");
module.exports = {
  modifyWebpackConfig: function({ defaultConfig }) {
    const config = produce(defaultConfig, function(draft) {
      draft.node = { Buffer: false };
      draft.entry.font = "./app/client/font.js";
      if (process.env.ANALYZE_STATS === "true") {
        draft.plugins.push(
          new BundleAnalyzerPlugin({
            generateStatsFile: true,
            analyzerMode: "static",
            statsFilename: "prod-stats.json"
          })
        );
      }
    });

    return {
      ...config,
      plugins: config.plugins.concat([new LoadablePlugin({ writeToDisk: true, filename: path.resolve("stats.json") })]),
      entry: Object.assign({}, config.entry, {
        topbarCriticalCss: "./app/isomorphic/components/header",
        navbarCriticalCss: "./app/isomorphic/components/header/nav-bar"
      })
    };
  },
  modifyBabelConfig: function({ defaultConfig, babelTarget, env }) {
    const config = produce(defaultConfig, draft => {
      draft.plugins.push(["@loadable/babel-plugin"]);
    });
    return { ...config };
  }
};
