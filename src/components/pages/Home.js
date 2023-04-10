import React, { Component } from 'react';
import Login from '../login/Login.js';
import {
	Redirect
  } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

function Home(props) {
	
	return (
		<div>
            <Login></Login>
		</div>  
	);
}

export default Home;
