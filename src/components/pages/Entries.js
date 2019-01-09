import React, { Component } from 'react';
import Moment from 'react-moment';
import { Row, Col } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import config from '../../services/config.js';

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
			entries: [],
			hasMore: true
		};
	}

	loadEntries = (pageNum) => {
		var perPage = 20;
		axios.get(`${config.apiHost}/users/${this.props.match.params.userId}/entries/?page=${pageNum}&per_page=${perPage}`)
			.then((resp) => {
				var entries = this.state.entries;
				var loadedEntries = resp.data;

				loadedEntries.map((entry) => {
					entries.push(entry);
				});

				var hasMore = true;
				if (loadedEntries.length < perPage) {
					hasMore = false;
				}

				this.setState({
					entries: entries,
					hasMore: hasMore
				});
			});
	}

	render() {
		var items = [];

		this.state.entries.map(entry => {
			items.push(<Entry key={entry.id} data={entry}></Entry>);
		})


		return (
			<InfiniteScroll
				pageStart={0}
				loadMore={this.loadEntries.bind(this)}
				hasMore={this.state.hasMore}
				loader={<div className="loader" key={0}>Loading ...</div>}
			>
				{items}
			</InfiniteScroll>

		);
	}
}

export default Entries;
