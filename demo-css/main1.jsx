var React = require('react');
var ReactDOM = require('react-dom');
var style = require('./app.css');

ReactDOM.render(
  <div>
    <h1 className={style.h1}>Hello World111</h1>
    <h2 className="h2">Hello Webpack222</h2>
  </div>,
  document.getElementById('example')
);