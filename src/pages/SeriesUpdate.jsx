import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CardForm } from '../components';
import { setPiece } from '../actions/pieceActions';

class SeriesUpdate extends Component {
    render() {
        return <CardForm type="series" />;
    }

    componentDidMount() {
        this.props.dispatch(
            setPiece({
                imdb_id: this.props.match.params.imdb_id,
            })
        );
    }
}

export default connect()(SeriesUpdate);
