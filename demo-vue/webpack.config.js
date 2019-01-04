const VueLoaderPlugin = require('vue-loader/lib/plugin')
var webpack = require('webpack');

module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
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
    })
  ]
};


/*

问题1：VueLoaderPlugin（）插件的重要性？（Vue Loader v15及以上）
这个插件是必须的！ 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。

问题2：页面一直没显示？
 1>是因为html中引入的js文件不对，应该引入打包后的文件名，而不是page对应的入口文件名
 2>原因如下
 [Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
 resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  针对上面的问题，这段resolve是解决的关键: 默认npm包导出的是运行时构建，为了使用独立构建，在webpack配置中添加上面的别名。
  运行时构建不包含模板编译器，因此不支持 template 选项，只能用 render 选项，但即使使用运行时构建，在单文件组件中也依然可以写模板，因为单文件组件的模板会在构建时预编译为 render 函数。如果我们想使用template，我们不能直接在客户端使用npm install之后的vue。

  

问题3：<style> 标签有 scoped 属性时，它的 CSS 只作用于当前组件中的元素,相当于添加本地作用域
注意：scoped会使标签选择器渲染变慢很多倍，添加scoped会影响性能

问题4：scoped和module不能共存？
开启css modules时，标签选择器不受影响，class和id选择器会被修改类名
CSS modules更安全更灵活，但是会有冗余代码，scoped更简单直接

vue-template-compiler

Vue Loader特性：
允许为 Vue 组件的每个部分使用其它的 webpack loader；
允许在一个 .vue 文件中使用自定义块，并对其运用自定义的 loader 链；
使用 webpack loader 将 <style> 和 <template> 中引用的资源当作模块依赖来处理；
为每个组件模拟出 scoped CSS；
*/