// Core
import React, { Component } from 'react';

// Components
import { withProfile } from 'components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';

@withProfile
export default class Feed extends Component {
    _handleFormSubmit = (event) => {
        event.preventDefault();
        this.props._logout();
    };

    render () {
        const {
            currentUserFirstName,
            currentUserLastName,
            avatar,
        } = this.props;

        return (
            <section className = { Styles.profile }>
                <h1>
                    Welcome, {currentUserFirstName} {currentUserLastName}
                </h1>
                <img src = { avatar } />

                <form onSubmit = { this._handleFormSubmit }>
                    <input type = 'submit' value = 'Logout' />
                </form>
            </section>
        );
    }
}
