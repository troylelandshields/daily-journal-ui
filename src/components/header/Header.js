import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';
import './Header.css';

class Header extends Component {
  render() {

    const responseGoogle = (response) => {
      axios.get("http://localhost:3000/auth/google", {
        headers: { "Authorization": "Bearer " + response.tokenId }
      })
    }

    const failGoogle = (response) => {
      console.log("login failed", response);
    }

    return (
      <Grid>
        <Row>
          <Col xs={12} md={8}>
            <GoogleLogin
              clientId="300709606324-sec60nd2b4hba9b1gkqdcpdlhv2p89kk.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={failGoogle}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Header;
