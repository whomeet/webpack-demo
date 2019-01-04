var path = require('path');

module.exports = {
  entry: './src/main.jsx',
  output: {
    filename: 'bundle.js'
  },
  module: {
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
  }
};

