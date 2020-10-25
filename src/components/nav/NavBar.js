import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Login from '../login/Login.js';
import auth from '../../services/auth.js'



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


function NavBar() {
    return (
        <Navbar sticky="top">
            { auth.isAuthenticated 
            ? <Nav defaultActiveKey="journal">
                <Nav.Link as={Link} eventKey="journal" to={`/journal/${auth.user.id}`}>Journal</Nav.Link> 
                <Nav.Link as={Link} eventKey="settings" to={`/settings/${auth.user.id}`}>Settings</Nav.Link> 
                <NavDropdown title={auth.user.first_name} id="user-dropdown">
                    <Logout></Logout>
                </NavDropdown>
            </Nav>
            : <Login></Login> }
        </Navbar>
    )
}

export default NavBar;