const path = require("path");

module.exports = {
  name: "Drawing-Game",
  mode: "development",
  devtool: "eval",
  resolve: { extensions: [".js"] },
  module: {
    rules: [{ test: /\.js?/, loader: "babel-loader", options: { presets: ["@babel/preset-env"] }, exclude: path.join(__dirname, "node_modules") }],
  },
  entry: { app: "./src/public/index" },
  output: { path: path.join(__dirname, "dist"), filename: "index.js" },
};
