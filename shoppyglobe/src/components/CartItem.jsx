import React from 'react'
import { useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity } from '../redux/cartSlice.js'

// CartItem represents a single item in the cart
// Receives item object as prop from Cart component
function CartItem({ item }) {
  const dispatch = useDispatch()

  // Removing the item from cart using Redux action
  function handleRemove() {
    dispatch(removeFromCart(item.id))
  }

  // Increasing quantity
  function handleIncrease() {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
  }

  // Decreasing quantity - minimum is 1, cant go below that
  function handleDecrease() {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
    }
  }

  return (
    <div className="cart-item">
      {/* Product image */}
      <div className="cart-img-wrapper">
        <img src={item.thumbnail} alt={item.title} className="cart-img" loading="lazy" />
      </div>

      {/* Product details */}
      <div className="cart-item-info">
        <h4 className="cart-item-title">{item.title}</h4>
        <span className="cart-item-price">${item.price} each</span>
      </div>

      {/* Quantity controls */}
      <div className="quantity-controls">
        {/* Decrease button is visually disabled when quantity is 1 */}
        <button
          className="qty-btn"
          onClick={handleDecrease}
          disabled={item.quantity === 1}
        >
          −
        </button>
        <span className="qty-display">{item.quantity}</span>
        <button className="qty-btn" onClick={handleIncrease}>+</button>
      </div>

      {/* Subtotal for this item */}
      <span className="cart-item-subtotal">
        ${(item.price * item.quantity).toFixed(2)}
      </span>

      {/* Remove button */}
      <button className="remove-btn" onClick={handleRemove}>
        Remove
      </button>
    </div>
  )
}

export default CartItem
