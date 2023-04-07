import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useEffect, useState, useContext} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from './App';
import useAuth, { AuthContext } from './services/auth';
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

export const AuthProvider = ({ children }) => {
    const auth = useAuth();
  
    return (
      <AuthContext.Provider value={auth}>
        {children}
      </AuthContext.Provider>
    );
};

const LoginHandler = (props) => {
    const { isAuthenticated, getAccessTokenSilently  } = useAuth0();
    const auth = useContext(AuthContext);

    // state for is loading
    const [isLoading, setIsLoading] = useState(true);

    const handleAuth0Login = () => {
        setIsLoading(false);
    }


    // on mount, check to see if they're logged in
    useEffect(() => {
        auth.autoLogin(isAuthenticated, getAccessTokenSilently, handleAuth0Login);
    }, [isAuthenticated]);

    return (<> 
    {
        isLoading 
            ? <div>Loading...</div> 
            : props.children
    }</>
    )
}  

ReactDOM.render(
    <Auth0Provider
        domain="dev-ho6uvwopondwbfy0.us.auth0.com"
        clientId="mDadHnSi7Nu5FDNA3MZe0FYUwLStYR1r"
        authorizationParams={{
            audience: "buffalo-journal.herokuapp.com",
            redirect_uri: window.location.origin
        }}
    >
        <AuthProvider>
            <LoginHandler>
                <Router>
                    <App/>
                </Router>
            </LoginHandler>
        </AuthProvider>
     </Auth0Provider>
, document.getElementById('root'));
