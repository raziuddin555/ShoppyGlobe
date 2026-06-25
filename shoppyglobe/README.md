ShoppyGlobe - E-commerce Application
A responsive e-commerce web application built using React + Vite.
This project was created as part of the Internshala React Project Assignment.

GitHub Repository
Repo Link:
https://github.com/Saad-Shams-dev/shoppyglobe-ecommerce.git

Project Overview
ShoppyGlobe is a basic e-commerce application where users can:

Browse products
Search products
View product details
Add/remove items from cart
Update quantities
Complete checkout process
The application uses Redux Toolkit for state management and React Router for navigation.

Tech Stack
React 18
Vite
Redux Toolkit
React Redux
React Router DOM
CSS
Features
Product listing from API
Dynamic product detail pages
Shopping cart functionality
Quantity increment/decrement
Remove item from cart
Checkout page with order summary
Search functionality using Redux state
Lazy loading using React.lazy and Suspense
Responsive UI
404 Not Found page
Project Structure
src/
├── components/
│   ├── Header.jsx
│   ├── ProductList.jsx
│   ├── ProductItem.jsx
│   ├── ProductDetail.jsx
│   ├── Cart.jsx
│   ├── CartItem.jsx
│   ├── Checkout.jsx
│   └── NotFound.jsx
├── hooks/
│   └── useFetchProducts.js
├── redux/
│   ├── store.js
│   ├── cartSlice.js
│   └── searchSlice.js
├── App.jsx
├── main.jsx
└── index.css
Routing
The application uses createBrowserRouter for routing.

Routes included:

/ → Home Page
/product/:id → Product Detail Page
/cart → Cart Page
/checkout → Checkout Page
* → 404 Not Found Page
Redux State Management
Redux Toolkit is used to manage:

Cart items
Product quantities
Search state
Files:

store.js
cartSlice.js
searchSlice.js
Custom Hook
A custom hook named:

useFetchProducts.js
is used to fetch product data from the API using useEffect.

API Used
Product List API:
https://dummyjson.com/products

Product Detail API:
https://dummyjson.com/products/:id

How to Run the Project
1. Install Dependencies
npm install

2. Start Development Server
npm run dev

3. Build for Production
npm run build

Performance Optimization
React.lazy used for code splitting
Suspense used for fallback loading
Lazy loading implemented for components
Responsive Design
The application is fully responsive and works on:

Desktop
Tablet
Mobile devices
Author
Saad Shams
