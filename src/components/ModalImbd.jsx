import React, { Component } from 'react';

import ModalImdbCard from './ModalImdbCard';
import apis from '../api';
import { transformOmdbFilm } from '../helpers';

class ModalImdb extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titles: [],
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            this.props.title &&
            this.props.modalShown &&
            !prevProps.modalShown
        ) {
            apis.getImdbTitles(this.props.title)
                .then((titles) => {
                    const transformedTitles = titles.data.Search.map((title) =>
                        transformOmdbFilm(title)
                    );
                    this.setState({
                        titles: transformedTitles,
                    });
                })
                .catch((error) => {
                    this.setState({
                        titles: [],
                    });
                });
        }
    }

    render() {
        const showTitles = this.state.titles.length > 0;
        return (
            <div
                className="modal fade"
                id="modalImdb"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="modalImdbLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-sm" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalImdbLabel">
                                Choose your {this.props.type}
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.props.title && showTitles && (
                                <p>
                                    Based on the information you provided we
                                    have found the following titles:
                                </p>
                            )}
                            {this.props.title &&
                                showTitles &&
                                this.state.titles.map((title, i) => (
                                    <ModalImdbCard
                                        data={title}
                                        key={`key-${i}`}
                                        overwriteWithApiDetails={
                                            this.props.overwriteWithApiDetails
                                        }
                                    />
                                ))}
                            {this.props.title && !showTitles && (
                                <p>
                                    No titles found! Please refine your search
                                    or provide info manually.
                                </p>
                            )}
                            {!this.props.title && (
                                <p>You must provide a title!</p>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalImdb;
