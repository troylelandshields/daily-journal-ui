import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import config from '../../services/config.js';
import CheckoutForm from './stripe/CheckoutForm.js';
import {Elements} from 'react-stripe-elements';
import auth from '../../services/auth.js';

class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			phoneNumber: "",
			isSubscribed: auth.isSubscribed()
		};
	}

	componentDidMount() {
		axios.get(`${config.apiHost}/users/${this.props.match.params.userId}/`)
			.then((resp) => {
				var phoneNumber = resp.data.phone_number;
				this.setState({
					phoneNumber: phoneNumber ? phoneNumber : "" 
				});
			});
	}
	    
	handleChange = (event) =>  {
		this.setState({
			phoneNumber: event.target.value
		});
	}
    
	handleSubmit = (event) => {
		axios.put(`${config.apiHost}/users/${this.props.match.params.userId}/`, {
			"phone_number": this.state.phoneNumber
		}).then((resp) => {
			alert("successfully updated your phone number, congratulations");
		});
		event.preventDefault();
	}

	handleSubscribe = () => {
		this.setState({
			isSubscribed: true
		});

		auth.user.subscription_id = "they subbed dont worry about it";
	}

	render() {
		return (
			<div>
				<Row>
					<Col>
					{ this.state.isSubscribed ?
							<form>
								<label>Phone Number</label>
								<input type='text' value={this.state.phoneNumber} onChange={this.handleChange} name='phone_number' /> 
								<input type='submit' value='Submit' onClick={this.handleSubmit}/>
							</form>
						:  null
					}
					</Col>
				</Row>

				
				<Row>
					<Col>
					{ !this.state.isSubscribed ? 
						<Elements>
							<CheckoutForm userId={this.props.match.params.userId} cb={this.handleSubscribe}/>
						</Elements>
						:  <p>Thanks for subscribing--if you're trying to cancel you'll need to email me: <a href="mailto:dailyjournalsubscriptions@gmail.com?Subject=Cancellation">dailyjournalsubscriptions@gmail.com</a></p>
					}
					</Col>
				</Row> 

			</div>
		);
	}
}

export default Settings;
