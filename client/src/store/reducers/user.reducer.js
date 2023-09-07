import { Action, createReducer } from '@reduxjs/toolkit';
import { clearUsername, setUsername } from '../actions/user.actions';
const initialState = {
    username: null
}
const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setUsername, (state, { payload }) => {
            state.username = payload.username;
        })
        .addCase(clearUsername, (state, { payload }) => {
            state.username = null;
        })
})

export default userReducer;