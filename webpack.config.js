// webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: 'bundle.js',
  // },
  module: {
    defaultRules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  devServer: {
    open: true,
  },
};