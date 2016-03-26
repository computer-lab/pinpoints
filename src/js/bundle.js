var React = require('react');
var ReactDOM = require('react-dom');
var Three = require('three');
// copy the index boilerplate over to dist
require('file?name=dist/[name].[ext]!../index.html');

var css = require("!style!css!sass!../sass/test.scss");

var Container = React.createClass({
  render: function() {
    return (
      <div className="container">
       <Header />
       <Content />
       <Footer />
      </div>
    );
  }
});

var Header = React.createClass({
  render: function() {
    return (
      <div className="header">
        <h1>Header</h1>
      </div>
    );
  }
});

var Content = React.createClass({
  render: function() {
    return (
      <div className="content">
        <HomeCopy />
      </div>
    );
  }
});

var HomeCopy = React.createClass({
  render: function(){
    return (
      <div className="copy"> 
        <h2>
        PinPoints is a tool that uses a series of algorithms to aggregate market
        and consumer data.  From this complex web of data, PinPoints parses out
        order, and creates a 3D visualization.
        </h2> 
        <a className="button" href="#">EXPLORE</a>
      </div>
    );
  }
});

var Footer = React.createClass({
  render: function() {
    return (
      <div className="footer">
        <h1>Verdes NYC</h1>
      </div>
    );
  }
});

ReactDOM.render(<Container />, document.getElementById("container"));
