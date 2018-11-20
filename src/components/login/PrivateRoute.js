import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
} from 'react-router-dom';
import auth from '../../services/auth.js';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/',
                state: { from: props.location }
            }}
            />
    )} />
);

export default PrivateRoute;