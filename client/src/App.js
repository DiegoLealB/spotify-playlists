import React from 'react';
import Spotify from 'spotify-web-api-js';
import { BrowserRouter, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import pink from '@material-ui/core/colors/pink';

import HomePage from './containers/HomePage.container';
import NavBar from './components/NavBar';
import LoginButton from './components/LoginButton';
import Search from './components/Search';

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
        token: params.access_token,
        loggedIn: params.access_token ? true : false,
    }

    localStorage.setItem('access_token', params.access_token);
    // localStorage.setItem('refresh_token', params.refresh_token);

    spotifyWebApi.setAccessToken(this.state.token);
    spotifyWebApi.getMe()
      .catch(() => {
        this.setState({
          loggedIn: false,
        })
      });
  }

  getHashParams = (params) => {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = params
      // eslint-disable-next-line
      while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
  };

  componentDidMount() {
      let value = localStorage.getItem('access_token');
      if (value) {
        this.setState({ token: value });
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
            <Route path='/search' component={Search} />
          </div>
        : <LoginButton /> }
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
