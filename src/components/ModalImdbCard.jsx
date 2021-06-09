import React, { Component } from 'react';
import $ from 'jquery';
import { toast } from 'react-toastify';

import PosterImg from './PosterImg';
import apis from '../api';
import { transformOmdbFilm } from '../helpers';

class ModalImdbCard extends Component {
    constructor(props) {
        super(props);

        this.fetchTitleDetails = this.fetchTitleDetails.bind(this);
    }

    fetchTitleDetails() {
        apis.getImdbTitleDetails(this.props.data.imdbid)
            .then((response) => {
                const film = transformOmdbFilm(response.data.data);
                this.props.overwriteWithApiDetails(film, 'imdb');
                $('#modalImdb').modal('hide');
            })
            .catch((error) => {
                let msg =
                    '👎 There was a problem with picking this title! Please try again later.';
                toast.error(msg);
            });
    }

    render() {
        return (
            <div className="card modal-imdb mb-5">
                <PosterImg
                    className="card-img-top"
                    src={this.props.data.poster}
                    alt="Poster"
                />
                <div className="card-body">
                    <h4>{this.props.data.title}</h4>
                    <p className="card-text">{this.props.data.year}</p>
                    <button
                        type="button"
                        className="btn btn-primary btn-block"
                        onClick={this.fetchTitleDetails}
                    >
                        Pick this
                    </button>
                </div>
            </div>
        );
    }
}

export default ModalImdbCard;
