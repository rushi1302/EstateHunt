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
        },
        updateUserFailed: (state, action) => {
            state.loading = true
            state.error = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { signinStart, signinFail, signinSuccess, updateUserStart, updateUserFailed, updateUserSuccess } = userSlice.actions

export default userSlice;