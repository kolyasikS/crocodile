import { CLEAR_USERNAME, SET_USERNAME } from '../constants/user.constants';
import { createAction } from '@reduxjs/toolkit';
import { ADD_MESSAGE, ADD_PLAYER, CLEAR, SET_ROOM } from '../constants/game.constants';

export const setRoom = createAction(SET_ROOM, (room) => {
    return {
        payload: {
            room
        }
    }
});

export const addPlayer = createAction(ADD_PLAYER, (player, role) => {
    return {
        payload: {
            player,
            role
        }
    }
});

export const addMessage = createAction(ADD_MESSAGE, (message) => {
    return {
        payload: {
            message
        }
    }
});

export const clear = createAction(CLEAR, () => {
    return {
        payload: {
        }
    }
});
