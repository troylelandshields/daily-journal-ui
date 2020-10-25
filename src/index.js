import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from "react-router-dom";
import './index.css';
import App from './App';

ReactDOM.render(
    <Router>
        <App/>
    </Router>
, document.getElementById('root'));
