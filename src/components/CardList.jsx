import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import Card from './Card';
import CardListControllers from './CardListControllers';

class CardList extends Component {
    REFRESHER_ALLOWED_ACTIONS = [
        'delete',
        'update',
        'filter',
        'search',
        'sort',
    ];

    SEARCH_KEYS = [
        'title',
        'year',
        'genre',
        'country',
        'language',
        'director',
        'cast',
        'platform',
        'plot',
        'comments',
    ];

    SORT_FUNCS = {
        recently_added: (pieces) => {
            return pieces.sort((p1, p2) => {
                if (p1.createdAt < p2.createdAt) {
                    return 1;
                }
                if (p1.createdAt > p2.createdAt) {
                    return -1;
                }
                return 0;
            });
        },
        alphabet: (pieces) => {
            return pieces.sort((p1, p2) => {
                if (p1.title.toLowerCase() < p2.title.toLowerCase()) {
                    return -1;
                }
                if (p1.title.toLowerCase() > p2.title.toLowerCase()) {
                    return 1;
                }
                return 0;
            });
        },
        year_newest: (pieces) => {
            return pieces.sort((p1, p2) => {
                return p2.year - p1.year;
            });
        },
        year_oldest: (pieces) => {
            return pieces.sort((p1, p2) => {
                return (p1.year || 99999) - (p2.year || 99999);
            });
        },
        rating_highest: (pieces) => {
            return pieces.sort((p1, p2) => {
                return p2.rating_imdb - p1.rating_imdb;
            });
        },
        rating_lowest: (pieces) => {
            return pieces.sort((p1, p2) => {
                return (p1.rating_imdb || 9999) - (p2.rating_imdb || 9999);
            });
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            piecesAll: [],
            piecesVisible: [],
            highlightedMovieId: null,
            doResetFilters: false,
            activeFilters: {},
            searchPhrase: '',
            sortBy: 'recently_added',
        };

        if (this.props.type) {
            this.state.type_plural =
                this.props.type === 'movie' ? 'movies' : this.props.type;
        }

        this.highlightMovie = this.highlightMovie.bind(this);
        this.refresher = this.refresher.bind(this);
        this.resetFilters = this.resetFilters.bind(this);
        this.searchThrough = this.searchThrough.bind(this);
        this.sortPieces = this.sortPieces.bind(this);
    }

    componentDidMount = async () => {
        let pieces = [];
        if (this.props.type === 'movie') {
            pieces = this.props.piecesList.filter(
                (piece) => piece.type === 'movie'
            );
        } else if (this.props.type === 'series') {
            pieces = this.props.piecesList.filter(
                (piece) => piece.type === 'series'
            );
        }

        this.setState({
            piecesAll: pieces,
            piecesVisible: pieces,
        });
    };

    refresher(action, data, resetFiltersDone) {
        if (this.REFRESHER_ALLOWED_ACTIONS.indexOf(action) < 0) {
            console.error('Unrecognized action!');
            return;
        }

        let stateUpdate = {};

        if (action === 'update' || action === 'delete') {
            stateUpdate.piecesAll = this.updateOrDelete(data, action);
        }

        if (action === 'filter') {
            this.highlightMovie(null);
            stateUpdate.activeFilters = data;

            if (resetFiltersDone) {
                stateUpdate.doResetFilters = false;
            }
        } else if (action === 'search') {
            stateUpdate.searchPhrase = data.phrase;
        } else if (action === 'sort') {
            this.highlightMovie(null);
            stateUpdate.sortBy = data.sortBy;
        }

        let activeFilters =
            stateUpdate.activeFilters || this.state.activeFilters;
        let searchPhrase = this.state.searchPhrase;
        let piecesAll = stateUpdate.piecesAll || this.state.piecesAll;

        let piecesVisible = this.filterAndSearch(
            piecesAll,
            activeFilters,
            searchPhrase
        );

        let sortBy = stateUpdate.sortBy || this.state.sortBy;
        stateUpdate.piecesVisible = this.sortPieces(piecesVisible, sortBy);

        if (Object.keys(stateUpdate).length > 0) {
            this.setState(stateUpdate);
        }
    }

    updateOrDelete(data, action) {
        let newPieces = [];
        for (let i = 0; i < this.state.piecesAll.length; i++) {
            let newPiece = null;
            if (this.state.piecesAll[i].imdb_id === data.imdb_id) {
                if (action === 'update') {
                    newPiece = data;
                } else if (action === 'delete') {
                    continue;
                }
            } else {
                newPiece = this.state.piecesAll[i];
            }
            newPieces.push(newPiece);
        }
        return newPieces;
    }

    filterAndSearch(piecesAll, activeFilters, searchPhrase) {
        let filteredPieces = [];

        for (let i = 0; i < piecesAll.length; i++) {
            let include = true;
            let thisPiece = piecesAll[i];

            if (searchPhrase) {
                include = this.searchThrough(thisPiece, searchPhrase);
            }

            Object.keys(activeFilters).forEach((filter) => {
                if (include) {
                    let filterVal = activeFilters[filter];
                    if (filter === 'hide_watched') {
                        include = !thisPiece.is_watched || !filterVal;
                    } else if (filterVal.length > 0) {
                        include = filterVal.every(function (filterEntry) {
                            return (
                                thisPiece[filter]
                                    .toLowerCase()
                                    .indexOf(filterEntry.toLowerCase()) >= 0
                            );
                        });
                    }
                }
            });

            if (include) {
                filteredPieces.push(thisPiece);
            }
        }
        return filteredPieces;
    }

    sortPieces(pieces, sortBy) {
        return this.SORT_FUNCS[sortBy](pieces);
    }

    searchThrough(piece, phrase) {
        let words = phrase
            .toLowerCase()
            .split(' ')
            .filter(function (word) {
                return word.length > 2;
            });
        let self = this;

        return words.every(function (word) {
            return self.SEARCH_KEYS.some(function (searchKey) {
                return (
                    (piece[searchKey] || '')
                        .toString()
                        .toLowerCase()
                        .indexOf(word) >= 0
                );
            });
        });
    }

    highlightMovie(movieId) {
        if (this.state.highlightedMovieId !== movieId) {
            this.setState({
                highlightedMovieId: movieId,
            });
        }
    }

    componentDidUpdate() {
        function scrollTo(element, yOffset = -130) {
            const y =
                element.getBoundingClientRect().top +
                window.pageYOffset +
                yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }

        const element = document.getElementById('focused-card');
        if (element) {
            scrollTo(element);
        }
    }

    resetFilters() {
        this.setState({
            doResetFilters: true,
            searchPhrase: '',
            sortBy: 'recently_added',
        });
    }

    render() {
        const showCards = this.state.piecesVisible.length > 0;
        const anyCard = this.state.piecesAll.length > 0;

        return (
            <div>
                <CardListControllers
                    piecesAll={this.state.piecesAll}
                    piecesVisible={this.state.piecesVisible}
                    type={this.props.type}
                    highlightMovie={this.highlightMovie}
                    refresher={this.refresher}
                    doResetFilters={this.state.doResetFilters}
                    highlightedMovieId={this.state.highlightedMovieId}
                    resetFilters={this.resetFilters}
                />
                <div className="container cardList-container px-4 px-sm-3">
                    <div className="row">
                        {showCards &&
                            this.state.piecesVisible.map((piece, i) => {
                                return (
                                    <Card
                                        data={piece}
                                        key={`key-${piece.imdb_id}-${i}`}
                                        highlightedMovieId={
                                            this.state.highlightedMovieId
                                        }
                                        refresher={this.refresher}
                                    />
                                );
                            })}
                        {anyCard && !showCards && (
                            <p className="col-12">
                                None of your {this.state.type_plural} meet the
                                selected criteria{' '}
                                <Icon name="angle double right" />
                                <button
                                    type="button"
                                    onClick={this.resetFilters}
                                    className="no-cards buttonAsLink"
                                >
                                    Reset your filters{' '}
                                </button>
                                <Icon name="angle double left" />
                            </p>
                        )}
                        {!anyCard && (
                            <p className="col-12">
                                You don't have any {this.state.type_plural}{' '}
                                saved yet <Icon name="angle double right" />
                                <Link
                                    to={`/${this.props.type}/create`}
                                    className="no-cards"
                                >
                                    Add a new title{' '}
                                </Link>
                                <Icon name="angle double left" />
                            </p>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    piecesList: state.pieces.piecesList,
});

export default connect(mapStateToProps, {})(CardList);
