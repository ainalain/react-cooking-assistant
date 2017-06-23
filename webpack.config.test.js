var nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  module: {
        rules: [
            { test: /\.js$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              options: { presets: ['es2015', 'react'] }
            },
            {
              test: /\.(png|ico|jpg|svg)$/i,
                loader: 'url-loader',
                options: {
                  name: 'assets/images/[name].[ext]',
                  limit: 25000
                }
            },
            { test: /\.scss$/, loaders: ['css-loader/locals?modules', 'sass-loader'] },
            { test: /\.css$/, loaders: ['css-loader/locals?modules'] }
        ]
    }
};
