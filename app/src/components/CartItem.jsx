import React, { useState, useEffect, useContext } from 'react';
import './CartItem.css';
import { CartContext } from '../CartContext';

function CartItem({ item }) {
  const { removeFromCart, updateItemQuantity } = useContext(CartContext);
  const [currentPrice, setCurrentPrice] = useState(item.price);
  const [imageUrl, setImageUrl] = useState(null);
  const [title, setTitle] = useState(null);
  const [weight, setWeight] = useState(null);




  useEffect(() => {
    // Fetch stored data from localStorage
    const storedItem = JSON.parse(localStorage.getItem(`cartItem-${item.id}`));
    if (storedItem) {
      setImageUrl(storedItem.imageUrl);
      setTitle(storedItem.name);
      setWeight(storedItem.weight);
      setCurrentPrice(storedItem.price);
    }
  }, [item.id]);

  const incrementCount = () => {
    const newQuantity = item.quantity + 1;
    updateItemQuantity(item.id, newQuantity);
    localStorage.setItem(`quantity-${item.id}`, newQuantity); // Update quantity in localStorage
  };

  const decrementCount = () => {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      updateItemQuantity(item.id, newQuantity);
      localStorage.setItem(`quantity-${item.id}`, newQuantity); // Update quantity in localStorage
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
    localStorage.removeItem(`price-${item.id}`);
    localStorage.removeItem(`quantity-${item.id}`);
    localStorage.removeItem(`cartItem-${item.id}`);
  };

  // Ensure that quantity and price are valid numbers
  const validQuantity = isNaN(item.quantity) ? 0 : item.quantity;
  const validPrice = isNaN(currentPrice) ? 0 : currentPrice;

  return (
    <div className="cartItemWrapper">
      <div className='mainContentItem'>
        <div className="ItemImage">
          <img src={item.imageUrl} alt={title} className='cartImage' />
        </div>
        <p className='itemTitle'>{item.name}</p>
        <p className='itemWeight'>{item.weight}</p> {/* Display the weight */}
      </div>

      <div className='itemContent'>
        {/* Displaying the price, ensuring it is a valid number */}
        <p>Rs.{validPrice.toFixed(2)}</p>

        <div className='buttonInc'>
          <button className='count' onClick={incrementCount}>+</button>
          <span>{validQuantity}</span>
          <button className='count' onClick={decrementCount} disabled={validQuantity === 1}>-</button>
        </div>

        <span className='itemRemove' onClick={handleRemove}>Remove</span>
      </div>
    </div>
  );
}

export default CartItem;
