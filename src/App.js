import React, { useEffect, useState, useContext } from 'react';
import Radium from 'radium';
import { Container } from 'react-bootstrap';
import { Redirect, Route, withRouter } from 'react-router-dom';
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
import {AuthContext} from './services/auth';


// Component = Radium(Component);
function App() {
  const [backgroundColor, setBackgroundColor] = useState("#010536");
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth.isAuthenticated) {
      setBackgroundColor("white");
    } else {
      setBackgroundColor("#010536");
    }
  }, [auth, auth.isAuthenticated]);

  useEffect(() => {
    if (auth.isAuthenticated || window.location.pathname.indexOf("public") > 0) {
      setBackgroundColor("white");
    } else {
      setBackgroundColor("#010536");
    }
  });

  return (
    <div style={{ backgroundColor: backgroundColor, height: "100%", minHeight: "100vh", width: "100%", minWidth: "100vw" }}>
      <Container>
        <StripeProvider apiKey={config.stripeKey}>
            <div>
                <ToastContainer/>
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
    </div>
  );
}

export default Radium(withRouter(App));
