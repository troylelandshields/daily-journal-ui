import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import {AuthContext} from '../../services/auth.js';
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect  } = useAuth0();
  const [dst, setDst] = useState("");
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth.isAuthenticated && auth.isSetUp) {
      setDst(`/journal/${auth.user.id}`);
    } else if (auth.isAuthenticated && !auth.isSetUp) {
      setDst(`/settings/${auth.user.id}`);
    }
  }, [auth, auth.isAuthenticated]);

  const auth0Flow = async () => {
    await loginWithRedirect();
  };

  const responseGoogle = (response) => {
    auth.authenticate(response.tokenId);
  };

  const failGoogle = (response) => {
    console.log("login failed", response);
    axios.defaults.headers.common['Authorization'] = null;
  };

  return dst ? (
    <Redirect to={dst} />
  ) : (
    !auth.isAuthenticated && (
      <>
        <GoogleLogin
          clientId="300709606324-sec60nd2b4hba9b1gkqdcpdlhv2p89kk.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={failGoogle}
        />

        <br ></br>
        <button onClick={auth0Flow}>Login</button>
      </>
    )
  );
};

export default Login;
