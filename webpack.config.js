const webpack = require("webpack");
const process = require('process');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const PUBLIC_PATH='/toddy/assets/';
const OUTPUT_DIRECTORY = __dirname + `/public/${PUBLIC_PATH}`;

const BABEL_PRESET = {
  loader: 'babel-loader',
  options: {
    presets: ['es2015-tree-shaking', 'react']
  }
};

const config = process.env.NODE_ENV == 'production' ? {
    outputFileName: (suffix) => `[name]-[hash:20].${suffix}`,
    sassLoader: ExtractTextPlugin.extract('css-loader?minimize=true!sass-loader'),
    cssFile: `[name]-[contenthash:20].css`,
    compressJSPlugins: [
      new UglifyJSPlugin()
    ],
    outputPublicPath: PUBLIC_PATH,
  } : {
    outputFileName: (suffix) => `[name].${suffix}`,
    sassLoader: 'style-loader!css-loader!sass-loader',
    cssFile: `[name].css`,
    compressJSPlugins: [
      new webpack.NamedModulesPlugin()
    ],
    outputPublicPath: "http://localhost:8080" + PUBLIC_PATH,
  };

module.exports = {
    entry: {
      app: "./app/client/app.js",
      serviceWorkerHelper: "./app/client/serviceWorkerHelper.sjs"
    },
    output: {
        path: OUTPUT_DIRECTORY,
        filename: config.outputFileName("js"),
        publicPath: config.outputPublicPath,
    },
    module: {
      rules: [
        { test: /\.jsx?$/, exclude: /node_modules/, use: BABEL_PRESET },
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
      new webpack.EnvironmentPlugin({ NODE_ENV: 'development'}),
      new ExtractTextPlugin({ filename: config.cssFile, allChunks: true }),
      new ManifestPlugin({ fileName: '../../../asset-manifest.json', publicPath: PUBLIC_PATH, writeToFileEmit: true })
    ].concat(config.compressJSPlugins),

    devServer: {
      headers: {"Access-Control-Allow-Origin": "*"}
    }
};
