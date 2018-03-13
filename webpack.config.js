const path = require("path");

module.exports = {
  // Entry point: direct app kicks off
  entry: "./src/app.js",

  // Output: where to output file
  output: {
    // Needs to be an absolute path:
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  },

  // loader: match pattern, and do something to matched files
  module: {
    rules: [{
      loader: "babel-loader",
      test: /\.js$/,
      exclude: /node_modules/
    }, {
      test: /\.s?css$/,
      use: [
        "style-loader",
        "css-loader",
        "sass-loader",
        "postcss-loader"
      ]
    }]
  },

  // converts babel source to react source in browser to debug
  devtool: "cheap-module-eval-source-map",

  devServer: {
    contentBase: path.join(__dirname, "public"),
    // This will enable routing on client side.
    historyApiFallback: true
  }
};
