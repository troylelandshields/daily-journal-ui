import React, { Component } from 'react';
import Moment from 'react-moment';
import { Row, Col } from 'react-bootstrap';
// import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';

function Entry(props) {
	return (
		<Row>
			<Col md={2} mdOffset={2}>
				<Moment format="YYYY/MM/DD">{props.data.date}</Moment>
			</Col>  
			<Col md={8} mdOffset={2}>
				{props.data.entry}
			</Col>  
		</Row>
	)
}

class Entries extends Component {
	constructor(props) {
		super(props);
		this.state = {
			entries: []
		};
	}

	componentDidMount() {
		axios.get(`http://localhost:3000/users/${this.props.match.params.userId}/entries/`)
			.then((resp) => {
				this.setState({
					entries: resp.data
				});
			});
	}

	render() {

		return (
			this.state.entries.map(entry => (
				<Entry key={entry.id} data={entry}></Entry>
			))
		);
	}
}

export default Entries;
