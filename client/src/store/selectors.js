import { createSelector } from '@reduxjs/toolkit';

const selectUsername = state => state.user.username;
const selectRoom = state => state.game.room;
const selectPlayers = state => state.game.players;
const selectMessages = state => state.game.messages;
export const chatSelector = createSelector(selectUsername, selectRoom, selectPlayers, selectMessages, (username, room, players, messages) => {
    return {
        username,
        room,
        players,
        messages
    }
})
