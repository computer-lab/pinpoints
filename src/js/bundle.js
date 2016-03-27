// var React = require('react');
import React from  'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import Three from 'three';

// copy the index boilerplate over to dist
require('file?name=dist/[name].[ext]!../index.html');

var css = require("!style!css!sass!../sass/test.scss");

var App = React.createClass({
  render: function() {
    return (
      <div className="app">
       <Header />
       <div className="content">
         {this.props.children}
       </div>
       <Footer />
      </div>
    );
  }
});

var Header = React.createClass({
  render: function() {
    return (
      <div className="header">
        <Link to="/">PINPOINTS</Link>
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
        <Link className="button" to="/explore">EXPLORE</Link>
      </div>
    );
  }
});

var Explore = React.createClass({
  render: function(){
    return (
      <h1>Explore</h1>
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

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomeCopy} />
      <Route path="explore" component={Explore} />
    </Route>
  </Router>
), document.getElementById("app"));
