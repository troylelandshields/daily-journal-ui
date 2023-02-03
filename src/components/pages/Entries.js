import React, { Component, useState } from 'react';
import Radium from 'radium';
import Moment from 'react-moment';
import moment from 'moment';
import { Row, Col, FormText } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import config from '../../services/config.js';
import { CoffeeLoading } from 'react-loadingg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';


function EntryToolbox(props) {
	let toolboxStyle = {
		position: "relative",
		left:"4px",
		top: "4px",
		color: `rgba(${props.color.r},${props.color.g},${props.color.b},0.1)`,
		
		":hover": {
			color: `rgba(${props.color.r},${props.color.g},${props.color.b},0.4)`,
		}
	}
	
	let toolStyle = {
		cursor: "pointer",
		":hover": {
			color: `rgba(${props.color.r},${props.color.g},${props.color.b},1)`,
		}
	}

	let handleDelete = async () => {
		try {
			await axios.delete(props.entryUrl);
			if (props.handleDelete) {
				props.handleDelete(props.entryId);
			}
		} catch (e) {
			console.log(e);
		}
		
	};

	return (
		<div style={toolboxStyle}>
			<div>
				<div key={`edit${props.entryId}`} className="edit" style={toolStyle}>	
					<a><FontAwesomeIcon icon={faEdit}/></a>
				</div>
				<div key={`trash${props.entryId}`} className="trash" style={toolStyle}>
					<a onClick={handleDelete}><FontAwesomeIcon icon={faTrash}/></a>
				</div>
			</div>
		</div>  
	);
}

EntryToolbox = Radium(EntryToolbox);


function Entry(props) {
	const [deleted, setDeleted] = useState(false);

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
		backgroundColor: "white", 
		padding:"10px", 
		borderTopRightRadius: topCornerRadius, 
		borderBottomRightRadius: bottomCornerRadius,
		opacity:"70%"
	};

	
	return (
		!deleted ? <Row>
			<Col md={2} mdOffset={2} sm={2} smOffset={2} style={dateInfoStyle}>
				<Row><Col><Moment format="YYYY/MM/DD">{props.data.date}</Moment></Col></Row>
				<Row><Col><Moment style={{opacity: "50%"}} format="dddd">{props.data.date}</Moment></Col></Row>
				<Row><Col><Moment style={{opacity: "50%"}} fromNow>{props.data.date}</Moment></Col></Row>
			</Col>  
			<Col style={entryColStyle}>
				<div style={entryStyle}>{props.data.entry}</div>
			</Col>
			<EntryToolbox entryId={props.data.id} entryUrl={props.data.selfUrl} color={props.startColor} handleDelete={()=> {setDeleted(true)}}></EntryToolbox>
		</Row> : null 
	)
}

class Entries extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isDesc: this.props.match.params.order === "ASC" ? false : true,
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
		var order = this.state.isDesc?"DESC":"ASC";
		axios.get(`${config.apiHost}/users/${this.props.match.params.userId}/entries/?page=${pageNum}&per_page=${perPage}&order=${order}`)	
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
				
				let currentIdx = 0;
				loadedEntries.forEach((entry) => {
					entry.selfUrl = `${config.apiHost}/users/${this.props.match.params.userId}/entries/${entry.id}`;

					let endColor = {
						r: randDiff(startColor.r), g: randDiff(startColor.g), b: randDiff(startColor.b)
					};

					entry.startColor = startColor;
					entry.endColor = endColor;

					if ((entries.length === 0) || (loadedEntries[currentIdx-1] && loadedEntries[currentIdx-1].periodEnd)) {
						entry.periodStart = true;
					} 
					
					if (loadedEntries.length > currentIdx+1) {
						let nextEntry = loadedEntries[currentIdx+1];
						let currentMonth = moment(entry.date).month();
						let nextEntryMonth = moment(nextEntry.date).month();
						if (currentMonth != nextEntryMonth) {
							entry.periodEnd = true;
						}
					}

					currentIdx++;

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
			items.push(<Entry startColor={entry.startColor} endColor={entry.endColor} key={entry.id} periodStart={entry.periodStart} periodEnd={entry.periodEnd} data={entry}></Entry>);
		});

		return (
			<div key={this.state.isDesc}>
				{<CoffeeLoading style={{position: 'relative', left:'50%', marginBottom: "10px"}} /> }
				<a style={{position: 'relative', left:'50%', marginBottom: "10px"}} onClick={()=>this.setState({isDesc: !this.state.isDesc, entries: [], hasMore:true})}>
					{this.state.isDesc ? <FontAwesomeIcon icon={faSortDown}/> : <FontAwesomeIcon icon={faSortUp}/> }
				</a>
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
