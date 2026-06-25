import { createSlice } from '@reduxjs/toolkit'

// This slice manages the search query state for filtering products
const searchSlice = createSlice({
    name: 'search',
    initialState: {
        query: '',
    },
    reducers: {
        // Updates the search query in redux state
        setSearchQuery: (state, action) => {
            state.query = action.payload
        },
    },
})

export const { setSearchQuery } = searchSlice.actions

// Selector to get search query
export const selectSearchQuery = (state) => state.search.query

export default searchSlice.reducer