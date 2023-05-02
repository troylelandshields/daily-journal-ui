import React, { useState, useContext, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import {AuthContext} from '../../services/auth.js';
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from 'react-toastify';

const Login = () => {
  const { loginWithRedirect, isAuthenticated, getAccessTokenSilently  } = useAuth0();
  const [dst, setDst] = useState("");
  const auth = useContext(AuthContext);

  const examples = [
    {
      title: "Football Coach",
      src: "football_coach.png"
    },
    {
      title: "Obsessed with Cats",
      src: "cat_facts.png"
    },
    {
      title: "Overbearing Mother-in-Law",
      src: "mother-in-law.png"
    },
    {
      title: "Valley Girl",
      src: "valley_girl.png"
    },
  ];

  const [exampleIdx, setExampleIdx] = useState(0);
  const cycleExample = () => {
    if (exampleIdx === examples.length - 1) {
      setExampleIdx(0);
      return
    }
    setExampleIdx(exampleIdx+1);
  }

  useEffect(() => {
    if (!document.getElementById("pricing-table-container")) {
      return;
    }
    const pricingTable = document.createElement("stripe-pricing-table");
    pricingTable.setAttribute("pricing-table-id", "prctbl_1MWXrPK4AmBVQHakVF3utjUB");
    pricingTable.setAttribute("publishable-key", "pk_live_doxQ9etmZ8nozRk89VmvoOrZ");
    document.getElementById("pricing-table-container").appendChild(pricingTable);

    return () => {
      if (!document.getElementById("pricing-table-container")) {
        return;
      }
      document.getElementById("pricing-table-container").innerHTML = "";
    };
  }, [auth, auth.isAuthenticated]);

  useEffect(() => {
    if (auth.isAuthenticated && auth.isSetUp) {
      setDst(`/journal/${auth.user.id}`);
    } else if (auth.isAuthenticated && !auth.isSetUp) {
      // TODO: this logic isn't working quite right
      toast.error("I'm sorry, there was no active subscription found for that login. Sign up below or try signing in with the correct login.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        onClose: auth.signout()
      });
      
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
          <h3 style={{color:"white", width:"80%", textAlign:"center", opacity:"30%"}}>powered by AI</h3>
          <p style={{color:"white", width:"80%", marginBottom:"8px", textAlign:"center"}}>Get a daily text to prompt you to journal about your day. Reflect on the events, emotions, and experiences that shape your life and give you a new perspective on what's important. Ask questions about your past and get helpful answers.</p>
          <Link to="/public/6fffcbb6-e93b-4619-8602-5132aa19f1f5/journal?order=ASC" style={{color:"white"}}>Click to see Chat GPT's public journal entries</Link>
          <div id="pricing-table-container" style={{width:"90%", marginBottom:"30px"}}></div>

          <div style={{marginBottom:"30px", textAlign:"center"}} onClick={cycleExample}>
            <h2 style={{color:"white",textAlign:"center", opacity:"60%"}}>Examples</h2>
            <h4 style={{color:"white", textAlign:"center", opacity:"30%"}}>{examples[exampleIdx].title}</h4>
            <div style={{maxHeight: "500px", overflow:"hidden", overflowY: "scroll", alignItems: 'center', textAlign: "center"}}>
              <img src={examples[exampleIdx].src} width="80%"></img>
            </div>
            <span style={{color:"white", textAlign:"center", opacity:"100%"}}>Click for Next</span>
          </div>
        </div>
      </>
    )
  );
};

export default Login;
