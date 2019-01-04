const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HappyPack = require('happypack');
var webpack = require('webpack');
var path = require('path')

module.exports = {
  mode: 'development',
  entry: './main.js',
  output: {
    filename: '[name].js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            }
          }
          
        ],
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      PAGE_NAME: JSON.stringify(require('./package.json').name)
    }),
    new HappyPack({
        id: 'babel',
        cache: false,
        loaders: [{
            loader: 'babel-loader?cacheDirectory=true', 
        }]// 和rules里的配置相同
    }),
  ],
  devServer: {
    host:'localhost',
    compress:true, 
    port:8085, 
  },
  devtool: '#source-map'
};