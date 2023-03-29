import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import auth from '../../services/auth.js';

const Login = () => {
  const [dst, setDst] = useState("");

  const responseGoogle = (response) => {
    auth.authenticate(response.tokenId, () => {
      if (auth.isAuthenticated && auth.isSetUp()) {
        setDst(`/journal/${auth.user.id}`);
      } else if (auth.isAuthenticated && !auth.isSetUp()) {
        setDst(`/settings/${auth.user.id}`);
      }
    });
  };

  const failGoogle = (response) => {
    console.log("login failed", response);
    axios.defaults.headers.common['Authorization'] = null;
  };

  return dst ? (
    <Redirect to={dst} />
  ) : (
    !auth.isAuthenticated && (
      <GoogleLogin
        clientId="300709606324-sec60nd2b4hba9b1gkqdcpdlhv2p89kk.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={failGoogle}
      />
    )
  );
};

export default Login;
