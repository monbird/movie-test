import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';

class Links extends Component {
    // TODO: consider react refs and get rid of jquery
    componentDidMount() {
        $('[data-toggle="tooltip"]').tooltip();
    }

    render() {
        return (
            <ul className="navbar-nav mr-auto mt-2 mt-md-0" key="nav-ul-1">
                <li className="nav-item my-1 my-md-0">
                    <NavLink
                        to="/movies"
                        className="nav-link pt-1"
                        activeClassName="active"
                        onClick={this.props.closeNav}
                    >
                        Movies
                    </NavLink>
                </li>
                <li className="nav-item my-1 my-md-0">
                    <NavLink
                        to="/series"
                        className="nav-link pt-1"
                        activeClassName="active"
                        onClick={this.props.closeNav}
                    >
                        Series
                    </NavLink>
                </li>
            </ul>
        );
    }
}

export default Links;
