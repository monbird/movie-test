import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

import { UpdateButton, DeleteButton, SwitchButton } from './ActionButtons';
import Ratings from './Ratings';
import PosterImg from './PosterImg';

class CardBack extends Component {
    render() {
        return (
            <div>
                <div className="modal fade" id={`modal-${this.props.data._id}`} tabIndex="1" role="dialog" aria-labelledby={`modalLabel-${this.props.data._id}`} aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title block-ellipsis pl-3" id={`modalLabel-${this.props.data._id}`}>{this.props.data.title}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div className="modal-body">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12 col-md-6 col-lg-4">
                                            <PosterImg className="poster-back" src={this.props.data.poster} alt="Poster" />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-8">
                                            <div className="row pt-4 pt-md-0">
                                                <div className="col-12 col-lg-6">
                                                    <p>
                                                        <span className="font-weight-bold">Year: </span>
                                                        <span className="font-weight-light">{this.props.data.year || '-'}</span>
                                                    </p>
                                                    <p>
                                                        <span className="font-weight-bold">Genre: </span>
                                                        <span className="font-weight-light">{this.props.data.genre || '-'}</span>
                                                    </p>
                                                    <p>
                                                        <span className="font-weight-bold">Country: </span>
                                                        <span className="font-weight-light">{this.props.data.country || '-'}</span>
                                                    </p>
                                                    <p>
                                                        <span className="font-weight-bold">Language: </span>
                                                        <span className="font-weight-light">{this.props.data.language || '-'}</span>
                                                    </p>
                                                    <p>
                                                        <span className="font-weight-bold">Runtime: </span>
                                                        <span className="font-weight-light">{this.props.data.runtime ? `${this.props.data.runtime} min` : '-'}</span>
                                                    </p>
                                                    <p>
                                                        <span className="font-weight-bold">Platform: </span>
                                                        <span className="font-weight-light">{this.props.data.platform || '-'}</span>
                                                    </p>
                                                </div>
                                                <div className="col-12 col-lg-6 pt-3 pt-lg-0">
                                                    <p>
                                                        <span className="font-weight-bold">Cast: </span>
                                                        <span className="font-weight-light">{this.props.data.cast || '-'}</span>
                                                    </p>
                                                    <p>
                                                        <span className="font-weight-bold">Director: </span>
                                                        <span className="font-weight-light">{this.props.data.director || '-'}</span>
                                                    </p>
                                                    <div className="d-none d-lg-block">
                                                        <span className="font-weight-bold">Ratings: </span>
                                                        <Ratings data={this.props.data}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row pt-3 d-none d-lg-block">
                                                <div className="col-12">
                                                    <p>
                                                        <span className="font-weight-bold">Plot: </span>
                                                        <span className="font-weight-light">{this.props.data.plot || '-'}</span>
                                                    </p>
                                                    <p>
                                                        <span className="font-weight-bold">My comments: </span>
                                                        <span className="font-weight-light">{this.props.data.comments || '-'}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row pt-0 d-block d-lg-none">
                                        <div className="col-6">
                                            <span className="font-weight-bold">Ratings: </span>
                                            <Ratings data={this.props.data}/>
                                        </div>
                                    </div>
                                    <div className="row pt-2 d-block d-lg-none">
                                        <div className="col-12">
                                            <p>
                                                <span className="font-weight-bold">Plot: </span>
                                                <span className="font-weight-light">{this.props.data.plot || '-'}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row py-3 d-block d-lg-none">
                                        <div className="col-12">
                                            <p>
                                                <span className="font-weight-bold">My comments: </span>
                                                <span className="font-weight-light">{this.props.data.comments || '-'}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="row w-100">
                                    <div className="col-12 col-md-4 col-lg-6 pb-3 pb-md-0 pr-md-2 pr-lg-3">
                                        <SwitchButton data={this.props.data} refresher={this.props.refresher} showText={true}/>
                                    </div>
                                    <div className="col-6 col-md-4 col-lg-3 px-md-3 px-lg-4">
                                        <UpdateButton data={this.props.data} refresher={this.props.refresher}/>
                                    </div>
                                    <div className="col-6 col-md-4 col-lg-3 pl-md-2 pl-lg-3">
                                        <button type="button" className="btn btn-danger w-100" data-toggle="modal" data-target={`#modal-confirm-${this.props.data._id}`}>
                                            <Icon name='trash' />&nbsp;Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" tabIndex="2" role="dialog" id={`modal-confirm-${this.props.data._id}`}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Are you sure?</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                    <p className="block-ellipsis">You are about to delete <b>{this.props.data.title}</b>.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <DeleteButton data={this.props.data} refresher={this.props.refresher}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CardBack;
