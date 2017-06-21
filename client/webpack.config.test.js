const merge = require('webpack-merge');
const base = require('./webpack.config.base');


module.exports = merge(base, {
  output: {
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: [
      {
        test: /^((?!\.module).)*\.css$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap',
        ],
      },
      {
        test: /\.module\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', // eslint-disable-line max-len
          'postcss-loader',
        ],
      },
    ],
  },
});
