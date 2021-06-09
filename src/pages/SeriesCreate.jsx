import React, { Component } from 'react';
import { CardForm } from '../components';

class SeriesCreate extends Component {
    render() {
        return <CardForm type="series" create={true} />;
    }
}

export default SeriesCreate;
