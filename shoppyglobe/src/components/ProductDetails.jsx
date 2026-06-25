import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice.js'

// ProductDetail shows full info about a single product
// It reads the product id from the URL route params
function ProductDetail() {
  const { id } = useParams() // getting the product id from route
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [added, setAdded] = useState(false)
  const [activeImg, setActiveImg] = useState(0)

  // Fetching the product details when the component mounts
  // or when the id in the URL changes
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`https://dummyjson.com/products/${id}`)

        if (!response.ok) {
          throw new Error(`Product not found (${response.status})`)
        }

        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id]) // re-runs if id changes

  function handleAddToCart() {
    dispatch(addToCart(product))
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  // Loading state
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p>Fetching product details...</p>
      </div>
    )
  }

  // Error state - handles failed fetch gracefully
  if (error) {
    return (
      <div className="error-container">
        <h2>Failed to load product</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')}>Go back to Home</button>
      </div>
    )
  }

  if (!product) return null

  return (
    <div className="detail-page">
      {/* Back button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="detail-layout">
        {/* Left side - images */}
        <div className="detail-images">
          <div className="main-img-wrapper">
            <img
              src={product.images?.[activeImg] || product.thumbnail}
              alt={product.title}
              className="main-img"
              loading="lazy"
            />
          </div>
          {/* Thumbnail row if product has multiple images */}
          {product.images && product.images.length > 1 && (
            <div className="img-thumbnails">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.title} view ${index + 1}`}
                  className={`thumb ${activeImg === index ? 'active-thumb' : ''}`}
                  onClick={() => setActiveImg(index)}
                  loading="lazy"
                />
              ))}
            </div>
          )}
        </div>

        {/* Right side - product info */}
        <div className="detail-info">
          <span className="product-category">{product.category}</span>
          <h1 className="detail-title">{product.title}</h1>

          <div className="detail-rating">
            <span className="stars">{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</span>
            <span>{product.rating} / 5</span>
          </div>

          <p className="detail-description">{product.description}</p>

          <div className="detail-meta">
            <div className="meta-item">
              <span className="meta-label">Brand</span>
              <span className="meta-value">{product.brand || 'N/A'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Stock</span>
              <span className={`meta-value ${product.stock < 10 ? 'low-stock' : ''}`}>
                {product.stock} left
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Discount</span>
              <span className="meta-value discount">{product.discountPercentage}% OFF</span>
            </div>
          </div>

          <div className="detail-price-row">
            <span className="detail-price">${product.price}</span>
          </div>

          <button
            className={`add-btn-large ${added ? 'added' : ''}`}
            onClick={handleAddToCart}
          >
            {added ? '✓ Added to Cart!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
