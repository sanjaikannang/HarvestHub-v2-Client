import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductState } from '../../types/product.types';
import apiClient from '../../utils/apiClient';


const initialState: ProductState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
  successMessage: null,
};


// Async thunk for uploading a product
export const uploadProduct = createAsyncThunk(
  'product/create-order',
  async (formData: FormData, { rejectWithValue }) => {

    try {
      const response = await apiClient.post('/product/create-order', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return response.data;

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to upload product';
      return rejectWithValue(errorMessage);
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
    clearSuccessMessage: (state) => {
      state.successMessage = null;
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
        state.successMessage = null;
      })
      .addCase(uploadProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message || 'Product uploaded successfully!';
        state.currentProduct = action.payload.product;
      })
      .addCase(uploadProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});


export const { clearError, clearSuccessMessage, clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;