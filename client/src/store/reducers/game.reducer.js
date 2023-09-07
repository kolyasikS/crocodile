import { Action, createReducer } from '@reduxjs/toolkit';
import { setRoom } from '../actions/game.actions';
const initialState = {
    room: null,
    points: 0
}
const gameReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setRoom, (state, { payload }) => {
            state.room = payload.room;
        })
})

export default gameReducer;