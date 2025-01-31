// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import messageReducer from "./slices/messageSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    messages: messageReducer,
  },
});

export default store;
