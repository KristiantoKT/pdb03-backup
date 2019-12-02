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
import "./App.css";
import Maps from './components/Maps';
import Nav from "./components/Nav";

class App extends Component {
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
      <div className="app">
        <Nav />
        <div className="overview-container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="section-title">Crash Overview</h2>
            </div>
            <div className="col-md-6 overview-subtitle">
              <h3>Crash Infographic</h3>
            </div>
            <div className="col-md-6 crash-map overview-subtitle">
              <h3>Crash Map</h3>
              <Maps />
            </div>
          </div>
        </div>

        <div className="main-container">
          <ReactiveBase
            app="accident"
            url="http://35.193.23.202:9200"
            theme={{
              typography: {
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Droid Sans", "Helvetica Neue", sans-serif',
                fontSize: "16px"
              },
              colors: {
                textColor: "#fff",
                backgroundColor: "#212121",
                primaryTextColor: "#fff",
                primaryColor: "#2196F3",
                titleColor: "#fff",
                alertColor: "#d9534f",
                borderColor: "#666"
              }
            }}
          >
            <div className="row">
              <div className="col-md-12">
                <h2 className="section-title">Crash Search</h2>
              </div>
              <div className="col-md-3">
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
                  <hr className="blue" />
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

                  <hr className="blue" />
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

                  <hr className="blue" />
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

                  <hr className="blue" />
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
              <div className="col-md-9">
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
                  size={15}
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
                  // render={({ data })}
                  renderItem={(res) =>
                    <div>{res['COLLISION_ID']}, {res['ACCIDENT DATE']}, {res['ACCIDENT TIME']}</div>}
                />
              </div>
              <button className="toggle-button" onClick={this.handleClick.bind(this)}>
                {this.state.message}
              </button>
              </div>
            </div>
          </ReactiveBase >
        </div >
      </div>
    );
  }
}
export default App;
