import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import './Layout.css';
import { cardData } from './data';
import { CartContext } from '../CartContext';

const Layout = () => {
  const [cards, setCards] = useState([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCards(cardData);
    };

    fetchData();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/products/${id}`);
  };

  const handleAddToCart = (product) => {
    // Ensure quantity starts at 1
    const productWithQuantity = { ...product, quantity: 1 };
    
    // Update localStorage
    const existingCart = JSON.parse(localStorage.getItem('checkoutData')) || [];
    const updatedCart = [...existingCart, productWithQuantity];
    localStorage.setItem('checkoutData', JSON.stringify(updatedCart));
    
    addToCart(productWithQuantity);
  };

  return (
    <div className="container">
      <h1 className="heading">Our Products</h1>
      <div className="card-row">
        {cards.map((card) => (
          <Card
            key={card.id}
            imageUrl={card.imageUrl}
            name={card.name}
            price={card.price}
            weightOptions={card.weightOptions}
            isOutOfStock={card.isOutOfStock}
            onAddToCart={handleAddToCart}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Layout;
