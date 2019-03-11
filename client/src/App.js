import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import HomePage from './containers/HomePage.container';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route path="/" render={(props) => <HomePage {...props}/>} />
        </div>
      </Router>
    );
  }
}

export default App;
