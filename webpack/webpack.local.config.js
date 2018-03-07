const webpack = require('webpack');
const config = require('./webpack.config.js');

process.env.NODE_ENV = 'development';

module.exports = {
  devtool: 'source-map',

  entry: {
    app: [
      'event-source-polyfill',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?reload=true',
    ].concat(config.entry.app),
  },

  output: config.output,

  resolve: config.resolve,

  plugins: config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]),

  module: config.module,
};
