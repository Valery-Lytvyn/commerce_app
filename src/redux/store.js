import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slice/productsSlice";
import cartReducer from "./slice/cartSlice";
import currentProductReducer from "./slice/currentProductSlice";
import searchReducer from "./slice/searchSlice";
import categoryReducer from "./slice/categorySlice";
import authReducer from "./slice/authSlice";

import {
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
   products: productsReducer,
   product: currentProductReducer,
   cart: cartReducer,
   search: searchReducer,
   category: categoryReducer,
   auth: authReducer,
})

const persistConfig = {
   key: 'root',
   storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }),
})
export const persistor = persistStore(store);
export default store