import { Action, createReducer } from '@reduxjs/toolkit';
import { addMessage, addPlayer, clear, setRoom } from '../actions/game.actions';
const initialState = {
    room: null,
    players: [],
    messages: [],
    points: 0
}
const gameReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setRoom, (state, { payload }) => {
            state.room = payload.room;
        })
        .addCase(addPlayer, (state, { payload }) => {
            state.players = [...state.players, {username: payload.player, role: payload.role}];
        })
        .addCase(addMessage, (state, { payload }) => {
            state.messages = [...state.messages, payload.message];
        })
        .addCase(clear, (state, { payload }) => {
            state.players = initialState.players;
            state.messages = initialState.messages;
        })
})

export default gameReducer;