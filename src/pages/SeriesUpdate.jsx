import React, { Component } from 'react';
import { CardForm } from '../components';

class SeriesUpdate extends Component {
    render() {
        return <CardForm imdb_id={this.props.match.params.imdb_id} type="series" />;
    }
}

export default SeriesUpdate;
