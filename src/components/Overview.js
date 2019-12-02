import React, { Component } from "react";
import Maps from "./Maps";
import axios from "axios";
import BoroughChart from "./BoroughChart";

export default class Overview extends Component {
	constructor(props) {
    super(props)
    this.state = {
      totalData: ""
    }
	}
	
	getTotalData = async () => {
		const response = await axios.get('http://35.193.23.202:9200/accident/_search');
		this.setState({
			totalData: response.data.hits.total.value
		});
	}

	componentDidMount() {
		this.getTotalData();
	}

	render() {
		return (
			<div className="container" id="overviewContainer">
					<div className="row">
						<div className="col-md-12">
							<h2 className="section-title">New York City Crash Overview</h2>
						</div>
					</div>
					<div className="row">
						<div className="col-md-3">
							<div className="card card-overview">
								<div className="card-body">
									<h5 className="card-title">Number of Datas</h5>
									<h5 className="card-text">{this.state.totalData}</h5>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<div className="card card-overview">
								<div className="card-body">
									<h5 className="card-title">Number of Crash based on Borough</h5>
									<BoroughChart />
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<Maps />
					</div>
			</div>
		);
	}
}
