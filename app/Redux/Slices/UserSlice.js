// store/Slices/UserSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    users: [],
    otpVerificationKey: null,  // Add otpVerificationKey to initialState
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users = [...state.users, action.payload];
        },
        removeUsers: (state, action) => {
            const newsetUser = state.users.filter((user) => user.id !== action.payload);
            state.users = newsetUser;
        },
        setUsers: (state, action) => {
            state.users = [...action.payload];
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setOtpVerificationKey: (state, action) => {  // Add reducer for otpVerificationKey
            state.otpVerificationKey = action.payload;
        },
        clearOtpVerificationKey: (state) => {  // Add reducer to clear otpVerificationKey
            state.otpVerificationKey = null;
        },
        logout: (state) => {
            state.token = null;
            state.users = [];
            state.otpVerificationKey = null;  // Clear otpVerificationKey on logout
        },
    },
});

export const { addUser, removeUsers, setUsers, setToken, setOtpVerificationKey, clearOtpVerificationKey, logout } = userSlice.actions;

export default userSlice.reducer;
