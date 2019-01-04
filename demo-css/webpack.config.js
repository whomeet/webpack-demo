var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    // bundle1: path.resolve(__dirname, "./main1.js"),
    // bundle2: path.resolve(__dirname, "./main2.js"),
    bundle: path.resolve(__dirname, "./main1.jsx"),
  },
  output: {
    filename: '[name].js'
  },
  module: {
    // loaders: [
    //   {
    //     test: /\.css$/,
    //     loader: "style!css!postcss"
    //   },
    // ],
    rules:[
      { 
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
              loader: 'css-loader',
              options: {
                  modules: true,
              }
          },
        ] 
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
        use: ExtractTextPlugin.extract({
          use: "css-loader"
        }),
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({filename: '[name].css', allChunks: true}),
  ]
};
