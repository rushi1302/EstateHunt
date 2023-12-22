import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    loading: false,
    error: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signinStart: (state) => {
            state.loading = true
        },
        signinSuccess: (state, action) => {
            state.loading = false,
                state.currentUser = action.payload
            state.error = null
        },
        signinFail: (state, action) => {
            state.loading = false,
                state.error = action.payload
        },
        updateUserStart: (state, action) => {
            state.loading = true
        },
        updateUserSuccess: (state, action) => {
            state.loading = false
            state.currentUser = action.payload
            state.error = null
        },
        updateUserFailed: (state, action) => {
            state.loading = true
            state.error = action.payload
        },
        deleteUserStart: (state) => {
            state.loading = true
        },
        deleteUserSuccess: (state, action) => {
            state.currentUser = null;
            state.loading = false
            state.error = null
        },
        deleteUserFailed: (state, action) => {
            state.error = action.payload
        },
        logoutUserStart: (state) => {
            state.loading = true
        },
        logoutUserSuccess: (state, action) => {
            state.currentUser = null;
            state.loading = false
            state.error = null
        },
        logoutUserFailed: (state, action) => {
            state.error = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { signinStart, signinFail, signinSuccess, updateUserStart, updateUserFailed, updateUserSuccess, deleteUserStart, deleteUserFailed, deleteUserSuccess, logoutUserStart, logoutUserSuccess, logoutUserFailed } = userSlice.actions

export default userSlice;