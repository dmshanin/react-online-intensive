// Core
import React from 'react';
import { mount } from 'enzyme';
import { Composer } from './';
import renderer from 'react-test-renderer';

const avatar = '/images/lisa.c0366.png';
const currentUserFirstName = 'Лиза';

const props = {
    _createPost: jest.fn(),
    avatar,
    currentUserFirstName,
};

const comment = 'Merry christmass!';

const initialState = {
    comment: '',
};

const updatedState = {
    comment,
};

const result = mount(<Composer { ...props } />);
const renderTree = renderer.create(<Composer { ...props } />).toJSON();

const _submitCommentSpy = jest.spyOn(result.instance(), '_submitComment');
const _handleFormSubmitSpy = jest.spyOn(result.instance(), '_handleFormSubmit');
const _submitOnEnterSpy = jest.spyOn(result.instance(), '_submitOnEnter');

describe('Composer component:', () => {
    test('should correspond to its snapshot counterpart', () => {
        expect(renderTree).toMatchSnapshot();
    });

    test('should have I «section» element', () => {
        expect(result.find('section')).toHaveLength(1);
    });

    test('should have I «form» element', () => {
        expect(result.find('form')).toHaveLength(1);
    });

    test('should have I «textarea» element', () => {
        expect(result.find('textarea')).toHaveLength(1);
    });

    test('should have I «input» element', () => {
        expect(result.find('input')).toHaveLength(1);
    });

    test('should have I «img» element', () => {
        expect(result.find('img')).toHaveLength(1);
    });

    test('should have valid initial state', () => {
        expect(result.state()).toEqual(initialState);
    });

    test('textarea value should be empty initially', () => {
        expect(result.find('textarea').text()).toBe('');
    });

    test('should respond to state change property', () => {
        result.setState({
            comment,
        });

        expect(result.state()).toEqual(updatedState);
        expect(result.find('textarea').text()).toBe(comment);

        result.setState({
            comment: '',
        });

        expect(result.state()).toEqual(initialState);
        expect(result.find('textarea').text()).toBe('');
    });

    test('should handle textarea «change» event', () => {
        result.find('textarea').simulate('change', {
            target: {
                value: comment,
            },
        });

        expect(result.find('textarea').text()).toBe(comment);
        expect(result.state()).toEqual(updatedState);
    });

    test('should handle form «submit» event', () => {
        result.find('form').simulate('submit');

        expect(result.state()).toEqual(initialState);
    });

    test('_createPost prop should be invoked once after from submission', () => {
        expect(props._createPost).toHaveBeenCalledTimes(1);
    });

    test('_submitComment and _handleFormSubmit class methods should be invoked once after is submitted', () => {
        expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
        expect(_handleFormSubmitSpy).toHaveBeenCalledTimes(1);
    });

    test('avatar prop should be avatar', () => {
        expect(props.avatar).toBe(avatar);
    });

    test('currentUserFirstName prop should be currentUserFirstName', () => {
        expect(props.currentUserFirstName).toBe(currentUserFirstName);
    });

    test('should handle form «submit» event on keypress «Enter»', () => {
        result.find('textarea').simulate('keypress', { key: 'Enter' });

        expect(result.state()).toEqual(initialState);
        expect(_submitOnEnterSpy).toHaveBeenCalledTimes(1);
    });
});
