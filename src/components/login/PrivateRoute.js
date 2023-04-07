import React, {useContext} from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';
import {AuthContext} from '../../services/auth.js';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const auth = useContext(AuthContext);
  
    return (
      <Route
        {...rest}
        render={(props) =>
          auth.isAuthenticated === true ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location.pathname },
              }}
            />
          )
        }
      />
    );
  };
  
  export default PrivateRoute;