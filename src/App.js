import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Route, Link, Redirect } from 'react-router-dom';
import {StripeProvider} from 'react-stripe-elements';

import PrivateRoute from './components/login/PrivateRoute';
import NavBar from './components/nav/NavBar.js';
import Entries from './components/pages/Entries.js';
import Settings from './components/pages/Settings.js';
import logo from './logo.svg';
import './App.css';
import config from './services/config';
import auth from './services/auth';

class App extends Component {
  render() {

    return (
      <div>
        <StripeProvider apiKey={config.stripeKey}>
          <Grid>
              <NavBar></NavBar>

              <PrivateRoute path="/journal/:userId" component={Entries} />
              <PrivateRoute path="/settings/:userId" component={Settings} />

              { auth.isAuthenticated && auth.isSetUp() ? <Redirect to={`/journal/${auth.user.id}`} /> : 
                auth.isAuthenticated && !auth.isSetUp() ? <Redirect to={`/settings/${auth.user.id}`} /> : 
                null } 

          </Grid>

        </StripeProvider>
      </div>
    );
  }
}

export default App;
