import React, { Component } from 'react';
import Moment from 'react-moment';
import { Icon } from 'semantic-ui-react';

import { SwitchButton } from './ActionButtons';
import Ratings from './Ratings';
import PosterImg from './PosterImg';

class CardFront extends Component {
    render() {
        return (
            <div
                className={
                    'card card-front' +
                    (this.props.highlightedMovieId === this.props.data.imdb_id
                        ? ' bg-dark border-success'
                        : '') +
                    (this.props.data.is_watched ? ' watched' : '')
                }
                id={
                    this.props.highlightedMovieId === this.props.data.imdb_id
                        ? 'focused-card'
                        : ''
                }
            >
                <div
                    data-toggle="modal"
                    data-target={`#modal-${this.props.data.imdb_id}`}
                >
                    <div className="poster-overlay">
                        <PosterImg
                            className="card-img-top poster"
                            src={this.props.data.poster}
                            alt="Poster"
                        />
                        <div className="poster-overlay-text-wrapper">
                            <Icon
                                name="info"
                                className="poster-overlay-text"
                                size="huge"
                            />
                        </div>
                    </div>
                </div>
                <div className="card-body px-3 px-sm-4 py-2 py-sm-3">
                    <Ratings data={this.props.data} />
                    <h5 className="card-title block-ellipsis mt-3">
                        {this.props.data.title}
                    </h5>
                    <p className="card-text py-0 my-0">
                        <small className="text-muted added-on-info">
                            Added on:&nbsp;
                            <Moment format="Do MMM YYYY">
                                {this.props.data.createdAt}
                            </Moment>
                        </small>
                    </p>
                    <SwitchButton
                        as_toggle
                        data={this.props.data}
                        refresher={this.props.refresher}
                    />
                </div>
            </div>
        );
    }
}

export default CardFront;
