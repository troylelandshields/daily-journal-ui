import React, { Component } from 'react';
import Login from '../login/Login.js';
import {
	Redirect
  } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import auth from '../../services/auth.js';

function Home(props) {
	
	return (
		<div>
            Welcome!
            <Login></Login>
		</div>  
	);
}

export default Home;
