import React from 'react';
import './App.css';
import axios from 'axios';
// import { ReactiveBase, DataSearch, SelectedFilters, ReactiveList } from '@appbaseio/reactivesearch';
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
        {/* <ReactiveBase app="crash" url="http://35.193.23.202:9200">
          <DataSearch componentId="Borough" dataField={["BOROUGH"]}/>
          <SelectedFilters />
          <ReactiveList
              componentId="SearchResult"
              react={{
                  "and": ["Borough"]
              }}
              renderItem={(res) => <div>{res['ACCIDENT DATE']}</div>}
          />
        </ReactiveBase> */}
      </div>
    );
  }
}

export default App;
