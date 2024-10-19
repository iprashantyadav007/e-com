import React, { useState } from 'react';
import './Card.css';

const Card = ({ imageUrl, name, price, weightOptions, isOutOfStock, onAddToCart, onClick }) => {
  // State for selected weight and current price
  const [selectedWeight, setSelectedWeight] = useState(weightOptions[0]);
  const [currentPrice, setCurrentPrice] = useState(selectedWeight.price);

  // Function to handle weight change
  const handleWeightChange = (event) => {
    event.stopPropagation(); // Prevent triggering onClick for the card
    const selected = weightOptions.find(option => option.weight === event.target.value);
    setSelectedWeight(selected);
    setCurrentPrice(selected.price);
  };

  // Function to handle adding to cart
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent triggering onClick for the card
    window.location.reload()
    if (!isOutOfStock) {
      const uniqueId = `${name}-${selectedWeight.weight}`; // Unique ID based on product name and weight
      const cartItem = {
        id: uniqueId,
        imageUrl,
        name,
        weight: selectedWeight.weight,
        price: currentPrice,
        quantity: 1 // Default quantity of 1
      };

      // Retrieve existing cart data from localStorage
      const existingCart = JSON.parse(localStorage.getItem('checkoutData')) || [];

      // Check if the item already exists in the cart
      const itemIndex = existingCart.findIndex(item => item.id === cartItem.id);

      if (itemIndex > -1) {
        // Update the quantity of the existing item
        existingCart[itemIndex].quantity += 1;
      } else {
        // Add new item to the cart
        existingCart.push(cartItem);
      }

      // Save updated cart data to localStorage
      localStorage.setItem('checkoutData', JSON.stringify(existingCart));

      // Optionally, you can use the onAddToCart function if needed
      onAddToCart(cartItem);
    }
  };

  return (
    <div className={`card shine-overlay ${isOutOfStock ? 'out-of-stock' : ''}`} onClick={onClick}>
      {isOutOfStock && <span className="out-of-stock-label">Out of Stock</span>}
      <img 
        src={imageUrl} 
        alt={name} 
        className={`card-image ${isOutOfStock ? 'img-filter' : ''}`} 
      />
      <div className="card-content">
        <h2 className="card-name">{name}</h2>
        <p className="card-price">₹{currentPrice.toFixed(2)}</p>

        {/* Weight Dropdown */}
        <select
          onClick={(e) => e.stopPropagation()} // Prevent card onClick on dropdown click
          onChange={handleWeightChange}
          value={selectedWeight.weight}
          className={`weight-select ${isOutOfStock ? 'disabled' : ''}`}
          disabled={isOutOfStock}
        >
          {weightOptions.map(option => (
            <option key={option.weight} value={option.weight}>
              {option.weight} - ₹{option.price}
            </option>
          ))}
        </select>

        <button
          className={`add-to-cart-btn ${isOutOfStock ? 'disabled' : ''}`}
          onClick={handleAddToCart}
          disabled={isOutOfStock}
        >
          Add to Cart
        </button>
      </div>
      <div className="shine"></div> {/* The shine effect */}
    </div>
  );
};

export default Card;
