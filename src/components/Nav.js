import React, { Component } from "react";

class Nav extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <img className="navbar-logo" src="../NYPD.png" alt=""></img>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                        <h1 className="navbar-title">NYPD CrashSearch - Search Crash in NYC</h1>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Nav;