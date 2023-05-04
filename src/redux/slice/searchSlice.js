import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../constants/status";
import { SEARCH_URL } from "../../constants/url";
import { fetchData } from "../../fetch/fetchData";

const initialState = {
   searchedProducts: [],
   searchStatus: STATUS.IDLE,
}

export const fetchSearchProducts = (
   createAsyncThunk('search/fetch',
      async (request) => {
         const data = await fetchData(`${SEARCH_URL}${request}`);
         return data.products;
      }
   )
)

export const SearchSlicer = createSlice({
   name: 'search',
   initialState,
   reducers: {
      clearSearchResults: (state) => {
         state.searchedProducts = []
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchSearchProducts.pending, (state) => {
            state.searchStatus = STATUS.LOADING
         })
         .addCase(fetchSearchProducts.fulfilled, (state, action) => {
            state.searchedProducts = action.payload;
            state.searchStatus = STATUS.SUCCEEDED;
         })
         .addCase(fetchSearchProducts.rejected, (state) => {
            state.searchStatus = STATUS.FAILED
         })
   }
})
export const { clearSearchResults } = SearchSlicer.actions;
export const getSearchResults = (state) => state.search.searchedProducts;
export const getSearchStatus = (state) => state.search.searchStatus;
export default SearchSlicer.reducer;