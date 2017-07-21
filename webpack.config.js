const process = require('process')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require("webpack");

const PUBLIC_PATH='/toddy/assets/';

const config = process.env.NODE_ENV == 'production' ? {
    outputFileName: (suffix) => `[name]-[hash:20].${suffix}`,
    sassLoader: ExtractTextPlugin.extract('css-loader!sass-loader'),
    cssFile: `[name]-[contenthash:20].css`,
    compressJSPlugins: [
      new webpack.optimize.UglifyJsPlugin()
    ],
  } : {
    outputFileName: (suffix) => `[name].${suffix}`,
    sassLoader: 'style-loader!css-loader!sass-loader',
    cssFile: `[name].css`,
    compressJSPlugins: [],
  };

module.exports = {
    entry: {
      app: "./app/client/app.js",
      serviceWorkerHelper: "./app/client/serviceWorkerHelper.js"
    },
    output: {
        path: __dirname + `/public/${PUBLIC_PATH}`,
        filename: config.outputFileName("js"),
        publicPath: PUBLIC_PATH
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react']
            }
          }
        },
        { test: /\.(sass|scss)$/, loader: config.sassLoader },
        {
          test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
          loader: "file-loader",
          query: {
            context: './app/assets',
            name: config.outputFileName("[ext]")
          }
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin({ filename: config.cssFile, allChunks: true }),
      new ManifestPlugin({ fileName: '../../../asset-manifest.json', publicPath: PUBLIC_PATH, writeToFileEmit: true })
    ].concat(config.compressJSPlugins)
};
