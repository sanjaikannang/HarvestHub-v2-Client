import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiClient from "../../utils/apiClient";
import { AuthState, SignupFormData, LoginFormData } from "../../types/auth.types";

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (payload: SignupFormData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/user/signup", payload);
      toast.success("Signup successful! Please log in.");
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Signup failed");
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
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
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
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;