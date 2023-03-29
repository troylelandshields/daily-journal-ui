import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from './App';
import auth from './services/auth';

auth.autoLogin(() => ReactDOM.render(
    <Router>
        <App/>
    </Router>
, document.getElementById('root')));
