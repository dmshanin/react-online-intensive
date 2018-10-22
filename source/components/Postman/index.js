// Core
import React from 'react';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

// Instruments
import Styles from './styles.m.css';
import { withProfile } from "../HOC/withProfile";

const _animatePostmanEntered = (composer) => {
    fromTo(
        composer,
        1,
        { opacity: 1, x: 0 },
        { opacity: 0, x: 500 }
    );
};

const _animatePostmanEntering = (composer) => {
    fromTo(
        composer,
        1,
        { opacity: 0, x: 500 },
        { opacity: 1, x: 0 }
    );
};

const Postman = (props) => {
    return (
        <Transition
            appear
            in
            onEntered = { _animatePostmanEntered }
            onEntering = { _animatePostmanEntering }
            timeout = { 4000 }>
            <section className = { Styles.postman }>
                <img src = { props.avatar } />
                <span>Welcome online, {props.currentUserFirstName}</span>
            </section>
        </Transition>
    );
};

export default withProfile(Postman);
