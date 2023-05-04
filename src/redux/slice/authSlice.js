import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   userData: {}
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setActiveUser: (state, action) => {
         state.userData = action.payload;
      },
      removeActiveUser: (state) => {
         state.userData = {};
      }
   }
});

export const {
   setActiveUser,
   removeActiveUser
} = authSlice.actions


export const getUserData = (state) => state.auth.userData;
export default authSlice.reducer;