import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartCount } from '../redux/cartSlice.js'

// Header shows the nav menu and cart icon with item count
function Header() {
  const cartCount = useSelector(selectCartCount)
  const navigate = useNavigate()

  return (
    <header className="header">
      <div className="header-inner">
        {/* Logo / Brand name */}
        <Link to="/" className="logo">
          Shoppy<span>Globe</span>
        </Link>

        {/* Navigation links */}
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/cart" className="nav-link cart-link">
            {/* Cart icon with badge showing number of items */}
          <span>🛒</span>
            Cart
            {/* Only show badge if cart has items */}
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
