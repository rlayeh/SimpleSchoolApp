require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.resolve('dist');
const APP_DIR = path.resolve('src/main.js');

module.exports = {
  entry: {
    app: APP_DIR,
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: `/${process.env.DOCKER_CONTEXT_PATH || process.env.CONTEXT_PATH || ''}/`.replace(/\/{2,}|\/$/g, '/'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'static/index.html',
    }),
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
    ]),
    new webpack.DefinePlugin({
      'process.env.CONTEXT_PATH': JSON.stringify(process.env.DOCKER_CONTEXT_PATH || process.env.CONTEXT_PATH),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015'],
          },
        },
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  },
};
