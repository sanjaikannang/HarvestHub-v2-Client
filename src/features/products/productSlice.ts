import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductState, UploadProductData, VerifyProductData } from '../../types/product.types';
import apiClient from '../../utils/apiClient';

const initialState: ProductState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
};

// Async thunk for uploading a product
export const uploadProduct = createAsyncThunk(
  'products/upload',
  async (productData: UploadProductData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.entries(productData).forEach(([key, value]) => {
        if (key === 'images') {
          value.forEach((file: File) => {
            formData.append('images', file);
          });
        } else {
          formData.append(key, value);
        }
      });

      const response = await apiClient.post('/api/products/create-order', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to upload product');
    }
  }
);

// Async thunk for verifying a product
export const verifyProduct = createAsyncThunk(
  'products/verify',
  async ({ productId, verifyData }: { productId: string; verifyData: VerifyProductData }, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(`/api/products/verify/${productId}`, verifyData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to verify product');
    }
  }
);

// Async thunk for fetching all products
export const getAllProducts = createAsyncThunk(
  'products/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/api/products/get-all-products-all');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

// Async thunk for fetching a specific product
export const getSpecificProduct = createAsyncThunk(
  'products/getSpecific',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/api/products/get-specific-product/${productId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
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
      
      // Verify Product
      .addCase(verifyProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload.product;
        state.products = state.products.map(product => 
          product._id === updatedProduct._id ? updatedProduct : product
        );
        if (state.currentProduct?._id === updatedProduct._id) {
          state.currentProduct = updatedProduct;
        }
      })
      .addCase(verifyProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Get All Products
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Get Specific Product
      .addCase(getSpecificProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSpecificProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload.product;
      })
      .addCase(getSpecificProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;