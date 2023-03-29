import React, { Component, useEffect, useState } from 'react';
import Radium from 'radium';
import Moment from 'react-moment';
import moment from 'moment';
import { Row, Col, FormText } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import config from '../../services/config.js';
import { CoffeeLoading } from 'react-loadingg';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

function Summary(props) {
	const [summary, setSummary] = useState({});

	// let loadSummary = async () => {
	// 	try {
	// 		let resp = await axios.post(`${config.apiHost}/users/${props.data.user_id}/summaries`, props.data);
	// 		setSummary(resp.data);
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// }

	// useEffect(() => {
	// 	loadSummary();
	// }, []);

	let gradient = `linear-gradient(0deg, rgba(${props.endColor.r},${props.endColor.g},${props.endColor.b},1) 0%, rgba(${props.startColor.r},${props.startColor.g},${props.startColor.b},1) 100%)`;
	
	let topCornerRadius = props.periodStart ? "15px" : "0px";
	let bottomCornerRadius = props.periodEnd ? "15px" : "0px";
	let baseStyle = {
		background: gradient, 
		marginBottom:"2px", 
		padding:"15px", 
	};

	let dateInfoStyle = {
		...baseStyle,
		color: "white", 
		marginRight:"2px", 
		borderTopLeftRadius: topCornerRadius,
		borderBottomLeftRadius: bottomCornerRadius
	}

	let entryColStyle = {
		...baseStyle,
		background: gradient,
		color: "black",
		borderTopRightRadius: topCornerRadius,
		borderBottomRightRadius: bottomCornerRadius,
		fontSize: "20px"
	}

	let entryStyle = {
		whiteSpace:"pre-wrap",
		backgroundColor: "white", 
		padding:"10px", 
		borderTopRightRadius: topCornerRadius, 
		borderBottomRightRadius: bottomCornerRadius,
		opacity:"70%"
	};

	
	return (
		<Row>
			<Col md={2} mdOffset={2} sm={2} smOffset={2} style={dateInfoStyle}>
				<Row><Col><Moment format="MMM YYYY">{props.data.start_date}</Moment></Col></Row>
			</Col>  
			<Col style={entryColStyle}>
				{props.data.summary ? <div style={entryStyle}>{props.data.summary.trim()}</div> : <CoffeeLoading />}
			</Col>
		</Row>
	)
}

class Summaries extends Component {
	constructor(props) {
		super(props);
		this.isPublic = this.props.location.pathname.includes("public");
		this.url = !this.isPublic ? `${config.apiHost}/users/${this.props.match.params.userId}/summaries/` : `${config.apiHost}/public/${this.props.match.params.userId}/summaries/${this.props.match.params.style}`;
		
		this.state = {
			summaries: [],
			isDesc: this.props.match.params.order === "ASC" ? false : true,
			hasMore: true,
			color: {
				r: 128,
				g: 0,
				b: 181
			}
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps.match.params.style !== this.props.match.params.style) {
		  	this.setState({summaries: [], hasMore: true});
		}
	}

	loadSummaries = async (pageNum) => {
		var perPage = 1;
		var order = this.state.isDesc?"DESC":"ASC";
		let resp = await axios.get(`${this.url}?page=${pageNum}&per_page=${perPage}&style=${this.props.match.params.style}&order=${order}`)	
		
		var summaries = this.state.summaries;
		var loadedSummaries = resp.data;

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

		loadedSummaries.forEach(eg => {
			if (eg.id === "00000000-0000-0000-0000-000000000000") {
				return;
			}
			let endColor = {
				r: randDiff(startColor.r), g: randDiff(startColor.g), b: randDiff(startColor.b)
			};

			eg.startColor = startColor;
			eg.endColor = endColor;
			startColor = endColor;

			summaries.push(eg);
		});

		var hasMore = true;
		if (loadedSummaries.length < perPage) {
			hasMore = false;
		}

		this.setState({
			summaries: summaries,
			hasMore: hasMore,
			color: startColor
		});
	}

	render() {
		var items = [];

		this.state.summaries.forEach(eg => {
			items.push(<Summary startColor={eg.startColor} endColor={eg.endColor} key={this.props.match.params.style + eg.start_date + eg.id} periodStart={true} periodEnd={true} data={eg}></Summary>);
		});

		return (
			<div key={this.props.match.params.style + this.state.isDesc}>
				{<CoffeeLoading style={{position: 'relative', left:'50%', marginBottom: "10px"}} /> }
				<a style={{position: 'relative', left:'50%', marginBottom: "10px"}} onClick={()=>this.setState({isDesc: !this.state.isDesc, summaries: [], hasMore:true})}>
					{this.state.isDesc ? <FontAwesomeIcon icon={faSortDown}/> : <FontAwesomeIcon icon={faSortUp}/> }
				</a>
				<InfiniteScroll
					pageStart={0}
					loadMore={this.loadSummaries.bind(this)}
					hasMore={this.state.hasMore}
					loader={this.state.summaries.length > 0 ? <CoffeeLoading style={{position: 'relative', left:'50%', marginTop:"20px"}} /> : null}
				>
					{items}
				</InfiniteScroll>
			</div>
		);
	}
}

export default Summaries;
