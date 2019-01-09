import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
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
                <Button onClick={this.logout}>
                    Logout
                </Button>
            </div>
		);
	}
}


function NavBar() {
    return (
        <Row>
            <Col>
                { auth.isAuthenticated 
                    ? <Link to={`/journal/${auth.user.id}`}>Journal</Link> 
                    : null }
            </Col>
            <Col>
                { auth.isAuthenticated 
                    ? <Link to={`/settings/${auth.user.id}`}>Settings</Link> 
                    : null }
            </Col>
            <Col>
                { auth.isAuthenticated 
                    ? <Logout></Logout> 
                    : null }
            </Col>
            <Col>
                <Login></Login>
            </Col>
        </Row>
    )
}

export default NavBar;