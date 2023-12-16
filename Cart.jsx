
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const carts = JSON.parse(localStorage.getItem('cart')) || [];

  useEffect(() => {
    const total = carts.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    setTotal(total);
  }, [carts]);

  const handleInc = (id) => {
    const updatedCart = carts.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    navigate('/cart');
  };

  const handleDec = (id) => {
    const updatedCart = carts.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    navigate('/cart');
  };

  const removeProduct = (id) => {
    const updatedCart = carts.filter((item) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    navigate('/cart');
  };

  const showPopup = () => {
    setPopupVisible(true);
  };

  const hidePopup = () => {
    setPopupVisible(false);
  };

  if (carts.length === 0) {
    return <div className='cart-empty'>Cart is Empty</div>;
  }

  return (
    <div className='cart-container'>
      <div className='cart-details'>
        <div className='cart-header'>
          <h1>Cart</h1>
          <h2 className='cart-items-count'>{carts?.length} Items</h2>
        </div>
        
        {carts?.map((cart) => (
          <div key={cart.id} className='product'>
            <div className='product-info'>
              <div className='product-image'>
                <img src={cart?.image} alt={cart?.title} />
              </div>
              <div className='product-details'>
                <span className='product-title'>{cart?.title}</span>
                <span className='product-category'>{cart?.category}</span>
                <div className='remove-product' onClick={() => removeProduct(cart?.id)}>
                  Cancel
                </div>
              </div>
            </div>
            <div className='quantity-control'>
              <svg
                className='quantity-icon'
                viewBox='0 0 448 512'
                onClick={() => handleDec(cart?.id)}
              >
                <path d='M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z' />
              </svg>
              <input
                className='quantity-input'
                type='text'
                value={cart?.quantity}
                readOnly
              />
              <svg
                className='quantity-icon'
                onClick={() => handleInc(cart?.id)}
                viewBox='0 0 448 512'
              >
                <path d='M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z' />
              </svg>
            </div>
            <span className='product-price'>${cart?.price}</span>
            <span className='product-total'>${cart?.price * cart?.quantity}</span>
          </div>
        ))}
        <Link
          to={'/'}
          className='continue-shopping'
        >
          <svg>
            <path d='M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z' />
          </svg>
          <div className='continue-shopping '>Go Back</div>
          
        </Link>
      </div>
      <div id='summary' className='summary-container'>
      <h1 className='summary-header'>
          Your Order
        </h1>
        <div className='summary-items'>
          <span className='summary-label'>Items {carts?.length}</span>
          <span className='summary-value'>${total?.toFixed(2)}</span>
        </div>
        <div className='total-cost'>
          <div className='total-cost-details'>
            <span>Total </span>
            <span>${(total + 10).toFixed(2)}</span>
          </div>
          <button onClick={showPopup} className='checkout-button'>
            Checkout
          </button>
        </div>
      </div>
      {isPopupVisible && (
        <div className='popup-container'>
          <div className='popup-content'>
            <div className='popup-message'>
              <p>Login In First</p>
            </div>
            <div className='popup-buttons'>
              <Link to="/signin">
                <button className='signin-button'>Log In</button>
              </Link>
              <button onClick={hidePopup} className='close-button'>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

