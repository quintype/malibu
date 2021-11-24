const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const path = require("path");
const webpackConfig = require("@quintype/build/config/webpack");

const { plugins, output, module: webpackModule } = webpackConfig;
if (process.env.NODE_ENV !== "production") output.path = path.resolve("./public");
const getSpritePlugin = () => new SpriteLoaderPlugin({ plainSprite: true });
const insertIntoIndex = (arr, index, newItem) => [...arr.slice(0, index), newItem, ...arr.slice(index)];
const enhancedPlugins = insertIntoIndex(plugins, 1, getSpritePlugin());
const spriteRule = {
  test: /\.svg$/,
  use: [
    {
      loader: "svg-sprite-loader",
      options: {
        extract: true,
        spriteFilename: process.env.NODE_ENV === "production" ? "svg-sprite-[hash].svg" : "svg-sprite.svg",
        esModule: false,
      },
    },
    "svg-transform-loader",
    "svgo-loader",
  ],
};

const enhancedRules = insertIntoIndex(webpackModule.rules, 5, spriteRule);
enhancedRules[8] = {
  test: /\.(jpe?g|gif|png|woff|woff2|eot|ttf|wav|mp3|ico|mp4)$/,
  loader: "file-loader",
  options: { context: "./app/assets", name: "[name].[ext]" },
};

module.exports = {
  ...webpackConfig,
  module: { ...webpackModule, ...{ rules: enhancedRules } },
  plugins: enhancedPlugins,
};
