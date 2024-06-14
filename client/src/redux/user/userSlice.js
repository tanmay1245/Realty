import { createSlice } from "@reduxjs/toolkit";

var initialState = {
    currentUser: null,
    error: null,
    loading: null,
    theme: "light"
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        deleteUserSuccess: (state, action) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        changeTheme: (state, action) => {
            state.theme = action.payload;
        }
    }
});

export const { signInStart, signInSuccess, signInFailure, updateUserSuccess, deleteUserSuccess, changeTheme } = userSlice.actions
export default userSlice.reducer;