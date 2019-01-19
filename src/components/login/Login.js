import React, { Component } from 'react';
import {
	Redirect
  } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import auth from '../../services/auth.js';

class Login extends Component {
	state = {
		redirectToPreviousRoute: false
	};

	responseGoogle = (response) => {
		auth.authenticate(response.tokenId, () => {
			this.setState({ redirectToPreviousRoute: true });
		})
	}

	failGoogle = (response) => {
		console.log("login failed", response);
		axios.defaults.headers.common['Authorization'] = null;
	}

	componentWillMount = () => {
		auth.autoLogin(() => {
			this.setState({ redirectToPreviousRoute: true });
		})
	}

	render() {
		const from = "/";
		const { redirectToPreviousRoute } = this.state;
	
		if (redirectToPreviousRoute) {
		  return <Redirect to={from} />;
		}

		return (
			<GoogleLogin
				clientId="300709606324-sec60nd2b4hba9b1gkqdcpdlhv2p89kk.apps.googleusercontent.com"
				buttonText="Login"
				onSuccess={this.responseGoogle}
				onFailure={this.failGoogle}
			/>
		);
	}
}

export default Login;
