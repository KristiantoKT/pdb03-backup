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
import moment from "moment";
import { DateUtils } from "react-day-picker";
import dateFnsFormat from "date-fns/format";
import dateFnsParse from "date-fns/parse";
import Maps from './components/Maps';

function parseDate(str, format, locale) {
  const parsed = dateFnsParse(str, format, { locale });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
}

function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}

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

  dateQuery(value) {
    let query = null;
    if (value) {
      query = [
        {
          range: {
            date_from: {
              gte: moment(value.start).format("YYYYMMDD")
            }
          }
        },
        {
          range: {
            date_to: {
              lte: moment(value.end).format("YYYYMMDD")
            }
          }
        }
      ];
    }
    return query ? { query: { bool: { must: query } } } : null;
  }


  render() {
    const FORMAT = "MM/dd/yyyy";
    return (
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
          <div className="navbar">
            <div className="logo-container">
             <h1>CrashSearch - Search Crash in NYC</h1>
            </div>

            <div className="search-container">
              <DataSearch
                componentId="Location"
                dataField={["BOROUGH", "ON STREET NAME", "OFF STREET NAME", "CROSS STREET NAME"]}
                placeholder="Search location of crash..."
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
              <SelectedFilters />
            </div>
          </div>


          <div className="sub-container">
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
                title="Person Injured"
                defaultValue={0}
                labelPosition="right"
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
                title="Person Killed"
                defaultValue={0}
                labelPosition="right"
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
                  <i className="fa fa-star" /> Crash Date
                </b>
              </div>
              <DateRange
                componentId="Crash Range Date"
                dataField={["ACCIDENT DATE"]}
                title="DateRange"
                placeholder={{
                  start: 'Start Date',
                  end: 'End Date',
                }}
                dayPickerInputProps={{
                  formatDate,
                  format: FORMAT,
                  parseDate
                }}
                dataField="date_from"
                customQuery={this.dateQuery}
                initialMonth={new Date()}
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
                  <div>{res['BOROUGH']}</div>}
              />
            </div>

            <button
              className="toggle-button"
              onClick={this.handleClick.bind(this)}
            >
              {this.state.message}
            </button>
          </div>
        </ReactiveBase >
      </div >
    );
  }
}
export default App;
