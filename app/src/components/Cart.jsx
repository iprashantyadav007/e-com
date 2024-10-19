import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Cart.css';
import CartItem from './CartItem';
import cartImage from '../components/shop.svg';
import { CartContext } from '../CartContext';

function Cart() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const { cartItems } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Calculate subtotal based on cartItems
    const calculateSubtotal = () => {
      const newSubtotal = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      setSubtotal(newSubtotal);
    };

    calculateSubtotal(); // Initial calculation
  }, [cartItems]);

  useEffect(() => {
    // Handle URL path changes for drawer state
    if (location.pathname === '/cart') {
      setIsDrawerOpen(true);
    } else {
      setIsDrawerOpen(false);
    }
  }, [location]);

  const handleClose = () => {
    setIsDrawerOpen(false);
    if (window.innerWidth <= 500) {
      navigate('/');
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="App" id="carticon">
      <div className='btnCartWrapper'>
        <button onClick={toggleDrawer}>
          <img src={cartImage} alt="Cart" />
        </button>
        <span className='btnCart'>Cart</span>
      </div>

      {isDrawerOpen && (
        <div className="side-drawer">
          <button className="close-button" onClick={handleClose}>
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="#E91E63" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z"
                fill="#E91E63"
              ></path>
            </svg>
          </button>
          <section className='cartWrapper'>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
              <>
                <p>Your Cart is empty</p>
                <button className="refresh-button" onClick={() => window.location.reload()}>
                  Reload
                </button>
              </>
            ) : (
              cartItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))
            )}
          </section>
          <section className='itemFooter'>
            <div className='itemCheckout'>
              <div className='itemCheckoutRow'>
                <div className='itemShipping'>Shipping</div>
                <div className='itemTotal'>Free</div>
              </div>
              <div className='itemCheckoutRow'>
                <div className='itemShipping'>Sub Total</div>
                <div className='itemTotal'>
                  Rs.{subtotal.toFixed(2)}
                </div>
              </div>
            </div>
            <button>Check Out</button>
          </section>
        </div>
      )}
    </div>
  );
}

export default Cart;
