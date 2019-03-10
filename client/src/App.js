import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Spotify from 'spotify-web-api-js';

import HomePage from './containers/HomePage.container';
import Header from './containers/Header.container';

const spotifyWebApi = new Spotify();

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route path="/" render={(props) => <HomePage {...props}/>} />
        </div>
      </Router>
    );
  }
}

export default App;
