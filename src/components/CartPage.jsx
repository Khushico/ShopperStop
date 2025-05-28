import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Product.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
    setCartItems(guestCart);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('guestCart', JSON.stringify(updatedItems));
  };

  const removeItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('guestCart', JSON.stringify(updatedItems));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('guestCart');
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    // Simulate checkout process
    alert(`Proceeding to checkout with ${getTotalItems()} items worth ₹${getTotalPrice()}`);
    // You can navigate to checkout page here
    // navigate('/checkout');
  };

  return (
    <div className="cart-page">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">ShopperStop</Link>
          <div className="header-actions">
            <Link to="/" className="back-to-shop">Continue Shopping</Link>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="cart-container">
          <h1 className="cart-title">Shopping Cart ({getTotalItems()} items)</h1>
          
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Add some products to get started!</p>
              <Link to="/" className="btn btn-primary">Continue Shopping</Link>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    
                    <div className="item-details">
                      <h3 className="item-name">{item.name}</h3>
                      <div className="item-specs">
                        <span>Color: {item.color}</span>
                        <span>Size: {item.size}</span>
                      </div>
                      <div className="item-price">₹{item.price}</div>
                    </div>
                    
                    <div className="item-quantity">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="item-total">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </div>
                    
                    <button 
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                      title="Remove item"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="cart-summary">
                <div className="summary-details">
                  <h3>Order Summary</h3>
                  <div className="summary-row">
                    <span>Subtotal ({getTotalItems()} items):</span>
                    <span>₹{getTotalPrice().toLocaleString()}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping:</span>
                    <span className="free-shipping">FREE</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax:</span>
                    <span>₹0</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>₹{getTotalPrice().toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="cart-actions">
                  <button 
                    className="btn btn-secondary" 
                    onClick={clearCart}
                    disabled={cartItems.length === 0}
                  >
                    Clear Cart
                  </button>
                  <button 
                    className="btn btn-primary checkout-btn"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
