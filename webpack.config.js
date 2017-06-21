'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const srcPath = path.join(__dirname, 'src');
const cssLoaders = [
  {
    loader: "css-loader",
    options: {
      modules: true,
      localIdentName: '[local]__[hash:base64:10]',
      sourceMap: true

    }
  },
  {
    loader: "sass-loader",
    options: {
      sourceMap: true,
      sourceMapContents: true
    }
  }
];

let sourceMap = process.env.NODE_ENV == 'development' ?
  'source-map' : false;

let entry = process.env.NODE_ENV == 'development' ?
  [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './app.js'
  ] : './app.js';

module.exports = {
  context: path.resolve(__dirname, './src'),
  devtool: sourceMap,
  entry: entry,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    contentBase: path.resolve(__dirname, './src')
  },
  module: {
      rules: [
          {
          enforce: "pre",
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "eslint-loader",
        },
        {
          test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: { presets: ['es2015', 'react'] }
        },
        {
          test: /\.(png|jpg|svg)$/i,
            loader: 'url-loader',
            options: {
              name: 'assets/images/[name].[ext]',
              limit: 25000
            }
        },
        {
          test: /\.scss$/,
          use:  ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: cssLoaders
          })
        },
      ]
   },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true
    })
  ]
};
