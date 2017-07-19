const process = require('process')
const path = require('path')
const AssetsPlugin = require('assets-webpack-plugin')
const assetsPluginInstance = new AssetsPlugin()

module.exports = {
    entry: {
      app: "./src/client/app.js",
    },
    output: {
        path: __dirname + "/public/toddy/assets",
        filename: process.env.NODE_ENV == "production" ? "[name]-[hash].js" : "[name].js",
        publicPath: "/toddy/assets/"
    },
    plugins: [assetsPluginInstance]
};
