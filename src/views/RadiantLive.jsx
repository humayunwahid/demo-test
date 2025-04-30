import React, { Component } from 'react';
import { auth, signInWithEmailAndPassword, signInWithGoogle, signInWithApple, logout, db, isAuthenticated, getUser } from "../firebase";



const isMobileDevice = () => {
  return window.matchMedia("(max-width: 768px)").matches;
};

class RadiantLive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    const { link, title, adsManager, version } = this.props;
    // alert("Live Stream" + link);
    //console.log("Live Stream");
    const divStyle = {
      position: 'absolute',
      maxHeight: '100vh',
      minHeight: '100%',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };
    const mobStyle = {
      marginTop: version === 'v2' ? '10%' : '40%'
    };

    // Update the style based on device type
    this.setState({
      style: isMobileDevice() ? mobStyle : divStyle
    });

    

    // Display an alert with the title prop

    // Get the current user and authentication status
    const currentUser = getUser();
    const authenticated = isAuthenticated();
    
    if (authenticated && currentUser) {
      // Set user state
      this.setState({ user: currentUser.uid }, () => {

        this.initializePlayer(link, title, adsManager);

      });
    } else {
      // Initialize the player without user_id
      this.initializePlayer(link, title, adsManager);
    }
  }

  initializePlayer(link, title, adsManager) {
    const src = {
      hls: link
    };
    
    const schedule = {
      preroll: adsManager,
    };


    // alert(title);

    const settings = {
      licenseKey: 'eHp1dXRtb3Z5cEAxNDkyNDI4',
      src: src,
      preload: 'auto',
      skin: 's1',
      skinAccentColor: "rgba(255, 0, 0, 1.00)",
      scaleMode: 'stretch',
      autoplay: true,
      fullScreen: true,
      airplay: true,
      autoHeightMode: true,
      autoHeightModeRatio: 1.7777777778,
      gaTrackingId: "UA-155123988-1",
      speed: true,
      googleCast: true,
      googleCastReceiverAppId: "AC5A3368",
      hlsJSProgressive: true,
      googleCastAndroidReceiverCompatible: true,
      hlsJSMaxBufferBehind: 60,
      bitrateDataDisplayed: true,
      ads: true,
      adSchedule: schedule,
      id: 'radiantPlayer',
      enableGAVideoTracking: true,
      gaEventParameters: {
        'video_title': title,
        'UserID': this.state.user || 'unknown_user', // Fallback if user is null
        'video_provider':'CDN',
      },
      gaEvents: ['ready', 'playerstart', 'bufferstalled', 'ended', 'error', 'adimpression', 'adplayerror', 'adloaderror', 'enterfullscreen', 'exitfullscreen', 'seeking', 'fullminutewatched', 'pause', 'adclick']
    };

    const elementID = 'rmp';
    const rmp = new window.RadiantMP(elementID);
    rmp.init(settings);
  }

  render() {
    return (
      <div id="rmp" style={this.state.style} />
    );
  }
}

export default RadiantLive;
