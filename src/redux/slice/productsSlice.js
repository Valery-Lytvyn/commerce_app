import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { STATUS } from "../../constants/status";
import { BASE_URL } from "../../constants/url";
import { FETCH_PRODUCTS_LIMIT } from "../../constants/const";
import { fetchData } from "../../fetch/fetchData";



const initialState = {
   productsData: [],
   statusRequest: STATUS.IDLE,
}

export const fetchProducts = createAsyncThunk('products/fetch',
   async () => {
      const data = await fetchData(`${BASE_URL}?limit=${FETCH_PRODUCTS_LIMIT}`);
      return data.products;
   }
);


export const productsSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchProducts.pending, (state) => {
            state.statusRequest = STATUS.LOADING
         })
         .addCase(fetchProducts.fulfilled, (state, action) => {
            state.productsData = action.payload;
            state.statusRequest = STATUS.SUCCEEDED;
         })
         .addCase(fetchProducts.rejected, (state) => {
            state.statusRequest = STATUS.FAILED
         })
   }
})


export const getAllProducts = (state) => state.products.productsData;
export const getStatusRequest = (state) => state.products.statusRequest;
export default productsSlice.reducer;