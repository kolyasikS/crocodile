import { CLEAR_USERNAME, SET_USERNAME } from '../constants/user.constants';
import { createAction } from '@reduxjs/toolkit';
import { SET_ROOM } from '../constants/game.constants';

export const setRoom = createAction(SET_ROOM, (room) => {
    return {
        payload: {
            room
        }
    }
});
