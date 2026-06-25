import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery, selectSearchQuery } from '../redux/searchSlice.js'
import useFetchProducts from '../hooks/useFetchProducts.js'
import ProductItem from './ProductItem.jsx'

// ProductList fetches products using custom hook and shows them in a grid
function ProductList() {
  const dispatch = useDispatch()
  const searchQuery = useSelector(selectSearchQuery)

  // Using the custom hook to get products, loading state, and error
  const { products, loading, error } = useFetchProducts()

  // Filtering products based on search query from Redux state
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Show loading spinner while fetching
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p>Loading products...</p>
      </div>
    )
  }

  // Show error message if fetch failed
  if (error) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <p>Please check your internet connection and try again.</p>
      </div>
    )
  }

  return (
    <div className="product-list-page">
      {/* Hero section */}
      <div className="hero">
        <h1>Discover Everything</h1>
        <p>Quality products, great prices — all in one place</p>
      </div>

      {/* Search bar - dispatches to Redux state */}
      <div className="search-wrapper">
        <div className="search-bar">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
          {/* Clear button shows only when something is typed */}
          {searchQuery && (
            <button className="clear-search" onClick={() => dispatch(setSearchQuery(''))}>✕</button>
          )}
        </div>
      </div>

      {/* Show how many results found when searching */}
      {searchQuery && (
        <p className="results-count">
          {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for "{searchQuery}"
        </p>
      )}

      {/* If no products match the search */}
      {filteredProducts.length === 0 ? (
        <div className="no-results">
          <p>No products found for "{searchQuery}"</p>
          <button onClick={() => dispatch(setSearchQuery(''))}>Clear Search</button>
        </div>
      ) : (
        // Rendering the product grid - each ProductItem gets a unique key
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductList
