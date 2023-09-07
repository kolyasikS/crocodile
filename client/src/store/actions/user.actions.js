import { CLEAR_USERNAME, SET_USERNAME } from '../constants/user.constants';
import { createAction } from '@reduxjs/toolkit';

export const setUsername = createAction(SET_USERNAME, (username) => {
    return {
        payload: {
            username
        }
    }
});

export const clearUsername = createAction(CLEAR_USERNAME, () => {
    return {
        payload: {
        }
    }
});
