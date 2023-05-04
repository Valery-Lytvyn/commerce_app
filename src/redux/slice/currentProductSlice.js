import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants/url";
import { fetchData } from "../../fetch/fetchData";

const initialState = {
   productData: [],
}

export const fetchProduct = (
   createAsyncThunk('product/fetch',
      async (id) => {
         const data = await fetchData(`${BASE_URL}${id}`);
         return data;
      }
   )
)

export const currentProductSlicer = createSlice({
   name: 'currentProduct',
   initialState,
   reducers: {
      removeProduct: (state) => {
         state.productData = []
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchProduct.fulfilled, (state, action) => {
            state.productData = action.payload;
         })
   }
})

export const {
   removeProduct,
} = currentProductSlicer.actions;
export const getCurrentProduct = (state) => state.product.productData;
export default currentProductSlicer.reducer;