import React, { useState, useContext, useEffect } from 'react';
import Cart from '../components/Cart';
import './products.css';
import { cardData } from '../Layout/data';
import { CartContext } from '../CartContext'; // Import the CartContext

function Products({ isOutOfStock }) {
  const [selectedWeight, setSelectedWeight] = useState('500g');
  const [product, setProduct] = useState(null); // State for the specific product
  const [currentPrice, setCurrentPrice] = useState(0); // Initialize as 0
  const { addToCart } = useContext(CartContext); // Use context to get addToCart function

  useEffect(() => {
    // Fetch the specific product by ID
    const fetchProduct = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate an API call delay
      const foundProduct = cardData.find(card => card.id === 1); // Find product with id 1
      setProduct(foundProduct);

      if (foundProduct) {
        // Initialize currentPrice with the price for the selected weight
        const priceForWeight = foundProduct.weightOptions.find(option => option.weight === selectedWeight)?.price || foundProduct.price;
        setCurrentPrice(priceForWeight);
      }
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    // Update currentPrice when product or selectedWeight changes
    if (product) {
      const priceForWeight = product.weightOptions.find(option => option.weight === selectedWeight)?.price || product.price;
      setCurrentPrice(priceForWeight);
    }
  }, [selectedWeight, product]);

  const handleWeightChange = (event) => {
    setSelectedWeight(event.target.value);
  };

  const handleAddToCart = () => {

  
    if (product) {
      const cartItem = {
        id: `${product.name}-${selectedWeight}`, // Unique ID based on product name and selected weight
        imageUrl: product.imageUrl,
        name: product.name,
        weight: selectedWeight,
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
  
      // Optionally, you can use the addToCart function from CartContext if needed
      addToCart(cartItem);
    }

    window.location.reload()
  };
  
  if (!product) {
    return <div>Loading...</div>; // Show a loading indicator while fetching the product
  }

  return (
    <>
      <section className='products'>
        <div className="imagesProducts">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="contentProducts">
          <h1>{product.name}</h1>
          <span>Rs.{currentPrice}</span> {/* Display currentPrice */}
          <button 
            onClick={handleAddToCart} 
            disabled={product.isOutOfStock} // Disable button if the product is out of stock
          >
            {product.isOutOfStock ? 'Out of Stock' : 'Add to cart'}
          </button>

          <div className='svgicon'>
            {/* SVG icon content... */}
          </div>

          <div className='addToContent'>
            {/* Weight Dropdown */}
            <select value={selectedWeight} onChange={handleWeightChange}>
              {product.weightOptions.map(option => (
                <option key={option.weight} value={option.weight}>
                  {option.weight} - Rs.{option.price}
                </option>
              ))}
            </select>
          </div>

          <p className='contentOfDiscription'>
            {product.description}
          </p>
        </div>
        <Cart />
      </section>
    </>
  );
}

export default Products;
