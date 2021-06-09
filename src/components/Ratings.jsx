import React, { Component } from 'react';
import $ from 'jquery';

import icon_imdb from '../images/icon-imdb.png';
import icon_rt from '../images/icon-rt.png';

class Ratings extends Component {
    componentDidMount() {
        $('[data-toggle="tooltip"]').tooltip();
    }

    render() {
        return (
            <div className="row">
                <div className="col-6 rating-container">
                    {this.props.data.imdb_id && (
                        <a
                            href={`https://www.imdb.com/title/${this.props.data.imdb_id}/`}
                            target="_blank"
                            className="btn btn-sm"
                            rel="noopener noreferrer"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="IMDb"
                        >
                            <img
                                src={icon_imdb}
                                alt="imdb icon"
                                className="rating-icon-img"
                            ></img>
                            <div className="rating pt-1">
                                {!this.props.data.rating_imdb &&
                                this.props.data.rating_imdb !== 0
                                    ? '-'
                                    : this.props.data.rating_imdb}
                            </div>
                        </a>
                    )}
                    {!this.props.data.imdb_id && (
                        <div
                            className="btn btn-sm btn-static"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="IMDb"
                        >
                            <img
                                src={icon_imdb}
                                alt="imdb icon"
                                className="rating-icon-img"
                            ></img>
                            <div className="rating pt-1">
                                {!this.props.data.rating_imdb &&
                                this.props.data.rating_imdb !== 0
                                    ? '-'
                                    : this.props.data.rating_imdb}
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-6 rating-container">
                    <div
                        className="btn btn-sm btn-static"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Rotten Tomatoes"
                    >
                        <img
                            src={icon_rt}
                            alt="rotten tomatoes icon"
                            className="rating-icon-img"
                        ></img>
                        <div className="rating pt-1">
                            {!this.props.data.rating_rt &&
                            this.props.data.rating_rt !== 0
                                ? '-'
                                : this.props.data.rating_rt}
                        </div>
                    </div>
                </div>
                {/* <div className="col-4 rating-container">
                    {this.props.data.filmweb_url && (
                        <a href={this.props.data.filmweb_url} target="_blank" className="btn btn-sm" data-toggle="tooltip" data-placement="top" title="Filmweb" rel="noopener noreferrer">
                            <img src={icon_fw} alt="filmweb icon" className="rating-icon-img"></img>
                            <div className="rating pt-1">{!this.props.data.rating_fw && this.props.data.rating_fw !== 0 ? '-' : this.props.data.rating_fw}</div>
                        </a>
                    )}
                    {!this.props.data.filmweb_url && (
                        <div className="btn btn-sm btn-static" data-toggle="tooltip" data-placement="top" title="Filmweb">
                            <img src={icon_fw} alt="filmweb icon" className="rating-icon-img"></img>
                            <div className="rating pt-1">{!this.props.data.rating_fw && this.props.data.rating_fw !== 0 ? '-' : this.props.data.rating_fw}</div>
                        </div>
                    )}
                </div> */}
            </div>
        );
    }
}

export default Ratings;
