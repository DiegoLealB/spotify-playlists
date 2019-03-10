import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import HomePage from './containers/HomePage.container';
import Header from './containers/Header.container';

class App extends Component {
  constructor() {
    super();
    
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={HomePage} />
        </div>
      </Router>
    );
  }
}

export default App;
