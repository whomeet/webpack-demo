var path = require('path');
var glob = require("glob")
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var publicPath = '';
var fs = require('fs');

let rootPath = './entry'

//根据文档结构读入口
function getEntry() {
  var jsPath = path.resolve(rootPath);
  var dirs = fs.readdirSync(jsPath);
  var matchs = [], files = {};
  dirs.forEach(function (item) {
    var pathname = path.resolve(rootPath,item);
    var stat = fs.lstatSync(pathname);
    matchs = item.match(/(.+)\.js$/);
    if(!stat.isDirectory()&&matchs){
        files[matchs[1]] = [pathname];
    }
    else if(stat.isDirectory()) {
      var dirs = fs.readdirSync(path.resolve(rootPath,pathname));
      dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        if (matchs) {
        files[matchs[1]] =[path.resolve(rootPath, pathname, item)];
      }
      });
    }
          else{}

  });
  return files;
}

module.exports = {
  // string | object | array
  entry: './entry/main1.js',
  entry: ["./entry/main1.js", "./entry/main2.js"],
  entry: {
    bundle1: path.resolve(__dirname, "./entry/main1.js"),
    bundle2: path.resolve(__dirname, "./entry/main2.js"),
  },
  entry: getEntry(),
  output: {
    filename: 'bundle.js',
    // 占位符来动态生成
    filename: '[name].js',
    filename: "[id].bundle.js",
    filename: "[name].[hash].bundle.js",
    filename: "[chunkhash].bundle.js"
  },
  output: {
    //输出文件的目标路径
    path: path.resolve(__dirname, './dist'),
    //加载资源的相对路径
    publicPath: '',
    //附加分块的文件名模板，按需加载chunk的输出文件
    chunkFilename: '[name].[chunkhash].js',
    //每个输出文件的名称，必填
    filename: '[name].js'
  },
  module: {
    rules:[
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
          }
        ]
      }
    ]
  }
};



/*
1、单入口文件时，output.filename才能是静态名称，多入口时，输出文件必须给每个bundle一个唯一名称，通过[]占位符,来让入口和出口对应
2、publicPath 也是一个非常重要的配置项，主要是在加载一些资源时对应的路径，也就是此输出目录对应的公开 URL。
如果是相对路径的话，则是相对于html页面来，比如“/”就是html下的目录。
当然正式环境下，我们可能会把一些静态资源都传到CDN上，这样我们就需要把这个publicPath配成我们cdn的路径，否则就找不到相应的资源了
默认值是一个空字符串 “”。
3、chunkFilename与filename类似，不过filename是对应有入口文件的，chunkFilename则是我们通过 CommonsChunkPlugin这类的插件生成的文件的输出名
*/