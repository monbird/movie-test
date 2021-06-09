import React, { Component } from 'react';

import poster_placeholder from '../images/poster-placeholder.png';

class PosterImg extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
        };
    }

    render() {
        const props = { ...this.props }; // clone props so we can mutate

        if (this.state.error || !props.src) {
            props.src = poster_placeholder;
        }

        return (
            <img
                {...props}
                onError={(e) => this.setState({ error: true })}
                alt="Poster"
            />
        );
    }
}

export default PosterImg;
