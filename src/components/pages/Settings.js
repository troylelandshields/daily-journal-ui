import React, { Component } from 'react';
import Moment from 'react-moment';
import { Row, Col } from 'react-bootstrap';
// import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';

class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			settings: {
				phoneNumber: ""
			}
		};
	}

	componentDidMount() {
		axios.get(`http://localhost:3000/users/${this.props.match.params.userId}/`)
			.then((resp) => {
				var phoneNumber = resp.data.phone_number;
				this.setState({
					settings: {
						phoneNumber: phoneNumber ? phoneNumber : "" 
					}
				});
			});
	}
	    
	handleChange = (event) =>  {
		this.setState({
			settings: {
				phoneNumber: event.target.value
			}
		});
	}
    
	handleSubmit = (event) => {
		axios.put(`http://localhost:3000/users/${this.props.match.params.userId}/`, {
			"phone_number": this.state.settings.phoneNumber
		}).then((resp) => {
			alert("successfully updated your phone number");
		});
		event.preventDefault();
	}

	render() {
		return (
			<Row>
				<Col>
					<form>
						<label>Phone Number</label>
						<input type='text' value={this.state.settings.phoneNumber} onChange={this.handleChange} name='phone_number' /> 
						<input type='submit' value='Submit' onClick={this.handleSubmit}/>
					</form>
				</Col>
			</Row>
		);
	}
}

export default Settings;