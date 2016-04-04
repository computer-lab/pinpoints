// var React = require('react');
import React from  'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import React3 from 'react-three-renderer';
import THREE from 'three';
import MouseInput from './MouseInput';
var OrbitControls = require('three-orbit-controls')(THREE)

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

var func = (sadf, asdf) => ({test:1});

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

var ExploreThree = React.createClass({
  getInitialState: function() {
    return {
      cameraPosition: new THREE.Vector3(0, 0, 1000),
      cameraRotation: new THREE.Euler(),
      mouseInput: null,
      helloWorldPosition: new THREE.Vector3(100, 220, 200),
      helloWorldRotation: new THREE.Euler()
    };
  },
  
  _onTrackballChange : function() {
    this.setState({
      cameraPosition: this.refs.camera.position.clone(),
      cameraRotation: this.refs.camera.rotation.clone(),
    });
  },

  componentDidMount: function(){
    const controls = new OrbitControls(this.refs.camera, ReactDOM.findDOMNode(this.refs.container));

    controls.enableZoom = false;
    controls.enablePan = false;
    /*
    controls.rotateSpeed = 3.0;
    */

    this.controls = controls;
    this.controls.addEventListener('change', this._onTrackballChange);
  },

  componentDidUpdate(newProps) {
    const {
      mouseInput,
    } = this.refs;

    const {
      width,
      height,
    } = this.props;

    if (width !== newProps.width || height !== newProps.height) {
      mouseInput.containerResized();
    }
  },

  componentWillUnmount() {
    this.controls.removeEventListener('change', this._onTrackballChange);
    this.controls.dispose();
    delete this.controls;
  },

  onAnimate: function() {
    var mouseInput = this.refs.mouseInput;

    // handle mouse input (for clicking on cubes)
    if (!mouseInput.isReady()) {
      mouseInput.ready(this.refs.scene, this.refs.container, this.refs.camera);
      //mouseInput.restrictIntersections([this.refs.link]);
      mouseInput.setActive(false);
    }

    this.controls.update();
    this.state.helloWorldRotation = this.refs.camera.rotation.clone()
  },

  _onMouseDown: function(){
    document.body.style.cursor = 'initial';
    window.location.hash = '/problem';
  },

  _onMouseEnter: function(){
    document.body.style.cursor = 'pointer';
  },

  _onMouseLeave: function(){
    document.body.style.cursor = 'initial';
  },

  render: function() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height

   // this.cameraPosition = new THREE.Vector3(0, 0, 600);
    return (
      <div className="copy">
      <div ref="container">
      <React3 mainCamera="camera" width={width} height={height} ref="react3"
              clearColor={0x140f31} onAnimate={this.onAnimate} antialias>
        <module ref="mouseInput" descriptor={MouseInput} />
        <scene ref="scene">
          <perspectiveCamera name="camera" fov={75} aspect={width / height}
                             near={0.1} far={2000} ref="camera"
                             position={this.state.cameraPosition} rotation={this.state.cameraRotation}/>
          <mesh rotation={this.state.cubeRotation}>
            <boxGeometry width={3} height={900} depth={3} />
            <meshBasicMaterial color={0xffffff}/>
          </mesh>
          <mesh rotation={this.state.cubeRotation}>
            <boxGeometry width={800} height={3} depth={3} />
            <meshBasicMaterial color={0xffffff}/>
          </mesh>
          <mesh rotation={this.state.cubeRotation}>
            <boxGeometry width={3} height={3} depth={800} />
            <meshBasicMaterial color={0xffffff}/>
          </mesh>
          <mesh rotation={this.state.helloWorldRotation} onMouseDown={this._onMouseDown} onMouseEnter={this._onMouseEnter} onMouseLeave={this._onMouseLeave} position={this.state.helloWorldPosition}>
            <textGeometry font={font} text={"The Problem"} size={20}
                          height={1} />
            <meshBasicMaterial color={0xffffff}/>
          </mesh> 
          <mesh position={new THREE.Vector3(120,180,180)} onMouseDown={this._onMouseDown} onMouseEnter={this._onMouseEnter} onMouseLeave={this._onMouseLeave} >
            <sphereGeometry radius={25} />
            <meshBasicMaterial color={0xff0000}/>
          </mesh> 
          <pointLight position={new THREE.Vector3(100,200,200)} color={0xff0000} 
                      intensity={100} distance={100} />
          
        </scene>
      </React3>
      </div>
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

var font;
var loader = new THREE.FontLoader();
// TODO: fix this font nonsense
loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_regular.typeface.js', function (response) {
  font = response;
  ReactDOM.render((
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="explore" component={ExploreThree} />
        <Route path="contact" component={Contact} />
        <Route path="problem" component={VideoProblem} />
        <Route path="solution" component={VideoSolution} />
        <Route path="marketspace" component={VideoMarketSpace} />
        <Route path="brandvolume" component={VideoBrandVolume} />
      </Route>
    </Router>
  ), document.getElementById("app"));
});
