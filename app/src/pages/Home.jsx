// Home.jsx
import React from 'react';
import Banner from "../components/Banner";
import CardLayout from '../Layout/CardLayout';
import { CartProvider } from '../CartContext'; // Import the CartProvider without '.jsx'
import Cart from '../components/Cart';
import './home.css'

function Home() {
  return (
    <CartProvider> {/* Wrap the entire app in CartProvider */}
      <Banner />
      <Cart/>
      <CardLayout />
    
    </CartProvider>
  );
}

export default Home;
