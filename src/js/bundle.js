require('./hello');
require('./world');

// copy the index boilerplate over to dist
require('file?name=dist/[name].[ext]!../index.html');

var css = require("../sass/test.scss");
var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(<h1>Hello</h1>, document.getElementById("content"));
