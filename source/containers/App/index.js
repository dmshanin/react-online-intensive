// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';

// Components
import Catcher from 'components/Catcher';
import StatusBar from 'components/StatusBar';
import Login from 'components/Login';
import Feed from 'components/Feed';
import Profile from 'components/Profile';
import { Provider } from 'components/HOC/withProfile';

// Instruments
import avatar from 'theme/assets/lisa';

@hot(module)
export default class App extends Component {
    constructor () {
        super();

        this.state = {
            avatar,
            isAuthenticated:      false,
            currentUserFirstName: 'Дмитрий',
            currentUserLastName:  'Шанин',
            _logout:              this._logout,
        };
    }

    _login = () => {
        this.setState({
            isAuthenticated: true,
        });
    };

    _logout = () => {
        this.setState({
            isAuthenticated: false,
        });
    };

    render () {
        const { isAuthenticated } = this.state;

        return (
            <Catcher>
                <Provider value = { this.state } >
                    <StatusBar />
                    <Switch>
                        <Route
                            path = '/login'
                            render = { (props) => (
                                <Login _login = { this._login } { ...props } />
                            ) }
                        />
                        {!isAuthenticated && <Redirect to = '/login' />}
                        <Route component = { Feed } path = '/feed' />
                        <Route component = { Profile } path = '/profile' />
                        <Redirect to = '/feed' />
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}
