import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import $ from 'jquery';
import { Icon } from 'semantic-ui-react';
import { toast } from 'react-toastify';

import icon_imdb from '../images/icon-imdb.png';
import icon_rt from '../images/icon-rt.png';
import ModalImdb from './ModalImbd';
import { SwitchButton } from './ActionButtons';
import apis from '../api';

class CardForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type_plural: this.props.type  === 'movie' ? 'movies' : this.props.type,
            doRedirect: false,
            refreshModal: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSwitchBtn = this.handleSwitchBtn.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.overwriteWithApiDetails = this.overwriteWithApiDetails.bind(this);
        this.preventEnter = this.preventEnter.bind(this);
    }

    componentDidMount() {
        if (this.props.id) {
            apis.getMovieOrSeriesById(this.props.id)
                .then((response) => {
                    this.setState({...response.data.data});
                })
                .catch((error) => {
                    this.setState({
                        doRedirect: true,
                    });
                    let msg = '👎 We couldn\'t find the ' + this.props.type + ' you are after!';
                    toast.error(msg);
                });
        } else {
            this.setState({
                title: '',
                year: '',
                genre: '',
                country: '',
                language: '',
                director: '',
                cast: '',
                runtime: '',
                platform: '',
                plot: '',
                rating_imdb: '',
                rating_rt: '',
                comments: '',
                is_watched: false
            });
        }

        $('[data-toggle="tooltip"]').tooltip();
    }

    openImdbModal = () => {
        this.setState({'refreshModal': true});
        $('#modalImdb').modal('show').on('shown.bs.modal', () => {
            this.setState({'refreshModal': false});
        });
    }

    handleChange = async (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        await this.setState({[nam]: val});
    }

    handleSwitchBtn = async (checked) => {
        await this.setState({'is_watched': checked});
    }

    preventEnter = (event) => {
        if(event.keyCode === 13 && event.target.tagName !== 'TEXTAREA') {
            event.preventDefault();
            return false;
        }
    }

    handleSubmit = async (event) => {

        event.preventDefault();
        event.stopPropagation();

        let form = $('#card-form')[0];
        form.classList.add('was-validated');

        if (form.checkValidity() === false) {       
            return;
        }

        let payload = {
            title: this.state.title,
            year: this.state.year,
            genre: this.state.genre,
            country: this.state.country,
            language: this.state.language,
            director: this.state.director,
            cast: this.state.cast,
            runtime: this.state.runtime,
            platform: this.state.platform,
            plot: this.state.plot,
            rating_imdb: this.state.rating_imdb,
            rating_rt: this.state.rating_rt,
            comments: this.state.comments,
            type: this.props.type,
            is_watched: this.state.is_watched,
            imdb_id: this.state.imdb_id,
            poster: this.state.poster
        }

        if (this.props.id) {
            apis.updateMovieOrSeries(this.props.id, payload)
                .then(() => {
                    this.setState({
                        doRedirect: true,
                    });
    
                    let typeTitle = payload.type.charAt(0).toUpperCase() + payload.type.slice(1);
                    let shortenedTitle = payload.title;
                    if (shortenedTitle.length > 35) {
                        shortenedTitle = shortenedTitle.slice(0, 35) + "...";
                    }

                    let msg = '👍 ' + typeTitle + ' "' + shortenedTitle + '" updated!';
                    toast.dark(msg);
                })
                .catch((error) => {
                    let msg = null;
                    if(error.response && error.response.data) {
                        let reason = error.response.data.message || error.response.data;
                        msg = '👎 Could not update ' + payload.type + ": " + reason;
                    } else {
                        let typeTitle = payload.type.charAt(0).toUpperCase() + payload.type.slice(1);
                        msg = '👎 ' + typeTitle + ' not updated!';
                    }
                    toast.error(msg);
                });
        } else {
            await apis.createMovieOrSeries(payload)
            .then(() => {
                this.setState({
                    doRedirect: true,
                });

                let typeTitle = payload.type.charAt(0).toUpperCase() + payload.type.slice(1);
                let shortenedTitle = payload.title;
                if (shortenedTitle.length > 35) {
                    shortenedTitle = shortenedTitle.slice(0, 35) + "...";
                }

                let msg = '👍 ' + typeTitle + ' "' + shortenedTitle + '" created!';
                toast.dark(msg);
            })
            .catch(error => {
                let msg = null;
                if(error.response && error.response.data) {
                    let reason = error.response.data.message || error.response.data;
                    msg = '👎 Could not add ' + payload.type + ": " + reason;
                } else {
                    let typeTitle = payload.type.charAt(0).toUpperCase() + payload.type.slice(1);
                    msg = '👎 ' + typeTitle + ' not created!';
                }
                toast.error(msg);
            });
        }
    }

    processYearData = (str) => {
        if (!str) {
            return '';
        }

        let year = str.substr(0, 4);

        if(year) {
            try {
                return parseInt(year);
            } catch {
                return '';
            }
        } else {
            return '';
        }
    }

    processArrayData = (obj) => {
        if (obj) {
            let arr = [];
            for (let i = 0; i < Object.keys(obj).length; i++) {
                arr.push(obj[i]);
            }
            return arr.join(", ");
        } else {
            return "";
        }
    }

    processTimeData = (str) => {
        if(!str) {
            return '';
        }

        let time = str.substr(0, str.indexOf('min')).trim().replace(',', '');

        if(time) {
            try {
                return parseInt(time);
            } catch {
                return '';
            }
        } else {
            return '';
        }
    }

    processRatingData = (obj, source) => {
        if (!obj || !source) {
            return '';
        }

        let value = '';
        if(source === 'fw') {
            value = obj.toFixed(1);
        } else {
            let splitter = null;

            if(source === 'imdb') {
                source = "Internet Movie Database";
                splitter = '/';
            } else if(source === 'rt') {
                source = "Rotten Tomatoes";
                splitter = '%';
            }

            for (let i = 0; i < Object.keys(obj).length; i++) {
                if (obj[i].source === source) {
                    value = obj[i].value;
                    if(splitter) {
                        value = value.substr(0, value.indexOf(splitter));
                    }
                    break;
                }
            }
        }

        if(value) {
            try {
                return parseFloat(value);
            } catch {
                return '';
            }
        } else {
            return '';
        }
    }

    overwriteWithApiDetails = (data, source) => {
        if(source === 'imdb') {
            this.setState({
                title: data.title,
                year: this.processYearData(data.year),
                genre: this.processArrayData(data.genre),
                country: data.country,
                language: data.language,
                director: this.processArrayData(data.director),
                cast: this.processArrayData(data.actors),
                runtime: this.processTimeData(data.runtime),
                plot: data.plot,
                rating_imdb: this.processRatingData(data.ratings, 'imdb'),
                rating_rt: this.processRatingData(data.ratings, 'rt'),
                poster: data.poster,
                imdb_id: data.imdbid
            });
        }
    }

    render() {
        if(this.state.doRedirect) {
            return (
                <Redirect to={{
                    pathname: '/' + this.state.type_plural
                }} /> 
            )
        } else {
            return (
                <div className="container pageForm-container">
                    {!this.props.id && <h2>Create new {this.props.type}</h2>}
                    {this.props.id && <h2>Update {this.props.type}</h2>}
                    <div className="pb-2">
                        Complete the form yourself or&nbsp;
                        <button type="button" className="btn btn-info btn-sm" onClick={this.openImdbModal}>
                            <Icon name='angle double down' /> fetch data from <b>IMDb </b>
                            <Icon name='angle double down' />
                        </button>
                        <ModalImdb title={this.state.title} year={this.state.year} type={this.props.type} refreshMe={this.state.refreshModal} overwriteWithApiDetails={this.overwriteWithApiDetails}/>
                    </div>
                    <form onSubmit={this.handleSubmit} className="needs-validation bg-secondary px-4 py-4" id="card-form" noValidate onKeyDown={this.preventEnter}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text justify-content-end">*Title:</span>
                                        </div>
                                        <input type="text" className="form-control cardForm-elements rounded-right" id="title" placeholder="enter title.." name="title" onChange={this.handleChange} value={this.state.title || ''} autoFocus required minLength="2"/>
                                        <div className="invalid-feedback">
                                            Please provide a valid input (minimum 2 characters long).
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text justify-content-end">Year:</span>
                                        </div>
                                        <input type="number" className="form-control cardForm-elements rounded-right" id="year" placeholder="enter year.." name="year" min="1800" max="2500" onChange={this.handleChange} value={this.state.year || ''}/>
                                        <div className="invalid-feedback">
                                            Please provide a valid input (YYYY).
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text justify-content-end">Genre:</span>
                                        </div>
                                        <input type="text" className="form-control cardForm-elements" id="genre" placeholder="enter genre.." name="genre" onChange={this.handleChange} value={this.state.genre || ''}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text justify-content-end">Country:</span>
                                        </div>
                                        <input type="text" className="form-control cardForm-elements" id="country" placeholder="enter country.." name="country" onChange={this.handleChange} value={this.state.country || ''}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text justify-content-end">Language:</span>
                                        </div>
                                        <input type="text" className="form-control cardForm-elements" id="language" placeholder="enter language.." name="language" onChange={this.handleChange} value={this.state.language || ''}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text justify-content-end">Director:</span>
                                        </div>
                                        <input type="text" className="form-control cardForm-elements" id="director" placeholder="enter director.." name="director" onChange={this.handleChange} value={this.state.director || ''}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text justify-content-end">Cast:</span>
                                        </div>
                                        <input type="text" className="form-control cardForm-elements" id="cast" placeholder="enter cast.." name="cast" onChange={this.handleChange} value={this.state.cast || ''}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text justify-content-end">Runtime:</span>
                                        </div>
                                        <input type="text" min="1" className="form-control cardForm-elements bottom-border-fix" id="runtime" placeholder="enter runtime.." name="runtime" onChange={this.handleChange} value={this.state.runtime || ''} aria-label="Time in minutes"/>
                                        <div className="input-group-append">
                                            <span className="input-group-text rounded-right">min</span>
                                        </div>
                                        <div className="invalid-feedback">
                                            Please provide a valid input (numbers only).
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text justify-content-end">Platform:</span>
                                        </div>
                                        <input type="text" className="form-control cardForm-elements" id="platform" placeholder="enter platform.." name="platform" onChange={this.handleChange} value={this.state.platform || ''}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text justify-content-end">Plot:</span>
                                        </div>
                                        <textarea className="form-control cardForm-elements" id="plot" placeholder="enter plot.." name="plot" onChange={this.handleChange} value={this.state.plot || ''} rows="5"></textarea>
                                    </div>
                                </div>
                                <div className="form-group pt-2 pt-md-3">
                                    <p>Ratings:</p>
                                    <div className="row">
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <div className="input-group-prepend prepend-original" data-toggle="tooltip" data-placement="bottom" title="IMDb">
                                                        <span className="input-group-text justify-content-center">
                                                            <img src={icon_imdb} alt="imdb icon" className="rating-icon-form"></img>
                                                        </span>
                                                    </div>
                                                    <input type="number" className="form-control cardForm-elements rounded-right" id="title" placeholder="rating.." name="rating_imdb" min="0" max="10" step="0.1" onChange={this.handleChange} value={this.state.rating_imdb || ''}/>
                                                    <div className="invalid-feedback">
                                                        Please provide a valid input (0-10).
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <div className="input-group-prepend prepend-original" data-toggle="tooltip" data-placement="top" title="Rotten Tomatoes">
                                                        <span className="input-group-text justify-content-center">
                                                            <img src={icon_rt} alt="imdb icon" className="rating-icon-form"></img>
                                                        </span>
                                                    </div>
                                                    <input type="number" className="form-control cardForm-elements rounded-right" id="title" placeholder="rating.." name="rating_rt" min="0" max="100" step="1" onChange={this.handleChange} value={this.state.rating_rt || ''}/>
                                                    <div className="invalid-feedback">
                                                        Please provide a valid input (0-100).
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="col-12 col-lg-4">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <div className="input-group-prepend prepend-original" data-toggle="tooltip" data-placement="top" title="Filmweb">
                                                        <span className="input-group-text justify-content-center">
                                                            <img src={icon_fw} alt="imdb icon" className="rating-icon-form"></img>
                                                        </span>
                                                    </div>
                                                    <input type="number" className="form-control cardForm-elements rounded-right" id="title" placeholder="rating.." name="rating_fw" min="0" max="10" step="0.1" onChange={this.handleChange} value={this.state.rating_fw || ''}/>
                                                    <div className="invalid-feedback">
                                                        Please provide a valid input (0-10).
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text justify-content-end">Comments:</span>
                                        </div>
                                        <textarea className="form-control cardForm-elements" id="comments" placeholder="enter comments.." name="comments" onChange={this.handleChange} value={this.state.comments || ''} rows="4"></textarea>
                                    </div>
                                </div>
                                <div className="form-group pt-2 pt-md-3">
                                    <p>Status:</p>
                                    <div className="input-group">
                                        <SwitchButton showText={true} onChange={this.handleSwitchBtn} data={this.state} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row pt-3">
                            <div className="col-6 col-md-3 offset-md-6">
                                <Link to={`/${this.state.type_plural}`} className="btn btn-danger w-100 cardForm-elements padding-fix">Cancel</Link>
                            </div>
                            <div className="col-6 col-md-3">
                                <button type="submit" className="btn btn-info w-100 cardForm-elements">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            );
        }
    }
}

export default CardForm;
