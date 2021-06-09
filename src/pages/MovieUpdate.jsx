import React, { Component } from 'react';
import { CardForm } from '../components';

class MovieUpdate extends Component {
    render() {
        return <CardForm imdb_id={this.props.match.params.imdb_id} type="movie" />;
    }
}

export default MovieUpdate;
