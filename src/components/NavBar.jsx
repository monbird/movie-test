import React, { Component } from 'react';

import Logo from './Logo';
import Links from './Links';

class NavBar extends Component {
    openNav() {
        document.getElementById('sleek-nav').style.width = '100%';
    }

    closeNav() {
        document.getElementById('sleek-nav').style.width = '0%';
        window.scrollTo({ top: 0 });
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <div className="container">
                    <button
                        className="navbar-toggler mx-0 mx-sm-3"
                        type="button"
                        aria-controls="navbar-toggler"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={this.openNav}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Logo />
                    <div
                        className="collapse navbar-collapse"
                        id="navbar-toggler"
                    >
                        <Links />
                    </div>
                </div>
                <div id="sleek-nav" className="nav-collapse-overlay">
                    <button
                        type="button"
                        className="buttonAsLink closebtn"
                        onClick={this.closeNav}
                    >
                        &times;
                    </button>
                    <div className="nav-collapse-overlay-content">
                        <Links closeNav={this.closeNav} />
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;
