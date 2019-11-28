import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function elasticsearch() {
  const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
  const URL = 'http://localhost:9200/';
  // const response = await axios.get('http://localhost:9200/',{
  //   mode: 'no-cors',
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //     'content-type':'application/json',
  //   },
  //   withCredentials: true,
  //   credentials: 'same-origin',
  // });
  // console.log(response);
  axios({
    method: 'get',
    url: PROXY_URL+URL,
  }).then(response => {
    console.log(response);
  })
}

class App extends React.Component{
  render() {
    elasticsearch();
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* <p>
            {elasticsearch()}
          </p> */}
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}


export default App;
