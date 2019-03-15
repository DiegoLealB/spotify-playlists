import React from 'react';
import axios from 'axios';
import Spotify from 'spotify-web-api-js';
import { BrowserRouter, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import pink from '@material-ui/core/colors/pink';

import HomePage from './containers/HomePage.container';
import NavBar from './components/NavBar';
import LoginButton from './components/LoginButton';

const spotifyWebApi = new Spotify();

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: green,
    secondary: pink,
  },
  typography: { useNextVariants: true },
  paper: {
    backgroundColor: '#191414'
  }
})

class App extends React.Component {
  constructor() {
    super();
    let queryString = window.location.hash.substring(1);
    const params = this.getHashParams(queryString);
    
    this.state = {
        loggedIn: params.access_token ? true : false,
        accessToken: params.access_token,
        refreshToken: params.refresh_token,
    }

    if (params.access_token) {
        spotifyWebApi.setAccessToken(params.access_token);
    }
  }

  getHashParams(params) {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = params
      // eslint-disable-next-line
      while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
  }

  async componentDidMount() {
    try {
      // Refreshes access token every 30 minutes
      const refreshToken = this.state.refreshToken;
      setInterval(async () => {
        const res = await axios.get(`http://localhost:8888/refresh_token?refresh_token=${refreshToken}`);
        const accessToken = res.data.access_token;
        spotifyWebApi.setAccessToken(accessToken);
      }, 300000)
    } catch(err) {
      console.error('Refresh token error: ', err);
    }
  }

  render() {
    const { loggedIn } = this.state;

    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
        { loggedIn ?
        <div>
          <NavBar />
          <Route exact path='/' component={HomePage} />
        </div>
        : <LoginButton /> }
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
