import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Login from '../login/Login.js';
import auth from '../../services/auth.js'

function NavBar() {
    return (
        <Row>
            <Col>
                { auth.isAuthenticated 
                    ? <Link to={`/journal/${auth.user.id}`}>Journal</Link> 
                    : null }
            </Col>
            <Col>
                <Login></Login>
            </Col>
        </Row>
    )
}

export default NavBar;