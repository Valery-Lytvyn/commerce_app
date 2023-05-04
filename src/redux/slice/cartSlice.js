import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   cartData: [],
   purchasePrice: 0,
}

const findItem = (state, action) => {
   return state.cartData.find(item => item.id === action.payload.id);
}

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addToCart: (state, action) => {
         const item = findItem(state, action);
         if (item) {
            item.quantity += action.payload.quantity;
         }
         else {
            state.cartData.push(action.payload);
         }
      },
      incrementQuantity: (state, action) => {
         const item = findItem(state, action);
         item.quantity += 1;
      },
      decrementQuantity: (state, action) => {
         const item = findItem(state, action);
         if (item.quantity > 1) {
            item.quantity -= 1;
         }
      },
      countSum: (state, action) => {
         const item = findItem(state, action);
         item.total = item.price * item.quantity;
      },
      calcAmount: (state) => {
         state.purchasePrice = state.cartData.reduce((sum, item) => sum + +item.total, 0);
      },
      removeItem: (state, action) => {
         state.cartData = state.cartData.filter(
            (item => item.id !== action.payload.id)
         )
      },
      resetCart: (state) => {
         state.cartData = []
      }
   }
}
);

export const {
   addToCart,
   removeItem,
   incrementQuantity,
   decrementQuantity,
   countQty,
   countSum,
   calcAmount,
   resetCart
} = cartSlice.actions;
export const getCartData = (state) => state.cart.cartData;
export const getQuantity = (state) => state.cart.cartData.reduce((sum, item) => sum + +item.quantity, 0);
export const getPurchasePrice = (state) => state.cart.cartData.reduce((sum, item) => sum + +item.total, 0);
export default cartSlice.reducer;