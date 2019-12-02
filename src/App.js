import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Overview from './components/Overview';
import Searching from './components/Searching'
import "./App.css";

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
      <Router>
      <div className="app">
        <nav className="navbar fixed-top navbar-expand-lg">
            <a className="navbar-brand" href="#"><img className="navbar-logo" src="../NYPD.png" alt=""></img> NYPD CrashSearch</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li><Link to={'/'} className="nav-link">Overview</Link></li>
                    <li><Link to={'/search'} className="nav-link">Search</Link></li>
                </ul>
            </div>
        </nav>
        <Switch>
          <Route exact path="/" component={Overview} />
          <Route path="/search" component={Searching} />
        </Switch>
      </div>
      </Router>
    );
  }
}
export default App;
