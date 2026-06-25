import React, { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Header from './components/Header.jsx'

// Lazy loading all components for performance optimization (code splitting)
const ProductList = lazy(() => import('./components/ProductList.jsx'))
const ProductDetail = lazy(() => import('./components/ProductDetails.jsx'))
const Cart = lazy(() => import('./components/Cart.jsx'))
const Checkout = lazy(() => import('./components/Checkout.jsx'))
const NotFound = lazy(() => import('./components/NotFound.jsx'))

// This is the layout that wraps all pages - it includes Header
function RootLayout() {
  return (
    <div className="app-wrapper">
      <Header />
      {/* Suspense shows a loading screen while lazy components load */}
      <Suspense fallback={<div className="loading-screen"><div className="loader"></div><p>Loading...</p></div>}>
        <main className="main-content">
          <Outlet />
        </main>
      </Suspense>
    </div>
  )
}

// Using createBrowserRouter as mentioned in the requirements
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <ProductList />,
      },
      {
        // Dynamic route for product detail - uses :id as route param
        path: 'product/:id',
        element: <ProductDetail />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        // This catches any route that doesn't exist
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
