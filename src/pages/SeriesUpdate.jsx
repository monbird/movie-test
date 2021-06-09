import React, { Component } from 'react';
import { CardForm } from '../components';

class SeriesUpdate extends Component {
    render() {
        return <CardForm id={this.props.match.params.id} type="series" />;
    }
}

export default SeriesUpdate;
