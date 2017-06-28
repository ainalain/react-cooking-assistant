'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const srcPath = path.join(__dirname, 'src');
const iconsPath = path.join(srcPath,'assets', 'icons');
console.log('iconsPath: ', iconsPath);
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

let entry = process.env.NODE_ENV == 'development' ?
  [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, 'src/app.js')
  ] : path.resolve(__dirname, 'src/app.js');

module.exports = {
  context: path.resolve(__dirname, './src'),
  devtool: 'source-map', //remove it later in production
  entry: entry,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/'
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
          test: /\.(png|jpg)$/i,
            loader: 'url-loader',
            options: {
              name: 'assets/images/[name].[ext]',
              limit: 25000
            }
        },
        {
          test: /\.(woff|woff2)$/,
            loader: 'url-loader',
            options: {
              limit: 50000,
              mimetype: 'application/font-woff',
              name: 'assets/fonts/[name].[ext]',
            }
        },
        {
          test: /\.svg$/,
          include: path.join(srcPath,'assets', 'icons'),
          loaders: [
            'svg-sprite-loader?' + JSON.stringify({
              name: '[name].[ext]',
              prefixize: true
            }),
            'svgo-loader?' + JSON.stringify({
              plugins: [
                { removeTitle: true },
                { convertPathData: false },
                { removeUselessStrokeAndFill: true }
              ]
            })
          ]
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
