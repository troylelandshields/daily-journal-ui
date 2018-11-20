import React, { Component } from 'react';
// import { Grid, Row, Col, Button } from 'react-bootstrap';
// import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: ''
        };
      }
    
      handleChange(event) {
        this.setState({
            phone: event.target.value
        });
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.phone);
        event.preventDefault();
      }
    

    render() {

        return (
            <Row>
                <Col>
                    <form>
                        <input type='text' value={this.state.value} onChange={this.handleChange} name='phone' />
                        <input type='submit' value='Submit' />
                    </form>
                </Col>
            </Row>
        );
    }
}

export default Entries;
