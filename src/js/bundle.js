var React = require('react');
var ReactDOM = require('react-dom');
var Three = require('three');
// copy the index boilerplate over to dist
require('file?name=dist/[name].[ext]!../index.html');

var css = require("!style!css!sass!../sass/test.scss");

ReactDOM.render(<h1>Hi</h1>, document.getElementById("content"));
