import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductState } from '../../types/product.types';
import apiClient from '../../utils/apiClient';


const initialState: ProductState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
};


// Async thunk for uploading a product
export const uploadProduct = createAsyncThunk(
  'product/create-order',
  async (formData: FormData, { rejectWithValue }) => {
    try {

      const response = await apiClient.post('/product/create-order', formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return response.data;

    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to upload product');
    }
  }
);


const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Upload Product
      .addCase(uploadProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export const { clearError, clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;