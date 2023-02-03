import React, { Component } from 'react';
import Radium from 'radium';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import {StripeProvider} from 'react-stripe-elements';

import PrivateRoute from './components/login/PrivateRoute';
import NavBar from './components/nav/NavBar.js';
import Entries from './components/pages/Entries.js';
import Settings from './components/pages/Settings.js';
import Summaries from './components/pages/Summaries.js';
import './App.css';
import config from './services/config';
import auth from './services/auth';

// Component = Radium(Component);
class App extends Component {
  render() {

    return (
      <Container>
        <StripeProvider apiKey={config.stripeKey}>
          <Router>
            <div>
                <NavBar></NavBar>
                <PrivateRoute path="/journal/:userId" component={Entries} />  
                <PrivateRoute path="/summaries/:userId" component={Summaries} />
                <PrivateRoute path="/settings/:userId" component={Settings} />
                
                { auth.isAuthenticated && auth.isSetUp() ? <Redirect to={{pathname: "/journal/${auth.user.id}", query:"1=1"}} /> : 
                  auth.isAuthenticated && !auth.isSetUp() ? <Redirect to={`/settings/${auth.user.id}`} /> : 
                  null } 
            </div>
          </Router>
        </StripeProvider>
      </Container>
    );
  }
}

export default Radium(App);
