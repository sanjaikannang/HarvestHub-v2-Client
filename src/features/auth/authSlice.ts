import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiClient from "../../utils/apiClient";
import { AuthState, SignupFormData, LoginFormData } from "../../types/auth.types";

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"), // Retrieve user data from localStorage
  token: localStorage.getItem("token") || null, // Retrieve token from localStorage
  loading: false,
  error: null,
};

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (payload: SignupFormData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/user/signup", payload);
      toast.success("Signup Successful ! Please Login.");
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      console.log("Error", error.response?.data?.message)
      return rejectWithValue(error.response?.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: LoginFormData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/user/login", payload);
      toast.success("Login successful!");

      // Save the user and token in localStorage
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user)); // Save the user object as a string

      return { token, user };
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      console.log("Error", error.response?.data?.message)
      return rejectWithValue(error.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        // Optionally store token and user in localStorage during login
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user)); // Store full user data
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;