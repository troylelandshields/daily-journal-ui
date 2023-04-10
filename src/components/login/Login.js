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
    if (!document.getElementById("pricing-table-container")) {
      return;
    }
    const pricingTable = document.createElement("stripe-pricing-table");
    pricingTable.setAttribute("pricing-table-id", "prctbl_1MWXrPK4AmBVQHakVF3utjUB");
    pricingTable.setAttribute("publishable-key", "pk_live_doxQ9etmZ8nozRk89VmvoOrZ");
    document.getElementById("pricing-table-container").appendChild(pricingTable);

    return () => {
      document.getElementById("pricing-table-container").innerHTML = "";
    };
  }, []);

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

  const buttonStyles = {
    fontSize: '15px',
    borderRadius: '6px',
    cursor: 'pointer',
    color: 'white',
    marginLeft: '8px'
  };

  const googleButtonStyles = {
    ...buttonStyles,
    backgroundColor: '#db4437'
  };

  const passwordButtonStyles = {
    ...buttonStyles,
    padding: '10px 20px',
    background: 'linear-gradient(to right, rgb(128, 100, 181), rgb(85, 100, 181), rgb(85, 100, 109)'
  };

  return dst ? (
    <Redirect to={dst} />
  ) : (
    !auth.isAuthenticated && (
      <>
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <span style={{color:"white", marginRight:"8px"}}>Login with:</span>
          <GoogleLogin
            style={googleButtonStyles}
            clientId="300709606324-sec60nd2b4hba9b1gkqdcpdlhv2p89kk.apps.googleusercontent.com"
            buttonText="Google"
            onSuccess={responseGoogle}
            onFailure={failGoogle}
          />
          <button style={passwordButtonStyles} onClick={auth0Flow}>Password</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '0px'}}>
          <img src="/logo-color.png" style={{}} width="500px"></img>
          <p style={{color:"white", width:"80%", marginBottom:"8px", textAlign:"center"}}>Get a daily text to prompt you to journal about your day. Reflect on the events, emotions, and experiences that shape your life and give you a new perspective on what's important.</p>
          <div id="pricing-table-container" style={{width:"90%", marginBottom:"30px"}}></div>
        </div>
      </>
    )
  );
};

export default Login;
