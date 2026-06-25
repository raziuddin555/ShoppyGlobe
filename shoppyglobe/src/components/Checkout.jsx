import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectCartItems, selectCartTotal, clearCart } from '../redux/cartSlice.js'

// Checkout page has a dummy form and cart summary
// After placing order, shows success message and redirects to home
function Checkout() {
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [orderPlaced, setOrderPlaced] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'card',
  })

  // Updating form state when user types
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // When user clicks Place Order
  function handlePlaceOrder() {
    // Basic validation - checking if main fields are filled
    if (!formData.name || !formData.email || !formData.address) {
      alert('Please fill in all required fields')
      return
    }

    // Show the order placed message
    setOrderPlaced(true)

    // Clear the cart using Redux action
    dispatch(clearCart())

    // Redirect to home after 3 seconds
    setTimeout(() => {
      navigate('/')
    }, 3000)
  }

  // If cart is empty and order hasn't been placed, redirect
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-icon">🛒</div>
        <h2>Nothing to checkout</h2>
        <p>Your cart is empty. Add some products first!</p>
        <button className="shop-now-btn" onClick={() => navigate('/')}>Go Shopping</button>
      </div>
    )
  }

  // Order success screen
  if (orderPlaced) {
    return (
      <div className="order-success">
        <div className="success-icon">✓</div>
        <h2>Order Placed!</h2>
        <p>Thank you for shopping with ShoppyGlobe. Your order has been confirmed.</p>
        <p className="redirect-msg">Redirecting you to home page...</p>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <h1 className="page-title">Checkout</h1>

      <div className="checkout-layout">
        {/* Left - User details form */}
        <div className="checkout-form-section">
          <h3 className="form-section-title">Delivery Details</h3>

          {/* Using div instead of form to avoid HTML form submission */}
          <div className="checkout-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="address">Address *</label>
              <textarea
                id="address"
                name="address"
                placeholder="Enter your full address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="pincode">Pincode</label>
                <input
                  id="pincode"
                  type="text"
                  name="pincode"
                  placeholder="Enter pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="paymentMethod">Payment Method</label>
                <select id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                  <option value="card">Credit / Debit Card</option>
                  <option value="upi">UPI</option>
                  <option value="cod">Cash on Delivery</option>
                  <option value="netbanking">Net Banking</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Cart summary */}
        <div className="checkout-summary">
          <h3 className="form-section-title">Order Summary</h3>

          <div className="summary-items">
            {cartItems.map((item) => (
              <div key={item.id} className="summary-item">
                <img src={item.thumbnail} alt={item.title} className="summary-item-img" loading="lazy" />
                <div className="summary-item-info">
                  <p className="summary-item-name">{item.title}</p>
                  <p className="summary-item-qty">Qty: {item.quantity}</p>
                </div>
                <span className="summary-item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="summary-divider"></div>

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

          {/* Place Order button */}
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  )
}

export default Checkout
