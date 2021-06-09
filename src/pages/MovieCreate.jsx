import React, { Component } from 'react';
import { CardForm } from '../components';

class MovieCreate extends Component {
    render() {
        return <CardForm type="movie" create={true} />;
    }
}

export default MovieCreate;
