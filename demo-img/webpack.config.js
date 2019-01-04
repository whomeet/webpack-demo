module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
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
};


/*
对于比较小的图片，使用base64编码，可以减少一次图片的网络请求
比较大的图片,使用base64加大了html页面的大小，会加大下载页面的大小
*/