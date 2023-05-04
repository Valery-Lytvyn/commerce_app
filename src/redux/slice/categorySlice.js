import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { STATUS } from "../../constants/status"
import { CATEGORY_URL } from "../../constants/url";
import { fetchData } from "../../fetch/fetchData";

const initialState = {
   categoryProducts: [],
   statusCategoryRequest: STATUS.IDLE,
}

export const fetchCategoryProducts = createAsyncThunk('category/fetch',
   async (value) => {
      const data = await fetchData(`${CATEGORY_URL}${value}`);
      return data.products;
   }
)

export const categorySlice = createSlice({
   name: 'category',
   initialState,
   reducers: {
      removeCategoryProducts: (state) => {
         state.categoryProducts = []
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchCategoryProducts.pending, (state) => {
            state.statusRequest = STATUS.LOADING
         })
         .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
            state.categoryProducts = action.payload;
            state.statusRequest = STATUS.SUCCEEDED;
         })
         .addCase(fetchCategoryProducts.rejected, (state) => {
            state.statusRequest = STATUS.FAILED
         })
   }
})
export const {
   removeCategoryProducts
} = categorySlice.actions;
export const getCategoryProducts = (state) => state.category.categoryProducts;
export const statusCategoryRequest = (state) => state.category.statusCategoryRequest;
export default categorySlice.reducer;
