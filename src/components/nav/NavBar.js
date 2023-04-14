import React, { Component, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Login from '../login/Login.js';
import {AuthContext} from '../../services/auth.js'
import config from '../../services/config.js';
import { useAuth0 } from "@auth0/auth0-react";

function getPublicPathParameter(url) {
    if (!url) {
        return null;
    }
    const parts = url.split("/");
    const publicIndex = parts.indexOf("public");
    
    if (publicIndex === -1) {
      return null;
    }
    
    return parts[publicIndex + 1];
}

function Logout() {
    const [redirect, setRedirect] = useState(false);
    const auth = useContext(AuthContext);
    const {logout} = useAuth0();
  
    const doLogout = () => {
        auth.signout(logout, () => {
            setRedirect(true);
        });
    };
  
    const renderRedirect = () => {
      if (redirect) {
        return <Redirect to="/" />;
      }
    };
  
    return (
      <div>
        {renderRedirect()}
        <NavDropdown.Item onSelect={doLogout}>Logout</NavDropdown.Item>
      </div>
    );
}

function NavBar(props) {
    let publicUserId = getPublicPathParameter(props.location);
    
    const [publicUser, setPublicUser] = useState(null);
    const auth = useContext(AuthContext);

    const loadUser = () => {
		axios.get(`${config.apiHost}/public/${publicUserId}/`)
        .then((resp) => {
            setPublicUser(resp.data);
        });
	}

    useEffect(() => {
        if (publicUserId && !publicUser) {
            loadUser();
        }
    }, [publicUserId]);

    return (
        <Navbar sticky="top">
            <>
            { !publicUserId && auth.isAuthenticated 
            ? <Nav>
                <NavDropdown title="Monthly" id="summaries-dropdown">
                    <Nav.Link as={Link} eventKey="overviews" to={`/summaries/${auth.user.id}/default`}>Overviews</Nav.Link> 
                    <Nav.Link as={Link} eventKey="haikus" to={`/summaries/${auth.user.id}/haiku`}>Haikus</Nav.Link> 
                    <Nav.Link as={Link} eventKey="poetry" to={`/summaries/${auth.user.id}/poetry`}>Poems</Nav.Link> 
                </NavDropdown>
                <Nav.Link as={Link} eventKey="journal" to={`/journal/${auth.user.id}`}>Journal</Nav.Link> 
                <Nav.Link as={Link} eventKey="settings" to={`/settings/${auth.user.id}`}>Settings</Nav.Link> 
                <NavDropdown title={auth.user.first_name} id="user-dropdown">
                    <Logout></Logout>
                </NavDropdown>
            </Nav>
            : publicUserId && publicUser
                ? <Nav>
                    <NavDropdown title={`${publicUser.first_name}'s Months`} id="public-summaries-dropdown">
                        <Nav.Link as={Link} eventKey="public-overviews" to={`/public/${publicUserId}/summaries/default`}>Public Overviews</Nav.Link> 
                        <Nav.Link as={Link} eventKey="public-haikus" to={`/public/${publicUserId}/summaries/haiku`}>Public Haikus</Nav.Link> 
                        <Nav.Link as={Link} eventKey="public-poetry" to={`/public/${publicUserId}/summaries/poetry`}>Public Poems</Nav.Link> 
                    </NavDropdown>
                    <Nav.Link as={Link} eventKey="public-journal" to={`/public/${publicUserId}/journal`}>{`Public Journal`}</Nav.Link> 
                    <Nav.Link as={Link} eventKey="public-signin" to={`/`}>{auth.isAuthenticated ? "Mine" : "Sign Up"}</Nav.Link> 
                </Nav> 
            : null }
            </>
        </Navbar>
    )
}

export default NavBar;