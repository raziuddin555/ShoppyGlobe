import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCartItems, selectCartTotal } from '../redux/cartSlice.js'
import CartItem from './CartItem.jsx'

// Cart page shows all items added to cart with quantity controls
function Cart() {
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)

  // If cart is empty, show a message
  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/" className="shop-now-btn">Start Shopping</Link>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <h1 className="page-title">Shopping Cart</h1>
      <p className="cart-subtitle">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in cart</p>

      <div className="cart-layout">
        {/* Left side - list of cart items */}
        <div className="cart-items-list">
          {/* Rendering each cart item with unique key */}
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Right side - order summary */}
        <div className="cart-summary">
          <h3 className="summary-title">Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span className="free-shipping">FREE</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total-row">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="checkout-btn">
            Proceed to Checkout
          </Link>
          <Link to="/" className="continue-shopping">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart
