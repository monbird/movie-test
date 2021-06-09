import React, { Component } from 'react';
import { Input, Icon, Button } from 'semantic-ui-react';

import { AddNewButton, PickRandomButton } from './ActionButtons';
import Filters from './Filters';

class CardListControllers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchPhrase: '',
            areFiltersOpen: false,
            doResetFilters: false,
        };

        this.searchChange = this.searchChange.bind(this);
        this.openFilters = this.openFilters.bind(this);
        this.closeFilters = this.closeFilters.bind(this);
    }

    // componentDidMount() {
    //     let self = this;
    //     $(document).click(function(e) {
    //         let closest_nav = $(e.target).closest('nav');
    //         if (!closest_nav.length) {
    //             $('nav').find('.collapse').collapse('hide');
    //             self.closeFilters();
    //         }
    //     });
    // }

    componentDidUpdate() {
        if (this.state.doResetFilters !== this.props.doResetFilters) {
            this.setState({
                doResetFilters: this.props.doResetFilters,
            });
            if (this.props.doResetFilters) {
                this.setState({
                    searchPhrase: '',
                });
            }
        }
    }

    openFilters() {
        this.setState({
            areFiltersOpen: true,
        });
    }

    closeFilters() {
        this.setState({
            areFiltersOpen: false,
        });
    }

    searchChange(event, data) {
        let currentPhrase = this.state.searchPhrase;
        let newPhrase = data.value;

        if (currentPhrase !== newPhrase) {
            this.setState({
                searchPhrase: newPhrase,
                doResetFilters: true,
            });

            if (!newPhrase.length || (newPhrase && newPhrase.length > 2)) {
                this.props.refresher('search', { phrase: newPhrase });
            }
        }
    }

    render() {
        let type_plural =
            this.props.type === 'movie' ? 'movies' : this.props.type;
        let type_upper =
            type_plural.charAt(0).toUpperCase() + type_plural.slice(1);

        return (
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-light filters-container pt-4 pb-0">
                <div className="container flex-column">
                    <div className="row w-100 mb-2 mb-md-4">
                        <div className="col-8 col-sm-6 col-md-3 pl-0 pl-sm-3 pl-md-0">
                            <div className="row">
                                <div className="col-6 pr-2">
                                    <AddNewButton type={this.props.type} />
                                </div>
                                <div className="col-6 pl-2">
                                    <PickRandomButton
                                        data={this.props.piecesVisible}
                                        highlightMovie={
                                            this.props.highlightMovie
                                        }
                                        disabled={
                                            this.props.piecesVisible.length <= 0
                                        }
                                        highlightedMovieId={
                                            this.props.highlightedMovieId
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-4 col-sm-6 col-md-3 order-md-3 pr-0 pr-sm-3 pr-md-0 pl-0 pl-sm-3">
                            {!this.state.areFiltersOpen && (
                                <Button
                                    id="filter-toggler"
                                    className="semantic-btn float-right w-100 mr-0"
                                    data-toggle="collapse"
                                    data-target="#filters"
                                    disabled={this.props.piecesAll.length <= 0}
                                    onClick={this.openFilters}
                                >
                                    &nbsp;&nbsp;
                                    <Icon
                                        name="angle double down"
                                        className=""
                                    />
                                    FILTER &amp; SORT{' '}
                                    <Icon
                                        name="angle double down"
                                        className=""
                                    />
                                </Button>
                            )}
                            {this.state.areFiltersOpen && (
                                <Button
                                    id="filter-toggler"
                                    className="semantic-btn float-right w-100 mr-0"
                                    data-toggle="collapse"
                                    data-target="#filters"
                                    disabled={this.props.piecesAll.length <= 0}
                                    onClick={this.closeFilters}
                                >
                                    &nbsp;&nbsp;
                                    <Icon name="angle double up" className="" />
                                    FILTER &amp; SORT{' '}
                                    <Icon name="angle double up" className="" />
                                </Button>
                            )}
                        </div>
                        <div className="col-12 col-md-6 order-md-2 py-3 py-md-0 px-0 px-sm-3">
                            <Input
                                fluid
                                icon="search"
                                iconPosition="left"
                                placeholder={`Search in ${type_upper}`}
                                disabled={this.props.piecesAll.length <= 0}
                                onChange={this.searchChange}
                                value={this.state.searchPhrase}
                            />
                        </div>
                    </div>
                    <div id="filters" className="collapse row w-100">
                        <Filters
                            data={this.props.piecesAll}
                            refresher={this.props.refresher}
                            doResetFilters={this.state.doResetFilters}
                            resetFilters={this.props.resetFilters}
                            searchPhrase={this.state.searchPhrase}
                        />
                    </div>
                </div>
            </nav>
        );
    }
}

export default CardListControllers;
