import React, { Component } from "react";
import Maps from "./Maps";
import axios from "axios";
import BoroughChart from "./BoroughChart";
import ContributingFactorChart from "./ContributingFactorChart";

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
					<div className="row page-title-row">
						<div className="col-md-12">
							<h2 className="page-title">Crash Data Overview</h2>
						</div>
					</div>
					<div className="row">
						<div className="col-md-3">
							<div className="card card-overview card-num-of-data">
								<div className="card-body">
									<p className="card-title card-num-of-data-title">Number of Datas</p>
									<p className="card-text card-num-of-data-text">{this.state.totalData}</p>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<div className="card card-overview">
								<div className="card-body">
									<h5 className="card-title section-title">Number of Crashes (per Borough)</h5>
									<BoroughChart />
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="card card-overview">
								<div className="card-body">
									<h5 className="card-title section-title">Top 5 Crash Contributing Factors</h5>
									<ContributingFactorChart />
								</div>
							</div>
						</div>
						<div className="col-md-12 map-section">
							<h5 className="section-title">Latest 250 Crashes Location</h5>
							<Maps />	
						</div>
					</div>
			</div>
		);
	}
}
