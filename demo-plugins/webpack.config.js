const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    main1: "./entry/main1.js", 
    main2: "./entry/main2.js"
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '',
    chunkFilename: '[name].[chunkhash].js',
    filename: '[name].js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  module: {
    rules:[
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
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new UglifyjsWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'test1.html',
      template: './index.html',
      chunks: ['./entry/main1'],
    }),
    new HtmlWebpackPlugin({
      filename: 'test2.html',
      template: './index.html',
      chunks: ['./entry/main2'],
    })
  ]
};



/*
const HtmlWebpackPlugin = require('html-webpack-plugin');
plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html',   // 指定产出的模板
        filename: 'base.html',          // 产出的文件名
        chunks: ['common', 'base'],     // 在产出的HTML文件里引入哪些代码块
        hash: true,                     // 名称是否哈希值
        title: 'base',                  // 可以给模板设置变量名，在html模板中调用 htmlWebpackPlugin.options.title 可以使用
        minify: {                       // 对html文件进行压缩
            removeAttributeQuotes: true // 移除双引号
        }
    })
]

*/