import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Slices/UserSlice';

const store = configureStore({
    reducer: {
        userinfo: userReducer,
    },
});

export default store;
