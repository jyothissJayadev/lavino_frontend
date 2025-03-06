import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './components/MainPage';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import SendMessagePage from './components/SendMessagePage';
import { CartProvider } from './CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/products/:category" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/send-message" element={<SendMessagePage />} />
          
          {/* Wildcard route to handle unmatched paths and redirect to /products/kids */}
          <Route path="*" element={<Navigate to="/products/cakes" />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
