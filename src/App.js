import React, { Component } from 'react';
import Radium from 'radium';
import { Container } from 'react-bootstrap';
import { Redirect, Route } from 'react-router-dom';
import {StripeProvider} from 'react-stripe-elements';

import PrivateRoute from './components/login/PrivateRoute';
import NavBar from './components/nav/NavBar.js';
import Entries from './components/pages/Entries.js';
import Settings from './components/pages/Settings.js';
import Home from './components/pages/Home.js';
import Login from './components/login/Login.js';
import Summaries from './components/pages/Summaries.js';
import './App.css';
import config from './services/config';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Component = Radium(Component);
class App extends Component {
  render() {
    return (
      <Container>
        <StripeProvider apiKey={config.stripeKey}>
            <div>
                <ToastContainer
                />
                <NavBar location={window.location.href}></NavBar>
                <PrivateRoute path="/journal/:userId" component={Entries} />  
                <PrivateRoute path="/summaries/:userId/:style" component={Summaries} />
                <PrivateRoute path="/settings/:userId" component={Settings} />

                <Route path="/public/:userId/journal" component={Entries} />  
                <Route path="/public/:userId/summaries/:style" component={Summaries} />

                <Route exact path="/" component={Home}></Route> 
            </div>
          
        </StripeProvider>
      </Container>
    );
  }
}

export default Radium(App);
