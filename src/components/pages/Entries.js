import React, { Component } from 'react';
import Moment from 'react-moment';
import { Row, Col } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import config from '../../services/config.js';
import { CoffeeLoading } from 'react-loadingg';

function Entry(props) {
	let gradient = `linear-gradient(0deg, rgba(${props.endColor.r},${props.endColor.g},${props.endColor.b},1) 0%, rgba(${props.startColor.r},${props.startColor.g},${props.startColor.b},1) 100%)`;
	let cornerRadius = props.cornerRadius ? props.cornerRadius : "0px";
	
	return (
		<Row>
			<Col md={2} mdOffset={2} sm={2} smOffset={2} style={{background: gradient, color: "white", marginBottom:"2px", marginRight:"2px", padding:"15px", borderTopLeftRadius: cornerRadius}}>
				<Row><Col><Moment format="YYYY/MM/DD">{props.data.date}</Moment></Col></Row>
				<Row><Col><Moment style={{opacity: "50%"}} fromNow>{props.data.date}</Moment></Col></Row>
			</Col>  
			<Col style={{background: gradient, color: "black", marginBottom:"2px", padding:"15px", borderTopRightRadius: cornerRadius, fontSize: "20px"}}>
				<div style={{backgroundColor: "white", padding:"10px", borderTopRightRadius: cornerRadius, opacity:"70%"}}>{props.data.entry}</div>
			</Col>  
		</Row>
	)
}

class Entries extends Component {
	constructor(props) {
		super(props);
		this.state = {
			entries: [],
			hasMore: true,
			color: {
				r: 0,
				g: 128,
				b: 181
			}
		};
	}

	loadEntries = (pageNum) => {
		var perPage = 20;
		axios.get(`${config.apiHost}/users/${this.props.match.params.userId}/entries/?page=${pageNum}&per_page=${perPage}`)	
			.then((resp) => {
				var entries = this.state.entries;
				var loadedEntries = resp.data;

				let startColor = this.state.color;

				let randDiff = (num) => {
					let diff = Math.floor(Math.random() * 32);

					// if num = 128
					let plusMinusRatio = 1 - (num / 128)

					if (Math.random() < plusMinusRatio) {
						return num + diff;
					} else {
						return num - diff;
					}
				}

				loadedEntries.forEach((entry) => {
					let endColor = {
						r: randDiff(startColor.r), g: randDiff(startColor.g), b: randDiff(startColor.b)
					};

					entry.startColor = startColor;
					entry.endColor = endColor;

					if (entries.length === 0) {
						entry.cornerRadius = "15px";
					}

					entries.push(entry);

					startColor = endColor;
				});

				var hasMore = true;
				if (loadedEntries.length < perPage) {
					hasMore = false;
				}

				this.setState({
					entries: entries,
					hasMore: hasMore,
					color: startColor
				});
			});
	}

	render() {
		var items = [];

		this.state.entries.forEach(entry => {
			items.push(<Entry startColor={entry.startColor} endColor={entry.endColor} key={entry.id} cornerRadius={entry.cornerRadius} data={entry}></Entry>);
		})


		return (
			<div>
			{<CoffeeLoading style={{position: 'relative', left:'50%', marginBottom: "10px"}} /> }
			<InfiniteScroll
				pageStart={0}
				loadMore={this.loadEntries.bind(this)}
				hasMore={this.state.hasMore}
				loader={this.state.entries.length > 0 ? <CoffeeLoading style={{position: 'relative', left:'50%', marginTop:"20px"}} /> : null}
			>
				{items}
			</InfiniteScroll>
			</div>
		);
	}
}

export default Entries;
