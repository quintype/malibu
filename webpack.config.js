const process = require('process')
const path = require('path')
const AssetsPlugin = require('assets-webpack-plugin')
const assetsPluginInstance = new AssetsPlugin()
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function outputFileName(suffix) {
  return process.env.NODE_ENV == "production" ? `[name]-[hash].${suffix}` : `[name].${suffix}`;
}

module.exports = {
    entry: {
      app: "./app/client/app.js"
    },
    output: {
        path: __dirname + "/public/toddy/assets",
        filename: outputFileName("js"),
        publicPath: "/toddy/assets/"
    },
    module: {
      rules: [
        {
          test: /\.(sass|scss)$/,
          loader: ExtractTextPlugin.extract('css-loader!sass-loader')
        }
      ]
    },
    plugins: [assetsPluginInstance, new ExtractTextPlugin({
      filename: process.env.NODE_ENV == "production" ? `[name]-[contenthash:20].css` : `[name].css`,
      allChunks: true,
    })]
};
