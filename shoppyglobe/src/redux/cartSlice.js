import { createSlice } from '@reduxjs/toolkit'

// Initial state for cart - just an empty array
const initialState = {
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Action to add product to cart
        // If product already in cart, just increase quantity
        addToCart: (state, action) => {
            const existingItem = state.items.find((item) => item.id === action.payload.id)
            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.items.push({...action.payload, quantity: 1 })
            }
        },

        // Action to remove a product completely from cart
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload)
        },

        // Action to update quantity - quantity cannot go below 1
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload
            const item = state.items.find((item) => item.id === id)
            if (item) {
                // making sure quantity doesnt go below 1
                if (quantity < 1) {
                    item.quantity = 1
                } else {
                    item.quantity = quantity
                }
            }
        },

        // Action to clear the entire cart (used after order placed)
        clearCart: (state) => {
            state.items = []
        },
    },
})

// Exporting actions
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions

// Selectors - these are helper functions to get data from state
export const selectCartItems = (state) => state.cart.items
export const selectCartTotal = (state) =>
    state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
export const selectCartCount = (state) =>
    state.cart.items.reduce((count, item) => count + item.quantity, 0)

export default cartSlice.reducer