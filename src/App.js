import React, { Component } from 'react';
import Radium from 'radium';
import { Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import {StripeProvider} from 'react-stripe-elements';

import PrivateRoute from './components/login/PrivateRoute';
import NavBar from './components/nav/NavBar.js';
import Entries from './components/pages/Entries.js';
import Settings from './components/pages/Settings.js';
import './App.css';
import config from './services/config';
import auth from './services/auth';

// Component = Radium(Component);
class App extends Component {
  render() {

    return (
      <Container>
        <StripeProvider apiKey={config.stripeKey}>
          <div>
              <NavBar></NavBar>

              <PrivateRoute path="/journal/:userId" component={Entries} />
              <PrivateRoute path="/settings/:userId" component={Settings} />

              { auth.isAuthenticated && auth.isSetUp() ? <Redirect to={`/journal/${auth.user.id}`} /> : 
                auth.isAuthenticated && !auth.isSetUp() ? <Redirect to={`/settings/${auth.user.id}`} /> : 
                null } 
          </div>

        </StripeProvider>
      </Container>
    );
  }
}

export default Radium(App);
