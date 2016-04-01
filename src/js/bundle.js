// var React = require('react');
import React from  'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import THREE from 'three';
import ReactTHREE from 'react-three';

// these orbit controls have been modified to not allow zooming and panning
var OrbitControls = require('./three-orbit-controls')(THREE)

var t = require('./helvetiker_regular.typeface')(THREE);


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

var Footer = React.createClass({
  render: function() {
    return (
      <div className="footer copy">
        <h1>Verdes NYC</h1>
      </div>
    );
  }
});

var Home = React.createClass({
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


var Text = React.createClass({
  propTypes: {
    position: React.PropTypes.instanceOf(THREE.Vector3),
    quaternion: React.PropTypes.instanceOf(THREE.Quaternion).isRequired
  },
  render: function(){
    var Mesh = ReactTHREE.Mesh;

    var textProps = { 
      font: "helvetiker",
      size: 12,
      height: 1
    };

    var textGeometry = new THREE.TextGeometry("Hello World", textProps);

    return <Mesh quaternion={this.props.quaternion} 
              position={this.props.position}
              geometry={textGeometry}
              material={new THREE.MeshBasicMaterial}
              />
  }
});

var Explore = React.createClass({
  componentDidMount: function(){
    var x = 0;
    function animate(){
      x = x + 10;
      var position = new THREE.Vector3(0,0,x);

      requestAnimationFrame(animate);
    }
    animate();
  },
  render: function(){
    var Renderer = ReactTHREE.Renderer;
    var Scene = ReactTHREE.Scene;
    var Mesh = ReactTHREE.Mesh;
    var Object3D = ReactTHREE.Object3D;
    var Sprite = ReactTHREE.Sprite;
    var PerspectiveCamera = ReactTHREE.PerspectiveCamera;
    var boxGeometry = new THREE.BoxGeometry(3,600,3);
    var boxGeometry2= new THREE.BoxGeometry(600,3,3);
    var boxGeometry3= new THREE.BoxGeometry(3,3,600);
    this.textPosition = new THREE.Vector3(0,0,0);

    
    var width = window.innerWidth - 20;
    var height = 600;
    var aspectratio = width / height;
    var cameraprops = {
      fov : 75, 
      aspect : aspectratio, 
      near : 1, 
      far : 5000, 
      position : new THREE.Vector3(0,0,600), 
      lookat : new THREE.Vector3(0,0,0)
    };

    return (
      <div className="copy">
        <div id="three-box"></div>
        <Renderer width={width} height={height} background={0x140f31}>
            <Scene width={width} height={height} camera="maincamera"
                   orbitControls={OrbitControls}>
                <PerspectiveCamera name="maincamera" {...cameraprops} />
                <Object3D>
                  <Mesh quaternion={new THREE.Quaternion()} 
                            position={new THREE.Vector3(0,0,0)}
                            geometry={boxGeometry}
                            material={new THREE.MeshBasicMaterial}
                            />
                  <Mesh quaternion={new THREE.Quaternion()} 
                            position={new THREE.Vector3(0,0,0)}
                            geometry={boxGeometry2}
                            material={new THREE.MeshBasicMaterial}
                            />
                  <Mesh quaternion={new THREE.Quaternion()} 
                            position={new THREE.Vector3(0,0,0)}
                            geometry={boxGeometry3}
                            material={new THREE.MeshBasicMaterial}
                            />
                  <Text quaternion={new THREE.Quaternion()} 
                            position={this.position}
                            />
                </Object3D>
            </Scene>
        </Renderer>
        <Link className="button" to="/">Home</Link>
        <Link className="button" to="/contact">Contact</Link>
        <Link className="button" to="/problem">Video: The Problem</Link>
        <Link className="button" to="/solution">Video: The Solution</Link>
        <Link className="button" to="/marketspace">Video: Market Space</Link>
        <Link className="button" to="/brandvolume">Video: Brand Volume</Link>
      </div>
    );
  }
});

var Contact = React.createClass({
  render: function(){
    return (
      <div className="copy"> 
        <h2>
        PinPoints is a tool created by <a href="http://verdes.nyc">Verdes</a> to
        redefine how businesses visualize the market space and their place
        within it.  To use PinPoints, get in touch with us.
        </h2> 
        <Link className="button" to="/contact">Contact</Link>
      </div>
    );
  }
});


var VideoPlayer = React.createClass({
  render: function(){
    return (
      <iframe src={"https://player.vimeo.com/video/" + this.props.videoId +
        "?byline=0&portrait=0&title=0&autoplay=1"} width="500" height="281"
        frameBorder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen
        className="videoPlayer"></iframe>
    );
  }
});


var VideoProblem = React.createClass({
  render: function(){
    return (
      <div className="copy">
        <h2>The Problem</h2>
        <VideoPlayer videoId="140358722" />
        <br />
        <Link className="button" to="/explore">Explore</Link>
      </div>
    );
  }
});

var VideoSolution = React.createClass({
  render: function(){
    return (
      <div className="copy"> 
        <h2>
        The Solution
        </h2> 
        <VideoPlayer videoId="140358721" />
        <br />
        <Link className="button" to="/explore">Explore</Link>
      </div>
    );
  }
});

var VideoMarketSpace = React.createClass({
  render: function(){
    return (
      <div className="copy"> 
        <h2>
        Market Space
        </h2> 
        <VideoPlayer videoId="140359046" />
        <br />
        <Link className="button" to="/explore">Explore</Link>
      </div>
    );
  }
});

var VideoBrandVolume = React.createClass({
  render: function(){
    return (
      <div className="copy"> 
        <h2>
        Brand Volume
        </h2> 
        <VideoPlayer videoId="140687606" />
        <br />
        <Link className="button" to="/explore">Explore</Link>
      </div>
    );
  }
});


ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="explore" component={Explore} />
      <Route path="contact" component={Contact} />
      <Route path="problem" component={VideoProblem} />
      <Route path="solution" component={VideoSolution} />
      <Route path="marketspace" component={VideoMarketSpace} />
      <Route path="brandvolume" component={VideoBrandVolume} />
    </Route>
  </Router>
), document.getElementById("app"));

