import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';
import PrivateRoute from './components/login/PrivateRoute';
import NavBar from './components/nav/NavBar.js';
import Entries from './components/pages/Entries.js';
import Settings from './components/pages/Settings.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {

    return (
      <div>
        <Grid>
          <NavBar></NavBar>

          <PrivateRoute path="/journal/:userId" component={Entries} />
          <PrivateRoute path="/settings/:userId" component={Settings} />
        </Grid>
      </div>
    );
  }
}

export default App;
