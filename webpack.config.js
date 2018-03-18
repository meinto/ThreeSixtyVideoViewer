/* eslint-disable */
const path = require('path');
const env = require('yargs').argv.env;
const webpack = require('webpack');
const pkg = require('./package.json');
const plugins = [];

module.exports = {
  entry: path.resolve(__dirname, pkg.main),
  devtool: 'source-map',
  mode: env === 'build' ? 'production' : 'development',
  output: {
    library: pkg.name,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    path: path.resolve(__dirname, 'dist'),
    filename: env === 'build' ? 'ThreeSixtyVideoViewer.min.js' : 'ThreeSixtyVideoViewer.js',
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js'],
  },
  devServer: {
    contentBase: './dist',
  },
  plugins,
};
