import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CardForm } from '../components';
import { setPiece } from '../actions/pieceActions';

class MovieUpdate extends Component {
    render() {
        return (
            <CardForm type="movie" imdb_id={this.props.match.params.imdb_id} />
        );
    }

    componentDidMount() {
        this.props.dispatch(
            setPiece({
                imdb_id: this.props.match.params.imdb_id,
            })
        );
    }
}

export default connect()(MovieUpdate);
