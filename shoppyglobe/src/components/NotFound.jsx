import React from 'react'
import { Link, useLocation } from 'react-router-dom'

// NotFound component shows when someone visits an unknown route
function NotFound() {
  // Getting the current URL path to show the user what they tried to access
  const location = useLocation()

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        {/* Big 404 display */}
        <h1 className="error-code">404</h1>

        <h2 className="error-title">Page Not Found</h2>

        {/* Showing the exact path that doesn't exist */}
        <div className="error-details">
          <p>The page you're looking for doesn't exist.</p>
          <div className="error-path">
            <span className="path-label">Requested URL:</span>
            <code className="path-value">{location.pathname}</code>
          </div>
          <p className="error-hint">This could be because:</p>
          <ul className="error-reasons">
            <li>The URL was typed incorrectly</li>
            <li>The page has been moved or deleted</li>
            <li>The link you followed is broken</li>
          </ul>
        </div>

        <Link to="/" className="home-btn">Go back to Home</Link>
      </div>
    </div>
  )
}

export default NotFound
