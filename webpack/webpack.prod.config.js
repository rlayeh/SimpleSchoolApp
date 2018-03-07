const webpack = require('webpack');
const config = require('./webpack.config.js');

process.env.NODE_ENV = 'production';

module.exports = {
  devtool: 'cheap-module-source-map',

  entry: {
    app: config.entry.app,
  },

  output: config.output,
  resolve: config.resolve,

  plugins: config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
  ]),

  module: config.module,
};
