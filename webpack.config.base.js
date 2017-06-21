const autoprefixer = require('autoprefixer');
const simpleVars = require('postcss-simple-vars');
const nested = require('postcss-nested');


module.exports = {
  module: {
    loaders: [
      {
        test: /\.json$/,
        loaders: ['json-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loaders: ['url-loader?limit=10000'],
      },
    ],
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 version', 'IE 10'],
    }),
    simpleVars,
    nested,
  ],
};
