const webpack = require('webpack');

module.exports = {
  entry: [
    './public/js/index.js'
  ],
  output: {
    path: __dirname + '/public/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
