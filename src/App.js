import React from 'react';
import './App.css';
import axios from 'axios';
import { ReactiveBase, DataSearch, SelectedFilters, ReactiveList, MultiList, DateRange } from '@appbaseio/reactivesearch';
import Maps from './components/Maps';

async function elasticsearch() {
  await axios.get('http://35.193.23.202:9200/')
  .then((response) => {
    console.log(response);
  })
}

class App extends React.Component{
  render() {
    elasticsearch();
    return (
      <div className="App">
        <Maps />
        <ReactiveBase app="accident" url="http://35.193.23.202:9200">
          <DateRange componentId="dateRange" dataField="ACCIDENT DATE" className="datePicker"/>
          <ReactiveList
              componentId="SearchResult"
              react={{
                  "and": ["dateRange"]
              }}
              renderItem={(res) => <div>{res['ACCIDENT DATE']}</div>}
          />
        </ReactiveBase>
      </div>
    );
  }
}

export default App;
