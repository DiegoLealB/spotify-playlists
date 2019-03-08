import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';

// Component imports
import LoginButton from './components/LoginButton';
import NowPlaying from './components/NowPlaying';
import UserProfile from './components/UserProfile';
import Playlists from './components/Playlists';

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: 'Not Checked',
        alt: '',
        image: '',
      }
    }
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }
  }
  
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getNowPlaying() {
    spotifyWebApi.getMyCurrentPlaybackState()
      .then((response) => {

        // console.log('getMyCurrentPlaybackState response', response);
        this.setState({
          nowPlaying: {
              name: response.item.name,
              alt: response.item.name,
              image: response.item.album.images[0].url,
          }
        })
    })
    .catch(err => {
        console.warn('getNowPlaying ERROR: ', err);
    });
  }

  logOut() {
    spotifyWebApi.setAccessToken('');
    this.setState({
      loggedIn: false,
    });
  }


  render() {
    return (
      <div className="App">
        <UserProfile />
        { this.state.loggedIn ? <button onClick={() => this.logOut()}>Log Out</button>
          : <LoginButton /> }
        <NowPlaying>{this.state.nowPlaying}</NowPlaying>
        <div>
          <button onClick={() => this.getNowPlaying()}>
              Check Now Playing
          </button>
        </div>
        <div>
          <Playlists />
        </div>
      </div>
    );
  }
}

export default App;
