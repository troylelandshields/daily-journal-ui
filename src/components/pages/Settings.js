import React, { Component } from 'react';
import Moment from 'react-moment';
import { Row, Col } from 'react-bootstrap';
// import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';
import config from '../../services/config.js';
import CheckoutForm from './stripe/CheckoutForm.js';
import {Elements} from 'react-stripe-elements';

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
		axios.get(`${config.apiHost}/users/${this.props.match.params.userId}/`)
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
		axios.put(`${config.apiHost}/users/${this.props.match.params.userId}/`, {
			"phone_number": this.state.settings.phoneNumber
		}).then((resp) => {
			alert("successfully updated your phone number");
		});
		event.preventDefault();
	}

	render() {
		return (
			<div>
				<Row>
					<Col>
						<form>
							<label>Phone Number</label>
							<input type='text' value={this.state.settings.phoneNumber} onChange={this.handleChange} name='phone_number' /> 
							<input type='submit' value='Submit' onClick={this.handleSubmit}/>
						</form>
					</Col>
				</Row>

				<Row>
					<Col>
						<Elements>
							<CheckoutForm userId={this.props.match.params.userId} />
						</Elements>
					</Col>
				</Row>
			</div>
		);
	}
}

export default Settings;
