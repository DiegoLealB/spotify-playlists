import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

import HomePage from './containers/HomePage.container';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: green,
    secondary: { main: '#000000' },
    background: { main: '#000000' }
  },
  typography: { useNextVariants: true },
  paper: {
    backgroundColor: '#6d6d6d'
  }
})

class App extends Component {

  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <Route path="/" render={(props) => <HomePage {...props}/>} />
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
