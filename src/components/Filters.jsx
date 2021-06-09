import React, { Component } from 'react';
import { Dropdown, Checkbox, Icon } from 'semantic-ui-react';

class Filters extends Component {
    FILTERS = ['genre', 'country', 'platform'];

    OPTIONS_SORT_BY = [
        {
            key: 'recently_added',
            text: 'Recently added',
            value: 'recently_added',
            icon: 'calendar alternate outline',
        },
        {
            key: 'alphabet',
            text: 'Alphabetically',
            value: 'alphabet',
            icon: 'sort alphabet down',
        },
        {
            key: 'year_newest',
            text: 'Year - newest',
            value: 'year_newest',
            icon: 'sort numeric descending',
        },
        {
            key: 'year_oldest',
            text: 'Year - oldest',
            value: 'year_oldest',
            icon: 'sort numeric ascending',
        },
        {
            key: 'rating_highest',
            text: 'Rating - highest',
            value: 'rating_highest',
            icon: 'sort amount down',
        },
        {
            key: 'rating_lowest',
            text: 'Rating - lowest',
            value: 'rating_lowest',
            icon: 'sort amount up',
        },
    ];

    constructor(props) {
        super(props);

        let initialState = {
            filterOptions: {},
            anyWatched: false,
            activeFilters: {
                hide_watched: false,
            },
            sortBy: 'recently_added',
        };

        this.FILTERS.forEach((filter) => {
            initialState.filterOptions[filter] = [];
            initialState.activeFilters[filter] = [];
        });

        this.state = initialState;

        this.sortByChange = this.sortByChange.bind(this);
        this.filterChange = this.filterChange.bind(this);
        this.resetFilters = this.resetFilters.bind(this);
        this.areFiltersEmpty = this.areFiltersEmpty.bind(this);
    }

    collectFilterOptions(filter) {
        let options = '';
        for (let i = 0; i < this.props.data.length; i++) {
            options += (this.props.data[i][filter] || '') + ', ';
        }
        options = options.toLowerCase().split(', ');
        let optionsUnique = [...new Set(options)].sort();

        let filterOptions = [];
        for (let i = 0; i < optionsUnique.length; i++) {
            if (!optionsUnique[i]) {
                continue;
            }
            let option =
                optionsUnique[i][0].toUpperCase() + optionsUnique[i].slice(1);
            filterOptions.push({
                key: option,
                text: option,
                value: option,
            });
        }
        return filterOptions;
    }

    componentDidUpdate(prevProps) {
        let filterOptions = {};

        for (let i = 0; i < this.FILTERS.length; i++) {
            filterOptions[this.FILTERS[i]] = this.collectFilterOptions(
                this.FILTERS[i]
            );
        }

        if (
            JSON.stringify(this.state.filterOptions) !==
            JSON.stringify(filterOptions)
        ) {
            this.setState({
                filterOptions: filterOptions,
            });
        }

        let anyWatched = false;
        for (let i = 0; i < this.props.data.length; i++) {
            if (this.props.data[i].is_watched) {
                anyWatched = true;
                break;
            }
        }

        if (this.state.anyWatched !== anyWatched) {
            this.setState({
                anyWatched: anyWatched,
            });
        }

        if (!prevProps.doResetFilters && this.props.doResetFilters) {
            this.resetFilters();
        }
    }

    sortByChange(event, data) {
        let currentSortBy = this.state.sortBy;
        let newSortBy = data.value;

        if (currentSortBy !== newSortBy) {
            this.setState({
                sortBy: newSortBy,
            });
            this.props.refresher('sort', { sortBy: newSortBy });
        }
    }

    filterChange(event, data) {
        let filter = data.id.split('filter-')[1];
        let currentActiveFilters = this.state.activeFilters;

        currentActiveFilters[filter] = data.toggle ? data.checked : data.value;
        this.setState({
            activeFilters: currentActiveFilters,
        });

        this.props.refresher('filter', currentActiveFilters);
    }

    resetFilters() {
        let emptyFilters = {
            hide_watched: false,
        };

        this.FILTERS.forEach((filter) => {
            emptyFilters[filter] = [];
        });

        this.setState({
            activeFilters: emptyFilters,
            sortBy: 'recently_added',
        });

        this.props.refresher('filter', emptyFilters, true);
    }

    areFiltersEmpty() {
        let self = this;
        let activeFiltersEmpty = Object.keys(this.state.activeFilters).every(
            function (filter) {
                if (filter === 'hide_watched') {
                    return !self.state.activeFilters[filter];
                } else {
                    return self.state.activeFilters[filter].length < 1;
                }
            }
        );
        let searchPhraseEmpty = this.props.searchPhrase.length < 1;
        let sortByEmpty = this.state.sortBy === 'recently_added';
        return sortByEmpty && searchPhraseEmpty && activeFiltersEmpty;
    }

    render() {
        let filtersAreEmpty = this.areFiltersEmpty();

        return (
            <div className="col-12 py-2">
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-4 px-0 px-sm-3 px-md-0 pr-md-3">
                        <div className="form-group">
                            <Dropdown
                                id="filter-genre"
                                placeholder="Genre"
                                fluid
                                multiple
                                selection
                                clearable={true}
                                options={this.state.filterOptions.genre}
                                disabled={
                                    this.state.filterOptions.genre.length <= 0
                                }
                                onChange={this.filterChange}
                                value={this.state.activeFilters.genre}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 px-0 px-sm-3 px-md-0 pl-md-3 pr-lg-3">
                        <div className="form-group">
                            <Dropdown
                                id="filter-country"
                                placeholder="Country"
                                fluid
                                multiple
                                selection
                                clearable={true}
                                options={this.state.filterOptions.country}
                                disabled={
                                    this.state.filterOptions.country.length <= 0
                                }
                                onChange={this.filterChange}
                                value={this.state.activeFilters.country}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 px-0 px-sm-3 px-md-0 pr-md-3 pl-lg-3 pr-lg-0">
                        <div className="form-group">
                            <Dropdown
                                id="filter-platform"
                                placeholder="Platform"
                                fluid
                                multiple
                                selection
                                clearable={true}
                                options={this.state.filterOptions.platform}
                                disabled={
                                    this.state.filterOptions.platform.length <=
                                    0
                                }
                                onChange={this.filterChange}
                                value={this.state.activeFilters.platform}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 px-0 px-sm-3 pr-md-0 pl-lg-0 pr-lg-3">
                        <div className="form-group">
                            <Dropdown
                                placeholder="Sort by"
                                fluid
                                selection
                                options={this.OPTIONS_SORT_BY}
                                disabled={this.props.data.length <= 0}
                                value={this.state.sortBy}
                                onChange={this.sortByChange}
                            />
                        </div>
                    </div>
                    <div className="col-7 col-sm-6 col-lg-4 pl-1 pl-sm-3 pl-md-0 pl-lg-3 mb-2 mb-lg-0 valign-parent">
                        <div className="form-group valign">
                            <Checkbox
                                id="filter-hide_watched"
                                toggle
                                label="Hide watched"
                                className="semantic-toggle"
                                disabled={!this.state.anyWatched}
                                onChange={this.filterChange}
                                checked={this.state.activeFilters.hide_watched}
                            />
                        </div>
                    </div>
                    <div className="col-5 col-sm-6 col-lg-4 pr-0 pr-sm-3 pr-md-0 mb-2 mb-lg-0">
                        <div className="float-right valign-parent">
                            <div className="form-group valign">
                                {!filtersAreEmpty && (
                                    <button
                                        type="button"
                                        className="buttonAsLink"
                                        href="#"
                                        id="clearFilters"
                                        onClick={this.props.resetFilters}
                                    >
                                        <Icon name="remove" />
                                        &nbsp;Clear filters
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Filters;
