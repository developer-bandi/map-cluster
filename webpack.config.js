const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./lib/index.js",
  output: {
    filename: "map-cluster.js",
    path: path.resolve(__dirname, "dist"),
    library: {
      name: "mapCluster",
      type: "commonjs",
    },
    globalObject: "this",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            configFile: path.resolve(__dirname, ".babelrc.js"),
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: "type", to: "type" }],
    }),
  ],
};
