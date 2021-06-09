import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import $ from 'jquery';
import { toast } from 'react-toastify';
import { Button, Icon } from 'semantic-ui-react';

import apis from '../api';

class AddNewButton extends Component {
    render() {
        return (
            <Button
                as={Link}
                to={`/${this.props.type}/create`}
                animated="vertical"
                className="semantic-btn add-new-btn w-100 mr-0"
            >
                <Button.Content visible>
                    <Icon name="add" />
                </Button.Content>
                <Button.Content hidden>ADD NEW</Button.Content>
            </Button>
        );
    }
}

class PickRandomButton extends Component {
    pickRandomAction = () => {
        let titles = this.props.data;
        let unpickedTitles = null;

        if (this.props.highlightedMovieId) {
            unpickedTitles = titles.filter((title) => {
                return title._id !== this.props.highlightedMovieId;
            });

            if (unpickedTitles.length < 1) {
                unpickedTitles = titles;
            }
        } else {
            unpickedTitles = titles;
        }

        let randomNo = Math.floor(Math.random() * unpickedTitles.length);
        let randomTitle = unpickedTitles[randomNo];
        this.props.highlightMovie(randomTitle._id);
    };

    render() {
        return (
            <Button
                onClick={this.pickRandomAction}
                animated="vertical"
                className="semantic-btn pick-random-btn w-100 mr-0"
                disabled={this.props.disabled}
            >
                <Button.Content visible>
                    <Icon name="question" />
                </Button.Content>
                <Button.Content hidden>PICK RANDOM</Button.Content>
            </Button>
        );
    }
}

class UpdateButton extends Component {
    closeAllModals = () => {
        $('.modal').modal('hide');
    };

    render() {
        return (
            <Link
                to={`/${this.props.data.type}/edit/${this.props.data._id}`}
                className="btn btn-info w-100"
                onClick={this.closeAllModals}
            >
                <Icon name="pencil" />
                &nbsp;Edit
            </Link>
        );
    }
}

class DeleteButton extends Component {
    deleteAction = () => {
        $('.modal').modal('hide');
        this.props.refresher('delete', { _id: this.props.data._id });

        let typeTitle =
            this.props.data.type.charAt(0).toUpperCase() +
            this.props.data.type.slice(1);
        let shortenedTitle = this.props.data.title;
        if (shortenedTitle.length > 35) {
            shortenedTitle = shortenedTitle.slice(0, 35) + '...';
        }

        let msg = '👍 ' + typeTitle + ' "' + shortenedTitle + '" deleted!';
        toast.dark(msg);
    };

    render() {
        return (
            <div>
                <button className="btn btn-danger" onClick={this.deleteAction}>
                    Delete
                </button>
            </div>
        );
    }
}

class SwitchButton extends Component {
    constructor(props) {
        super(props);

        if (!('onChange' in this.props)) {
            this.onChange = (checked) => {
                let movie = this.props.data;
                if (movie) {
                    if (this.props.as_toggle) {
                        movie.is_watched = !movie.is_watched;
                    } else {
                        movie.is_watched = checked;
                    }
                    this.props.refresher('update', movie);
                }
            };
        } else {
            this.onChange = this.props.onChange;
        }
    }

    render() {
        if (this.props.as_toggle) {
            return (
                <Button
                    toggle
                    size="small"
                    onClick={this.onChange}
                    active={this.props.data && this.props.data.is_watched}
                    className="card-front-toggler"
                >
                    {this.props.data && this.props.data.is_watched && (
                        <Icon name="eye" className="mr-0" />
                    )}
                    {!(this.props.data && this.props.data.is_watched) && (
                        <Icon name="eye slash" className="mr-0" />
                    )}
                </Button>
            );
        } else {
            let showText = this.props.showText;
            return (
                <BootstrapSwitchButton
                    checked={this.props.data && this.props.data.is_watched}
                    onlabel={[
                        showText && <Icon name="eye" key="fa1" />,
                        '\u00A0Watched',
                    ]}
                    offlabel={[
                        showText && <Icon name="eye slash" key="fa2" />,
                        '\u00A0Unwatched',
                    ]}
                    onChange={this.onChange}
                    height={this.props.height}
                    onstyle="warning"
                    offstyle="success"
                />
            );
        }
    }
}

export {
    AddNewButton,
    PickRandomButton,
    UpdateButton,
    DeleteButton,
    SwitchButton,
};
