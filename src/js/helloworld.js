require('./hello');
require('./world');

var css = require("../sass/test.scss");

var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(<h1>Hello</h1>, document.getElementById("content"));
