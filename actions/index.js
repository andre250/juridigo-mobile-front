import {LOGIN} from './actionTypes';

export const login = user => ({
    type: LOGIN,
    payload: user
});