const path = require('path');

module.exports = {
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: {
        loader: "babel-loader",
        options: {
          presets: ["es2015-tree-shaking", "react"],
          plugins: [
            ["react-css-modules", {
              webpackHotModuleReloading: process.env.NODE_ENV != "production",
              generateScopedName: "[name]__[local]__[hash:base64:5]"
            }]
          ]
        }
      } },
      {
        test: /\.m.(css|scss)$/,
        use: [{loader: "style-loader"}, {
          loader: "css-loader", options: { modules: true, importLoaders: 1, localIdentName: "[name]__[local]__[hash:base64:5]" },
        }, {
          loader: "postcss-loader",
          options: {
            ident: "postcss",
            sourceMap: true,
            plugins: (loader) => [
              require("autoprefixer"),
              require("precss")()
            ]
          }
        }],
        include: path.resolve(__dirname, "../")
      }
    ]
  }
};