const webpack = require('webpack');
const path = require ('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = require('./webpack.config.js');

// production env
module.exports.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    }
  })
);

// compress the js file
module.exports.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    comments: false,
    compressor: {
      warnings: false
    }
  }),
  new CleanWebpackPlugin(['bundle.css', 'bundle.js'], {
    root: __dirname + '/dist',
    verbose: true,
    dry: false
  })
);
