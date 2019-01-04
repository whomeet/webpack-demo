var path = require('path');
var glob = require("glob")
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var publicPath = '';
var fs = require('fs');

let entryObj = {}

function getEntry () {
  let globPath = 'src/**/html/*.html'
  let pathDir = 'src(\/|\\\\)(.*?)(\/|\\\\)html'
  let files = glob.sync(globPath)
  let dirname, entries = []
  for (let i = 0; i < files.length; i++) {
    dirname = path.dirname(files[i])
    entries.push(dirname.replace(new RegExp('^' + pathDir), '$2'))
  }
  return entries
}

function addEntry () {
  getEntry().forEach(item => {
    entryObj[item] = resolve(__dirname, '/', item, 'index.js')
  })
  return entryObj
}

module.exports = {
  //string | object | array
  entry: './main1.main.js',
  entsy: ["./main1/main1.js", "./main2/main2.js"],
  entry: {
    bundle1: path.resolve(__dirname, "./main1/main1.js"),
    bundle2: path.resolve(__dirname, "./main2/main2.js"),
  },
  output: {
    filename: '[name].js'
  },
  output: {
    //输出文件的目标路径
    path: path.resolve(__dirname, './dist'),
    //输出解析文件的目录
    publicPath: env == 'alpha' ? '/' : f2eci["urlPrefix"],
    //长效缓存，附加分块的文件名模板
    chunkFilename: '[name].[chunkhash].js',
    //入口分块的文件名模板
    filename: '[name].js'
  },
  module: {
    rules:[
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'main1/index.html',
      template: './index.html',
      inject: true,
      minify: {
          removeComments: true,
          collapseWhitespace: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'main2/index.html',
      template: './index.html',
      inject: true,
      minify: {
          removeComments: true,
          collapseWhitespace: true
      }
    })
  ]
};
