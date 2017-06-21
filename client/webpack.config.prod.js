const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const base = require('./webpack.config.base');


module.exports = merge(base, {
  devtool: 'cheap-module-source-map',
  entry: './src/index',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle-[hash].js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false,
      },
    }),
    new ExtractTextPlugin('style-[hash].css', { allChunks: true }),
    function replaceBundleNameInIndex() {
      this.plugin('done', (stats) => {
        const input = fs.readFileSync('./index.prod.html', { encoding: 'utf-8' });
        const output = input
          .replace(/bundle.js/, `bundle-${stats.hash}.js`)
          .replace(/style.css/, `style-${stats.hash}.css`);
        fs.writeFileSync('./index.html', output);
      });
    },
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /^((?!\.module).)*\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader'
        ),
      },
      {
        test: /\.module\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader' // eslint-disable-line max-len
        ),
      },
    ],
  },
});
