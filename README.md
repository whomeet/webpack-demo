# webpack-demo

# 一、构建工具的发展

## 1、构建工具的作用

构建就是把源代码转换成发布到线上的可执行 JavaScrip、CSS、HTML 代码，包括如下内容。

代码转换：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等。

文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等。

代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。

模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件。

自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器。

代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。

自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。

构建其实是工程化、自动化思想在前端开发中的体现，把一系列流程用代码去实现，让代码自动化地执行这一系列复杂的流程。 构建给前端开发注入了更大的活力，解放了我们的生产力。

## 2、构建工具的发展

Npm Scripts：Npm Scripts（NPM脚本）是一个任务执行者。NPM是安装Node时附带的一个包管理器，Npm Script 则是 NPM 内置的一个功能，允许在 package.json 文件里面使用 scripts 字段定义任务，（常和webpack结合使用）。                         

Grunt：是一个任务执行者，有大量现成的插件，能管理任务之间的依赖关系，自动化地执行依赖任务。

Gulp：是一个基于流的自动化构建工具，可以管理和执行任务，还可以监听和读写任务。

Webpack：是一个模块化打包工具，Webpack专注于构建模块化项目，在Webpack里一切文件皆模块，通过 loader 转换文件，通过Plugin 注入钩子，最后输出由多个模块组合成的文件。

 Rollup：和Webpack类似但专注于ES6的模块打包工具。

 Parcel：web应用程序打包器，采用多核处理，速度快，不需要任何配置

## 3、构建工具的优缺点

（1）、Npm Script           
优点：npm scripts 的优点是内置，无需安装其他依赖           
缺点：功能太简单，虽然提供了 pre 和 post 两个钩子，但不能方便的管理多个任务之间的依赖。

（2）、Grunt
优点：灵活，它只负责执行我们定义好的任务；大量可复用插件封装好了常见的构建任务。            
缺点：集成度不高，要写很多配置后才可以用，无法做到开箱即用。

（3）、Gulp
优点：好用又不失灵活，既可以单独完成构建，也可以和其他工具搭配使用。            
缺点：集成度不高，要写很多配置后才可以用，无法做到开箱即用。  

（4）、Webpack
优点：专注于模块化项目，能做到开箱即用；有强大的扩展Plugin，完整好用又不失灵活；有良好的生态和维护团队。            
缺点：只能用于采用模块化开发的项目。

（5）、Rollup
优点：用于打包JavaScript库时比 Webpack 更有优势，因为其打包出来的代码更小、更快；使用Tree-shaking技术，没有冗余代码。            
缺点：Rollup 生态链不完善，不支持代码分割。            

（6）、Parcel
优点：零配置，默认支持模块热替换，真正的开箱即用；构建速度快；内置了常见场景的构建方案及其依赖，无需再安装各种依赖。            
缺点：不支持SourceMap，不利于代码调试；不支持剔除无效代码（TreeShaking）；一使用场景受限，目前只能用来构建用于运行在浏览器中的网页。     

建议：开发应用时使用Webpack，开发库时使用Rollup

# 二、Webpack基础知识

## 1、核心概念

Entry：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。

Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。

Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。

Loader：模块转换器，用于把模块原内容按照需求转换成新内容。

Plugin：扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。

Output：输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果。

## 2、 Webpack的工作流程

在Webpack中一切皆模块，Webpack能根据模块间的依赖关系将她它们组合打包，将浏览器不能直接运行的拓展语言（Scss，TypeScript等），转化为浏览器能使用的静态资源。

Webpack 启动后会从Entry里配置的Module开始递归解析 Entry 依赖的所有 Module。

每找到一个 Module， 就会根据配置的Loader去找出对应的转换规则，对 Module 进行转换后，再解析出当前 Module 依赖的 Module。

这些模块会以 Entry 为单位进行分组，一个 Entry 和其所有依赖的 Module 被分到一个组也就是一个 Chunk。

最后 Webpack 会把所有 Chunk 转换成文件输出。 在整个流程中 Webpack 会在恰当的时机执行 Plugin 里定义的逻辑。

## 3、入口和出口

入口（entry）

      入口起点，整个webpack打包的最初入口，从配置的这个或者这些文件开始，webpack开始查找对应的直接依赖和间接依赖，最终打包出对应的文件。

entry可以是字符串、对象和数组：

```js
entry: './entry/main1.js',  //字符串——单入口
entry: ["./entry/main1.js", "./entry/main2.js"],  //数组
entry: {  //对象
  bundle1: path.resolve(__dirname, "./entry/main1.js"),
  bundle2: path.resolve(__dirname, "./entry/main2.js"),
}, 
```
  

自动配置入口，无论增加多少个页面，都不需要修改入口文件

```js
//根据文档结构读入口
let rootPath = './entry'
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
entry: getEntry(),
```

输出（output）

在 Webpack 经过一系列处理并得出最终想要的代码后输出结果

```js
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
```

output配置项很多，以上是最基本的配置，项目中经常会用到的

## 4、resolve（解析）：设置配置模块如何解析

extensions

指定extension之后可以不用在require或是import的时候加文件扩展名,会依次尝试添加扩展名进行匹配

alias

配置别名可以加快webpack查找模块的速度：

每当引入jquery模块的时候，它会直接引入jqueryPath,而不需要从node_modules文件夹中按模块的查找规则查找

不需要webpack去解析jquery.js文件

## 5、Loader

Loader 用于对模块的源代码进行转换。loader 可以使你在 require() 或"加载"模块时预处理文件。webpack 可以使用 loader 来预处理文件，这允许你打包除 JavaScript 之外的任何静态资源。

test：匹配处理文件的扩展名的正则表达式

use：loader名称，就是你要使用模块的名称

include/exclude:手动指定必须处理的文件夹或屏蔽不需要处理的文件夹

options：为loaders提供额外的设置选项

### （1）babel-loader（转换编译）

```js
rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react'],
            cacheDirectory: true //缓存loader执行结果，避免重新编译
          }
        }
      }
    ]
```

babel-loader处理慢的解决方法：

exclude/include：排除 node_modules，转译尽可能少的文件

cacheDirectory：这会将转译的结果缓存到文件系统中，提速至少两倍

### （2）css-loader（样式）

Webpack允许你在JS文件中包含CSS，然后用CSS-loader来预处理CSS文件。您必须使用两个加载器来转换CSS文件。首先是CSS-loader来读取CSS文件，另一个是样式加载器将<style>标签插入HTML中。

```js
module: {
    rules:[
       {
            test:/\.css$/,
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
       }        
    ]
}
```

以上写法是设置了CSS modules，这可以为style样式增加作用域限制，防止样式被覆盖。

### （3）url-loader（文件）

url-loader 是文件预处理器，用来处理image文件。url-loader对未设置或者小于limit设置的图片进行转换，以base64的格式被img的src所使用；而对于大于limit byte的图片用file-loader进行解析。

```js
module: {
    rules:[
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
}
```

limit设置的必要性：

对于比较小的图片，使用base64编码，可以减少一次图片的网络请求

比较大的图片,使用base64加大了html页面的大小，会加大下载页面的大小

### （4）vue-loader（框架）

```js
const VueLoaderPlugin = require('vue-loader/lib/plugin')
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
      }
    ]
},
plugins: [
  new VueLoaderPlugin(),
]
```

VueLoaderPlugin（）插件的重要性？（Vue Loader v15及以上）

这个插件是必须的！ 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。

  2. 当页面运行时显示如下报错：

 [Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.

需要增加如下配置

```js
resolve: {

    alias: {

      'vue$': 'vue/dist/vue.common.js'

    }

  },
```

运行时构建不包含模板编译器，因此不支持 template 选项，只能用 render 选项，但即使使用运行时构建，在单文件组件中也依然可以写模板，因为单文件组件的模板会在构建时预编译为 render 函数。如果我们想使用template，我们不能直接在客户端使用npm install之后的vue。

   3. Vue中scoped css和css module比较

都可设置style作用域：

scoped

优点：scoped css可以直接在能跑起来的vue项目中使用，使用简单直接

缺点：scoped会使标签选择器渲染变慢很多倍，添加scoped会影响性能；如果用户在别处定义了相同的类名，也许还是会影响到组件的样式；根据css样式优先级的特性，scoped这种处理会造成每个样式的权重加重了：

css module

优点：CSS modules更安全更灵活，实现效果比scoped更优

缺点：会有冗余代码。

### 6、Plugins

webpack 有着丰富的插件接口(rich plugin interface)。webpack 自身的多数功能都使用这个插件接口。这个插件接口使 webpack 变得极其灵活。

（1）Html-webpack-plugin

    作用：自动生成html文件

    功能：多页面应用时不用为每个页面去编写html文件，可自动生成

```js
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
```
         

（2）Extract-text-webpack-plugin

    作用：分离CSS文件

    功能：它会将所有的入口 chunk(entry chunks)中引用的 *.css，移动到独立分离的 CSS 文件。因此，你的样式将不再内嵌到 JS bundle 中，而是会放到一个单独的 CSS 文件（即 styles.css）当中。 CSS     bundle 会跟 JS bundle 并行加载，可提高性能。

```js
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module: {
  rules: [
    {
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ],
      use: ExtractTextPlugin.extract({
        use: "css-loader"
      }),
    },
  ]
}
```


    

（3）Uglifyjs-webpack-plugin

         作用：压缩JS代码

    功能：

const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
plugins: [
    new UglifyjsWebpackPlugin(),
]

（4）HappyPack

    作用：提高构建速度

    功能：Happypack把任务分解给多个子进程去并发执行，子进程处理完成后再把结果发送给主进程。多进程并发构建，减少构建时间，提升性能

const HappyPack = require('happypack');
plugins: [
    new HappyPack({
        id: 'babel',
        cache: false,
        loaders: [{
            loader: 'babel-loader?cacheDirectory=true', 
        }]// 和rules里的配置相同
    }),
]

### 7、代码分割和代码拆分

webpack 的代码分割功能能将代码分成多个 bundle，从而实现按需加载或并行加载。相对于大型的app来说，所有的代码放到一个单独的文件会导致低效率的，webpack提供拆分成块的这种机制， 尤其是在某些条件小才会有需求的代码块，这些代码块应该在需要的时候加载，不需要的时候就不加载。

有 3 种常用的代码分割方法：

入口点：在配置文件中通过 entry 手动指定分割

去重：使用 CommonsChunkPlugin  插件抽取重复模块(webpack4.0不再使用)新版本使用SplitChunksPlugin

动态加载：通过模块中的内联函数调用实现

可用于分割代码的其它插件和加载器：

ExtractTextPlugin：可用于将 CSS 从主程序中分割出来

bundle-loader: 可用来分割代码并按需加载模块

promise-loader: 和 bundle-loader 类似，但使用 promises

代码分割的好处：

 解决文件体积过大问题

 按需加载

 并行加载，减少加载时间，提高性能

### 8、暴露全局变量

使用externals来暴露全局变量，暴露全局变量将会减少打包时间和大小。externals 配置选项提供了「从输出的 bundle 中排除依赖」的方法。

如果我们想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用，那就可以通过配置externals。

### 9、如何调试打包后的代码

webapck通过配置可以自动给我们source maps文件，map文件是一种对应编译文件和源文件的方法。

devtool: '#source-map'

source-map 把映射文件生成到单独的文件，最完整最慢

cheap-module-source-map 在一个单独的文件中产生一个不带列映射的Map

eval-source-map 使用eval打包源文件模块,在同一个文件中生成完整sourcemap

cheap-module-eval-source-map sourcemap和打包后的JS同行显示，没有映射列

这一配置极大的方便了我们项目开发。

### 10、如何从零开始写一个webpack.config.js文件

初始化npm： npm init

安装webpack  ：npm install webpack webpack-cli  -d （webpack4.0开始，webpack拆分开两个包分别是webpack和webpack-cli）

配置webpack.config.js文件

      如下是简单的vue项目的webpack配置文件
```js
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
```

配置开发服务器

      1>安装：npm install webpack-dev-server -d

      2>配置开发服务器参数

```js
devServer:{
    contentBase:path.resolve(__dirname,'dist'),// 配置开发服务运行时的文件根目录
    host:'localhost',// 开发服务器监听的主机地址
    compress:true,   // 开发服务器是否启动gzip等压缩
    port:8080        // 开发服务器监听的端口
}
```
      3>配置启动参数
```js
 "scripts": {
       "dev": "webpack-dev-server --open --mode development "
  }
```

配置好webpack.config.js文件后可以使用命令：npm run dev启动项目

### 11、Webpack可优化点总结

缩小文件搜索范围：include & exclude

压缩JS代码：UglifyjsWebpackPlugin

代码分离、提取公共代码

热模块替换：不刷新整个网页，只更新指定的模块

区分环境：开发环境和生产环境

HappyPack：HappyPack能让Webpack把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。

