const webpackConfig = require("@quintype/build/config/webpack");
const path = require("path");

const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const svgSprite = {
  test: /\.svg$/,
  loader: "svg-sprite-loader",
  options: {
    extract: true,
    publicPath: "/",
    symbolId: filePath => {
      return path
        .basename(filePath)
        .replace(".svg", "")
        .toLowerCase();
    },
    spriteFilename: process.env.NODE_ENV === "production" ? "sprite-[hash].svg" : "sprite.svg",
    esModule: false
  }
};

webpackConfig.module.rules.push(svgSprite);
webpackConfig.module.rules.find(rule => rule.loader === "file-loader").exclude = [/app\/assets\/icons\/[a-z-]+\.svg$/];

const svgPlugin = () => new SpriteLoaderPlugin();

webpackConfig.plugins.push(svgPlugin());

module.exports = {
  ...webpackConfig
};
