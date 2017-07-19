const process = require('process')
const path = require('path')
const AssetsPlugin = require('assets-webpack-plugin')
const assetsPluginInstance = new AssetsPlugin()
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
      app: ["./src/client/app.js", "./app/assets/stylesheets/app.scss"]
    },
    output: {
        path: __dirname + "/public/toddy/assets",
        filename: process.env.NODE_ENV == "production" ? "[name]-[hash].js" : "[name].js",
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
    plugins: [assetsPluginInstance, new ExtractTextPlugin({ // define where to save the file
      filename: '[name].css',
      allChunks: true,
    })]
};
