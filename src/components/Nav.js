import React, { Component } from "react";

class Nav extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg">
                <img className="navbar-logo" src="../NYPD.png" alt=""></img>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                        <h1 className="navbar-title">CrashSearch - Search Crash in NYC</h1>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Nav;