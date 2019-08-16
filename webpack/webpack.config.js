const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const dist = path.resolve(__dirname, "dist");

module.exports = {
  mode: "production",
  entry: {
    index: "./index.js"
  },
  module: {
    rules: [
      {
        test: /^(?:(?!_bg).)*\.wasm$/i,
        type: "javascript/auto",
        use: "wasm-interface-types-loader",
      },
    ],
  },
  output: {
    path: dist,
    filename: "[name].js"
  },
  devServer: {
    contentBase: dist,
  },
  plugins: [
    new CopyPlugin([
      path.resolve(__dirname, "static")
    ]),
  ]
};
