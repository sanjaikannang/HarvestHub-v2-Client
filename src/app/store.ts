import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/products/productSlice";

// Configure Redux store with reducers
export const store = configureStore({
  reducer: {
    auth: authReducer, // Auth slice reducer    
    product: productReducer,  // Product slice reducer
  },
});


// Export types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
