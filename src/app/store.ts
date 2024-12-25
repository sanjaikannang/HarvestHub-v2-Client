import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";


// Configure Redux store with reducers
export const store = configureStore({
  reducer: {
    auth: authReducer, // Auth slice reducer
  },
});


// Export types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
