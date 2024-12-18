import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.ts"; // Ensure userSlice is also typed properly

// Configure the store with typed reducers
export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
