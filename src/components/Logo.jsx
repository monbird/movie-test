import React, { Component } from 'react';

import logo from '../images/logo.png';

class Logo extends Component {
    render() {
        return (
            <div className="navbar-brand">
                <img src={logo} alt="Logo"></img>
            </div>
        );
    }
}

export default Logo;
