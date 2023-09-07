import { createSelector } from '@reduxjs/toolkit';

const selectUsername = state => state.user.username;
const selectRoom = state => state.game.room;
export const chatSelector = createSelector(selectUsername, selectRoom, (username, room) => {
    return {
        username,
        room
    }
})
