import React, { Component, useState, useEffect, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import config from '../../services/config.js';
import CheckoutForm from './stripe/CheckoutForm.js';
import {Elements} from 'react-stripe-elements';
import {AuthContext} from '../../services/auth.js';
import { toast } from 'react-toastify';

function DayOfWeekSelector(props) {
	if (!props.days) {
		return null;
	}
	const [days, setDays] = useState(parseInt(props.days, 2));
  
	function toggleDay(dayIndex) {
	  const mask = 1 << dayIndex;
	  setDays((days) => days ^ mask);
	  if (props.handleChange) {
		props.handleChange((days ^ mask).toString(2).padStart(7, "0"));
	  }
	}
  
	const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	const dayColors = [
		{start: "rgb(128, 0, 181)", end: "rgb(128, 0, 181)"},
		{start: "rgb(128, 0, 181)", end: "rgb(85, 0, 181)"},
		{start: "rgb(85, 0, 181)", end: "rgb(85, 10, 109)"},
		{start: "rgb(85, 10, 109)", end: "rgb(101, 20, 80"},
		{start: "rgb(101, 20, 80)", end: "rgb(101, 60, 30)"},
		{start: "rgb(101, 60, 30)", end: "rgb(40, 110, 50)"},
		{start:  "rgb(40, 110, 50)", end: "rgb(10, 140, 90)"}
	];
  
	return (
	  <div
		style={{
		  display: "flex",
		  justifyContent: "space-between",
		  width: "300px"
		//   borderRadius: "25px"
		//   overflow: "hidden"
		}}
	  >
		{dayLabels.map((label, index) => (
		  <button
			id={`day-${index}-${dayColors[index].start}`}
			key={index}
			style={{
				background: days & (1 << index) ? `linear-gradient(to right, ${dayColors[index].start}, ${dayColors[index].end})`: "white",
				color: days & (1 << index) ? "white" : "black",
				border: "none",
				padding: "5px 10px",
				borderRadius: index === 0 ? "25px 0 0 25px" : index === dayLabels.length - 1 ? "0 25px 25px 0" : "none"
			}}
			onClick={(e) => {
				e.preventDefault();
				toggleDay(index)
			}}
		  >
			{label}
		  </button>
		))}
	  </div>
	);
  }

  function Settings(props) {
	const auth = useContext(AuthContext);
	const [settings, setSettings] = useState({});
	const [isSubscribed, setIsSubscribed] = useState(auth.isSubscribed);
  
	useEffect(() => {
	  axios.get(`${config.apiHost}/users/${props.match.params.userId}/`)
		.then(resp => {
		  setSettings({
			days_of_week: resp.data.days_of_week,
			phone_number: resp.data.phone_number,
			send_hour: resp.data.send_hour,
			time_zone: resp.data.time_zone,
			prompt: resp.data.prompt
		  });
		});
	}, [props.match.params.userId]);
  
	const handleChange = (prop, val) => {
	  setSettings({...settings, [prop]: val});
	};
	  
	const handleSubmit = event => {
	  event.preventDefault();
	  axios.put(`${config.apiHost}/users/${props.match.params.userId}/`, settings).then(resp => {
		toast.success("Success!", {
		  position: "top-right",
		  autoClose: 5000,
		  hideProgressBar: false,
		  closeOnClick: true,
		  pauseOnHover: true,
		  draggable: true,
		  progress: undefined,
		  theme: "light",
		});
	  });
	};
  
	const handleSubscribe = () => {
	  setIsSubscribed(true);
	  auth.user.subscription_id = "they subbed dont worry about it";
	};
  
	return (
		<div>
			<Row>
				<Col>
				{ isSubscribed ?
					<form className="">
						<table>
							<tbody><tr>
								<td>
									<label style={{textAlign: "center", fontStyle:"bold", fontFamily: "'Playfair Display', serif", opacity:"100%"}}>Phone Number</label>
								</td>
								<td>
									<input style={{border:"none", padding: "5px",marginLeft: "8px", background: "linear-gradient(to right, rgb(0, 128, 181), rgb(128, 0, 181))", color:"white"}} type='text' value={settings.phone_number} onChange={(event) => handleChange(event.target.name, event.target.value)} name='phone_number' />
								</td>
							</tr>
							<tr>
								<td>
									<label style={{textAlign: "center", fontStyle:"bold", fontFamily: "'Playfair Display', serif", opacity:"100%"}}>Custom Message</label>
								</td>
								<td>
									<input style={{border:"none", padding: "5px",marginLeft: "8px", background: "linear-gradient(to right, rgb(0, 128, 181), rgb(128, 0, 181))", color:"white"}} type='text' value={settings.prompt} onChange={(event) => handleChange(event.target.name, event.target.value)} name='prompt' />
								</td>
							</tr>
							<tr>
								<td>
									<label style={{textAlign: "center", fontStyle:"bold", fontFamily: "'Playfair Display', serif", opacity:"100%"}}>Send Hour</label>
								</td>
								<td>
									<select id="hour" style={{width: "22%", border:"none", padding: "5px",marginLeft: "8px", background: "linear-gradient(to right, rgb(0, 128, 181), rgb(128, 0, 181))", color:"white"}} type='text' value={settings.send_hour} onChange={(event) => handleChange(event.target.name, parseInt(event.target.value))} name='send_hour'>
										<option value="">Choose an hour</option>
										<option value="6">6 AM</option>
										<option value="7">7 AM</option>
										<option value="8">8 AM</option>
										<option value="9">9 AM</option>
										<option value="10">10 AM</option>
										<option value="11">11 AM</option>
										<option value="12">12 PM</option>
										<option value="13">1 PM</option>
										<option value="14">2 PM</option>
										<option value="15">3 PM</option>
										<option value="16">4 PM</option>
										<option value="17">5 PM</option>
										<option value="18">6 PM</option>
										<option value="19">7 PM</option>
										<option value="20">8 PM</option>
										<option value="21">9 PM</option>
										<option value="22">10 PM</option>
										<option value="23">11 PM</option>
									</select>
									<select id="timezone" name="time_zone" value={settings.time_zone} style={{maxWidth:"27%", border:"none", padding: "5px", background: "linear-gradient(to right, rgb(128, 0, 181), rgb(101, 20, 80)", color:"white"}} onChange={(event) => handleChange(event.target.name, event.target.value)}>
										<option value="America/New_York">Eastern Time (ET)</option>
										<option value="America/Chicago">Central Time (CT)</option>
										<option value="America/Denver">Mountain Time (MT)</option>
										<option value="America/Phoenix">Arizona Time</option>
										<option value="America/Los_Angeles">Pacific Time (PT)</option>
										<option value="America/Anchorage">Alaska Time (AKT)</option>
										<option value="America/Adak">Hawaii-Aleutian Time (HAT)</option>
									</select>
								</td>
							</tr>
							<tr>
								<td>
									<label style={{textAlign: "center", fontStyle:"bold", fontFamily: "'Playfair Display', serif", opacity:"100%"}}>Send on Days</label>
								</td>
								<td>
									{/* <input style={{border:"none", padding: "5px",marginLeft: "8px", background: "linear-gradient(to right, rgb(0, 128, 181), rgb(128, 0, 181))", color:"white"}} type='text' value={settings.days_of_week} onChange={(event) => handleChange(event.target.name, event.target.value)} name='days_of_week' /> */}
									<DayOfWeekSelector days={settings.days_of_week} handleChange={(v) => handleChange("days_of_week", v)}></DayOfWeekSelector>
								</td>
							</tr></tbody>
						</table>
						<p><input style={{background:"none", border:'1px solid #cccccc', borderRadius:"8px"}} 
							onMouseOver={(e) => e.target.style.border = '1px solid #888888'}
							onMouseOut={(e) => e.target.style.border = '1px solid #cccccc'}
							type='submit' value='Save' onClick={handleSubmit}/></p>
					</form>
				:  null
				}
				</Col>
			</Row>

			
			<Row>
				<Col>
				{ !isSubscribed && 
					<Elements>
						<CheckoutForm userId={props.match.params.userId} cb={handleSubscribe}/>
					</Elements>
				}
				</Col>
			</Row> 

			<Row>
				<Col>
					<a href="https://portal.todayi.page/p/login/8wM9B80PK3I78PSbII" target="_blank">Manage Subscription</a>
				</Col>
			</Row> 
			
		</div>
	);
}

export default Settings;
