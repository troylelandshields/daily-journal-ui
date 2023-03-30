import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Login from '../login/Login.js';
import auth from '../../services/auth.js'
import config from '../../services/config.js';

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
  

class Logout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false
		};
    }
    
    logout = () => {
        auth.signout(() => {
            this.setState({
                redirect: true
            });
        });
        
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

	render() {
		return (
            <div>
                {this.renderRedirect()}
                <NavDropdown.Item onSelect={this.logout}>
                    Logout
                </NavDropdown.Item>
            </div>
		);
	}
}


function NavBar(props) {
    let publicUserId = getPublicPathParameter(props.location);
    
    const [publicUser, setPublicUser] = useState(null);

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