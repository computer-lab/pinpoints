//  Index boilerplate that loads the bundle
require('file?name=[name].[ext]!../index.html');

// JavaScript Modules
import React from  'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import React3 from 'react-three-renderer';
import THREE from 'three';
import MouseInput from './MouseInput';
import Favicon from 'react-favicon';

var OrbitControls = require('three-orbit-controls')(THREE)

var favicon = require('../images/favicon.png');
var pinpointsCard = require('../images/pinpoints.jpg');

// Images
var verdesLogo = require('../fonts/verdes.svg');
var verdesBird = require('../fonts/verdes-bird.svg');
var verdesText = require('../fonts/verdes-text.svg');
var pinpointsLogo = require('../fonts/pinpoints.svg');
var favicon = require('../images/favicon.png');
var theProblemVideo = require('../videos/the-problem.mp4');
var theSolutionVideo = require('../videos/the-solution.mp4');
var brandVolumeVideo = require('../videos/brand-volume.mp4');
var marketSpaceVideo = require('../videos/market-space.mp4');

// CSS
var css = require("!style!css!sass!../sass/test.scss");

var App = React.createClass({
  render: function() {
    return (
      <div className="app">
       <Favicon url={favicon} />
       <Header />
       <div className="content" ref="content">
         {this.props.children}
       </div>
       <Footer />
      </div>
    );
  }
});

var func = (sadf, asdf) => ({test:1});

var Header = React.createClass({
  facebookShare: function(){
    var url = encodeURIComponent(window.location);
    window.open('https://www.facebook.com/sharer/sharer.php?u='+ url,
        'facebook-share-dialog',
        'width=626,height=436'); 
  },
  twitterShare: function(){
    window.twttr=window.twttr||{};
    var D=550,A=450,C=screen.height,B=screen.width,H=Math.round((B/2)-(D/2)),G=0,F=document,E;
    if(C>A){G=Math.round((C/2)-(A/2))}
      window.twttr.shareWin=window.open('https://twitter.com/intent/tweet?text=Explore PinPoints. http://verdes.nyc','','left='+H+',top='+G+',width='+D+',height='+A+',personalbar=0,toolbar=0,scrollbars=1,resizable=1');
    E=F.createElement('script');
    E.src='http://platform.twitter.com/widgets.js';
    F.getElementsByTagName('head')[0].appendChild(E);
  },
  render: function() {
    return (
      <div className="header">
        <Link to="/">
          <img src={pinpointsLogo} />
        </Link>
        <div className="social">
          <a className="button" href="javascript:;" onClick={this.facebookShare}>
            <i className="fa fa-facebook fa-fw"></i>
          </a>
          <a className="button" href="javascript:;" onClick={this.twitterShare}>
            <i className="fa fa-twitter fa-fw"></i>
          </a>
        </div>
      </div>
    );
  }
});

var Footer = React.createClass({
  render: function() {
    return (
      <div className="footer copy">
        <a id="verdes-logo" href="http://verdes.nyc">
          <img id="verdes-bird" src={verdesBird} />
          <img id="verdes-text" src={verdesText} />
        </a>
      </div>
    );
  }
});

var Home = React.createClass({
  render: function(){
    return (
      <div className="copy"> 
        <h2>
            PinPoints is a digital tool that turns large convoluted data sets into insights. 
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
  getInitialState: function(){
    return {
      viewerHeight: 0,
      viewerWidth: 0
    }
  },
  componentDidMount: function() {
    window.addEventListener('resize', this._onWindowResize, false);
    this._onWindowResize();
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this._onWindowResize, false);
  },

  _onWindowResize: function() {
    const viewer = this.refs.viewer;

    this.setState({
      viewerWidth: viewer.offsetWidth,
      viewerHeight: viewer.offsetHeight,
    });
  },

  render: function(){
    return( 
      <div className="container" ref="viewer">
      <ExploreThreeRenderer width={this.state.viewerWidth} height={this.state.viewerHeight} />
      </div>
      );
  }
});

var RedDot = React.createClass({
  getInitialState: function(){
    return { color: 0xee0000, wireframe: true };
  },
  _onMouseDown: function(){
    document.body.style.cursor = 'initial';
    window.location.hash = this.props.href;
  },

  _onMouseEnter: function(){
    document.body.style.cursor = 'pointer';
    this.setState({ color: 0xff0000, wireframe: false });
  },

  _onMouseLeave: function(){
    document.body.style.cursor = 'initial';
    this.setState({ color: 0xee0000, wireframe: true });
  },
  render: function(){
    return (
      <mesh position={this.props.position} rotation={new THREE.Euler()}
            onMouseDown={this._onMouseDown} onMouseEnter={this._onMouseEnter}
            onMouseLeave={this._onMouseLeave}> 
        <sphereGeometry widthSegments={14} heightSegments={10} radius={35} />
        <meshBasicMaterial wireframe={this.state.wireframe} color={this.state.color}/>
      </mesh>
      );
  }
});

var RedDotText = React.createClass({
  render: function(){
    return (
      <mesh position={this.props.position} rotation={this.props.rotation}>
        <textGeometry font={font} text={this.props.text} size={20} height={1} />
        <meshBasicMaterial color={0xffffff}/>
      </mesh> 
      );
  }
});


var ExploreThreeRenderer = React.createClass({
  getInitialState: function() {
    return {
      cameraPosition: new THREE.Vector3(0, 100, 800),
      cameraRotation: new THREE.Euler(),
      mouseInput: null,
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
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.85;
    controls.minPolarAngle = 0.14;
    controls.maxPolarAngle = 3.0;

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
      if(mouseInput._isReady)
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
  },


  render: function() {
    return (
      <div className="container" ref="container">
        <React3 mainCamera="camera" width={this.props.width} height={this.props.height} ref="react3"
                clearColor={0x140f31} onAnimate={this.onAnimate} antialias>
          <module ref="mouseInput" descriptor={MouseInput} />
          <scene ref="scene" fog={new THREE.Fog(0x140f31,300,2000)}>
            <perspectiveCamera name="camera" fov={75} aspect={this.props.width / this.props.height}
                               near={0.1} far={2000} ref="camera"
                               position={this.state.cameraPosition} rotation={this.state.cameraRotation}/>
            <mesh rotation={this.state.cubeRotation}>
              <boxGeometry width={2} height={960} depth={2} />
              <meshBasicMaterial color={0xffffff}/>
            </mesh>
            <mesh rotation={this.state.cubeRotation}>
              <boxGeometry width={1000} height={2} depth={2} />
              <meshBasicMaterial color={0xffffff}/>
            </mesh>
            <mesh rotation={this.state.cubeRotation}>
              <boxGeometry width={2} height={2} depth={1000} />
              <meshBasicMaterial color={0xffffff}/>
            </mesh>
            <RedDot position={new THREE.Vector3(-215,250,200)}
                    href={"/problem"} />
            <RedDotText position={new THREE.Vector3(-215,300,200)} 
                        rotation={this.state.cameraRotation}
                        text={"The Problem"} />
            <RedDot position={new THREE.Vector3(150,100,150)}
                    href={"/solution"} />
            <RedDotText position={new THREE.Vector3(150,150,150)} 
                        rotation={this.state.cameraRotation}
                        text={"The Solution"} />
            <RedDot position={new THREE.Vector3(-250,-230,-200)}
                    href={"/brandvolume"} />
            <RedDotText position={new THREE.Vector3(-250,-180,-200)} 
                        rotation={this.state.cameraRotation}
                        text={"Brand Volume"} />
            <RedDot position={new THREE.Vector3(180,-100,-150)}
                    href={"/marketspace"} />
            <RedDotText position={new THREE.Vector3(180,-50,-150)} 
                        rotation={this.state.cameraRotation}
                        text={"Market Space"} />
            <RedDot position={new THREE.Vector3(175,-270,175)}
                    href={"/contact"} />
            <RedDotText position={new THREE.Vector3(175,-220,175)} 
                        rotation={this.state.cameraRotation}
                        text={"Use PinPoints"} />
          </scene>
        </React3>
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
        <a className="button" href="mailto:info@pinpoints.io">INFO@PINPOINTS.IO</a>
      </div>
    );
  }
});


var VimeoPlayer = React.createClass({
  render: function(){
    return (
      <iframe src={"https://player.vimeo.com/video/" + this.props.videoId +
        "?byline=0&portrait=0&title=0&autoplay=1"} width="750" height="422"
        frameBorder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen
        className="videoPlayer"></iframe>
    );
  }
});

var VideoPlayer = React.createClass({
  render: function(){
    return (
        <video src={this.props.video} controls autoPlay></video>
    );
  }
});

var VideoProblem = React.createClass({
  render: function(){
    return (
      <div className="copy">
        <h2>The Problem</h2>
        <VideoPlayer video={theProblemVideo} />
        <br />
        <Link className="button" to="/explore">Back</Link>
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
        <VideoPlayer video={theSolutionVideo} />
        <br />
        <Link className="button" to="/explore">Back</Link>
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
        <VideoPlayer video={marketSpaceVideo} />
        <br />
        <Link className="button" to="/explore">Back</Link>
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
        <VideoPlayer video={brandVolumeVideo} />
        <br />
        <Link className="button" to="/explore">Back</Link>
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
