import React, { Component } from 'react';
import { CardForm } from '../components';

class MovieUpdate extends Component {
    render() {
        return <CardForm id={this.props.match.params.id} type="movie" />;
    }
}

export default MovieUpdate;
