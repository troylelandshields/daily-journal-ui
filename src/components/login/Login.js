import React, { Component } from 'react';
import {
	Redirect
  } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import auth from '../../services/auth.js';

class Login extends Component {
	state = {
		dst: "",
		query: ""
	};

	responseGoogle = (response) => {
		auth.authenticate(response.tokenId, () => {
			if (auth.isAuthenticated && auth.isSetUp()) {
				this.setState({ dst: `/journal/${auth.user.id}` });
			} else if (auth.isAuthenticated && !auth.isSetUp()) {
				this.setState({ dst: `/settings/${auth.user.id}` });
			}
		})
	}

	failGoogle = (response) => {
		console.log("login failed", response);
		axios.defaults.headers.common['Authorization'] = null;
	}

	componentWillMount = () => {
		auth.autoLogin(() => {
			if (auth.isAuthenticated && auth.isSetUp()) {
				debugger
				this.setState({ dst: `/journal/${auth.user.id}`, query: window.location.query });
			} else if (auth.isAuthenticated && !auth.isSetUp()) {
				this.setState({ dst: `/settings/${auth.user.id}`, query: window.location.query });
			}
		})
	}

	render() {
		const { dst, query } = this.state;
	
		if (dst && window.location.pathname !== dst) {
			debugger;
		  return <Redirect to={{pathname:dst, query:query}} />;
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
