import React, { Component } from 'react';

import CardFront from './CardFront';
import CardBack from './CardBack';

class Card extends Component {
    render() {
        if (!this.props.data.title) {
            return null;
        } else {
            return (
                <div className="col-6 col-md-4 col-lg-3 col-xl-2dot4 pb-5 px-2 px-sm-3">
                    <div>
                        <CardFront
                            data={this.props.data}
                            refresher={this.props.refresher}
                            highlightedMovieId={this.props.highlightedMovieId}
                        />
                        <CardBack
                            data={this.props.data}
                            refresher={this.props.refresher}
                        />
                    </div>
                </div>
            );
        }
    }
}

export default Card;
