// Core
import React, { Component } from 'react';

// Components
import { withProfile } from 'components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';

@withProfile
export default class Login extends Component {
    _handleFormSubmit = (event) => {
        event.preventDefault();
        this.props._login();
    };

    render () {
        return (
            <section className = { Styles.login }>
                <form onSubmit = { this._handleFormSubmit }>
                    <input type = 'submit' value = 'Login' />
                </form>
            </section>
        );
    }
}