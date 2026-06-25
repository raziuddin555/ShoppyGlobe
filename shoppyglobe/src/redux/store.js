import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice.js'
import searchReducer from './searchSlice.js'

// Setting up the Redux store with our two reducers
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        search: searchReducer,
    },
})