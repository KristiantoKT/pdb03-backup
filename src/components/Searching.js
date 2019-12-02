import React, { Component } from "react";
import {
    ReactiveBase,
    DataSearch,
    MultiList,
    DateRange,
    SelectedFilters,
    NumberBox,
    ReactiveList,
  
  } from "@appbaseio/reactivesearch";

class Searching extends Component {
    constructor(props) {
			super(props);

			this.state = {
					isClicked: false,
					message: "🔬Show Filters"
			};
    }
    
    handleClick() {
    this.setState({
        isClicked: !this.state.isClicked,
        message: this.state.isClicked ? "🔬 Show Filters" : "Show Maps"
    });
    }

    render() {
        return (
        <div className="container" id="searchContainer">
					<div className="row">
						<div className="col-md-12">
							<h2 className="page-title">Crash Data Search</h2>
						</div>
					</div>
					<ReactiveBase app="accident" url="http://35.193.23.202:9200" 
					theme={{
						typography: {
							fontFamily:
								'"Open Sans", sans-serif',
							fontSize: "16px"
						},
						colors: {
							primaryTextColor: "#5B86E5",
							primaryColor: "#2196F3",
						}
					}}
					>
						
            <div className="row">
              <div className="col-md-4">
                <div
                  className={
                    this.state.isClicked ? "left-bar-optional" : "left-bar"
                  }
                >
                  <div className="filter-heading center">
                    <b>
                      {" "}
                      <i className="fa fa-pied-piper-alt" /> Person Injured{" "}
                    </b>
                  </div>
                  <NumberBox
                    componentId="Number of Person Injured"
                    dataField={["NUMBER OF PERSONS INJURED"]}
                    defaultValue={0}
                    data={{
                      start: 0,
                      end: 16
                    }}
                    react={{
                      "and": ["Location",
                        "Number of Person Killed",
                        "Vehicle Type",
                        "Crash Factor",
                        "Crash Range Date"
                      ]
                    }}
                    className="numberFilter"
                  />
                  <hr />
                  <div className="filter-heading center">
                    <b>
                      {" "}
                      <i className="fa fa-dollar" /> Person Killed{" "}
                    </b>
                  </div>
                  <NumberBox
                    componentId="Number of Person Killed"
                    dataField={["NUMBER OF PERSONS KILLED"]}
                    defaultValue={0}
                    labelPosition="left"
                    data={{
                      start: 0,
                      end: 16
                    }}
                    react={{
                      "and": ["Location",
                        "Number of Person Injured",
                        "Vehicle Type",
                        "Crash Factor",
                        "Crash Range Date"
                      ]
                    }}
                    className="numberFilter"
                  />

                  <hr />
                  <div className="filter-heading center">
                    <b>
                      <i className="fa fa-star" /> Vehicle Type
                    </b>
                  </div>
                  <MultiList
                    componentId="Vehicle Type"
                    dataField={"VEHICLE TYPE CODE 1.keyword",
                      "VEHICLE TYPE CODE 2.keyword"
                    }
                    sortBy="asc"
                    queryFormat="or"
                    selectAllLabel="All vehicle type"
                    placeholder="Search for vehicle type"
                    react={{
                      "and": ["Location",
                        "Number of Person Injured",
                        "Number of Person Killed",
                        "Crash Factor",
                        "Crash Range Date"
                      ]
                    }}
                  />

                  <hr/>
                  <div className="filter-heading center">
                    <b>
                      <i className="fa fa-star" /> Crash Factor
                    </b>
                  </div>
                  <MultiList
                    componentId="Crash Factor"
                    dataField={"CONTRIBUTING FACTOR VEHICLE 1.keyword",
                      "CONTRIBUTING FACTOR VEHICLE 2.keyword"
                    }
                    sortBy="asc"
                    queryFormat="or"
                    selectAllLabel="All crash factor"
                    placeholder="Search for crash factor"
                    react={{
                      "and": ["Location",
                        "Number of Person Injured",
                        "Number of Person Killed",
                        "Vehicle Type",
                        "Crash Range Date"
                      ]
                    }}
                  />

                  <hr/>
                  <div className="filter-heading center">
                    <b>
                      <i className="fa fa-star" /> Crash Date Range
                    </b>
                  </div>
                  <DateRange
                    componentId="Crash Range Date"
                    dataField={["ACCIDENT DATE"]}
                    placeholder={{
                      start: 'Start Date',
                      end: 'End Date',
                    }}
                    react={{
                      "and": ["Location",
                        "Number of Person Injured",
                        "Number of Person Killed",
                        "Vehicle Type",
                        "Crash Factor",
                      ]
                    }}
                  />
                </div>
              </div>
              <div className="col-md-8">
                <DataSearch
                  componentId="Location"
                  dataField={["BOROUGH", "ON STREET NAME", "OFF STREET NAME", "CROSS STREET NAME"]}
                  placeholder="Search location of crash (by Borough or Street Name)"
                  react={{
                    "and": [
                      "Number of Person Injured",
                      "Number of Person Killed",
                      "Vehicle Type",
                      "Crash Factor",
                      "Crash Range Date"
                    ]
                  }}
                />
                <div
                  className={
                    this.state.isClicked
                      ? "result-container-optional"
                      : "result-container"
                  }
                >
                <SelectedFilters
                  showClearAll={true}
                  clearAllLabel="Clear filters"
                />
                <ReactiveList
                  componentId="SearchResult"
                  dataField="ACCIDENT DATE"
                  pagination
                  paginationAt="bottom"
                  size={10}
                  sortOptions={
                    [
                      {label: "Accident Date (Descending)", dataField: "ACCIDENT DATE", sortBy:"desc"},
                      {label: "Accident Date (Ascending)", dataField: "ACCIDENT DATE", sortBy:"asc"}
                    ]
                  }
                  defaultSortOption="Accident Date (Descending)"
                  react={{
                    "and": ["Location",
                      "Number of Person Injured",
                      "Number of Person Killed",
                      "Vehicle Type",
                      "Crash Factor",
                      "Crash Range Date"

                    ]
                  }}
                  renderItem={(res) =>
                    <div className="card search-result-card">
                      <div className="card-body">
                        <h4 className="card-title search-result-card-title">Collision ID #{res['COLLISION_ID']}</h4>
                        <p className="card-subtitle search-result-card-subtitle">Happened on {res['ACCIDENT DATE']} at {res['ACCIDENT TIME']}</p>
                        <p className="card-text">
													<span className="search-result-address">Address: {res["OFF STREET NAME"] || res["ON STREET NAME"] || res["CROSS STREET NAME"]}</span><br></br>
													<span className="search-result-borough">Borough: {res["BOROUGH"] || "UNDEFINED"}</span><br></br>
													<span className="search-result-casualities">{res["NUMBER OF PERSONS INJURED"] + " person injured and " + res["NUMBER OF PERSONS KILLED"] + " person killed"}</span><br></br>
													<span className="search-result-caused-by">Incident was caused by: {res["CONTRIBUTING FACTOR VEHICLE 1"]}</span>
												</p>												
                      </div>
                    </div>}
                />
              </div>
              <button className="toggle-button" onClick={this.handleClick.bind(this)}>
                {this.state.message}
              </button>
              </div>
            </div>
          </ReactiveBase >
        </div>
        );
    }
}

export default Searching;