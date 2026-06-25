import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice.js'

// ProductItem represents a single product card in the grid
// It receives the product object as a prop from ProductList
function ProductItem({ product }) {
  const dispatch = useDispatch()
  const [added, setAdded] = useState(false)
  const [imgError, setImgError] = useState(false)

  // When user clicks "Add to Cart", dispatch the action to Redux
  function handleAddToCart() {
    dispatch(addToCart(product))
    // Show a quick "Added!" feedback to the user
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="product-card">
      {/* Product image with lazy loading for performance */}
      <Link to={`/product/${product.id}`} className="product-img-link">
        <div className="product-img-wrapper">
          {!imgError ? (
            <img
              src={product.thumbnail}
              alt={product.title}
              loading="lazy"
              className="product-img"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="img-fallback">No Image</div>
          )}
        </div>
      </Link>

      <div className="product-info">
        {/* Category tag */}
        <span className="product-category">{product.category}</span>

        {/* Product title - clicking goes to detail page */}
        <Link to={`/product/${product.id}`} className="product-title-link">
          <h3 className="product-title">{product.title}</h3>
        </Link>

        {/* Rating */}
        <div className="product-rating">
          <span className="stars">{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</span>
          <span className="rating-num">({product.rating})</span>
        </div>

        <div className="product-footer">
          <span className="product-price">${product.price}</span>
          {/* Add to Cart button - shows "Added!" briefly after clicking */}
          <button
            className={`add-btn ${added ? 'added' : ''}`}
            onClick={handleAddToCart}
          >
            {added ? '✓ Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
