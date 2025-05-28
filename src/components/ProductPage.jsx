
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './Product.css';

const ProductPage = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [showValidationPopup, setShowValidationPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [mainImage, setMainImage] = useState('https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=600&fit=crop');

  const navigate = useNavigate();

  const productData = {
    name: "Vellosta Men's Checkered Casual Shirt",
    currentPrice: 599,
    originalPrice: 1299,
    discount: "54% OFF",
    rating: 4.2,
    reviews: 2847,
    colors: [
      { 
        name: 'black', 
        code: '#1a1a1a', 
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=600&fit=crop' 
      },
      { 
        name: 'blue', 
        code: '#2563eb', 
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=600&fit=crop' 
      },
      { 
        name: 'red', 
        code: '#dc2626', 
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=600&fit=crop' 
      },
      { 
        name: 'green', 
        code: '#059669', 
        image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=500&h=600&fit=crop' 
      }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  };

  useEffect(() => {
    loadCartFromStorage();
  }, [isLoggedIn, currentUser]);

  const loadCartFromStorage = () => {
    const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
    const userCart = JSON.parse(localStorage.getItem(`userCart_${currentUser}`) || '[]');
    
    if (isLoggedIn) {
      const mergedCart = [...userCart, ...guestCart];
      setCartItems(mergedCart);
      localStorage.removeItem('guestCart');
      saveCartToStorage(mergedCart);
    } else {
      setCartItems(guestCart);
    }
  };

  const saveCartToStorage = (items = cartItems) => {
    if (isLoggedIn) {
      localStorage.setItem(`userCart_${currentUser}`, JSON.stringify(items));
    } else {
      localStorage.setItem('guestCart', JSON.stringify(items));
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setMainImage(color.image);
  };

  const handleColorHover = (color) => {
    setMainImage(color.image);
  };

  const handleColorLeave = () => {
    if (selectedColor) {
      setMainImage(selectedColor.image);
    } else {
      setMainImage('https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=600&fit=crop');
    }
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const validateSelection = () => {
    return selectedColor && selectedSize;
  };

  const addToCart = () => {
    if (!validateSelection()) {
      setShowValidationPopup(true);
      return;
    }

    const product = {
      id: Date.now(),
      name: productData.name,
      color: selectedColor.name,
      size: selectedSize,
      price: productData.currentPrice,
      image: selectedColor.image,
      quantity: 1
    };

    const newCartItems = [...cartItems, product];
    setCartItems(newCartItems);
    saveCartToStorage(newCartItems);
    
    setSuccessMessage('Product added to cart successfully!');
    setShowSuccessPopup(true);
  };

  const buyNow = () => {
    if (!validateSelection()) {
      setShowValidationPopup(true);
      return;
    }

    addToCart();
    setTimeout(() => {
      setShowSuccessPopup(false);
      alert('Redirecting to checkout...');
    }, 1500);
  };

  const extractUsernameFromEmail = (email) => {
    return email.split('@')[0];
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const username = extractUsernameFromEmail(email);
    
    setCurrentUser(username);
    setUserEmail(email);
    setIsLoggedIn(true);
    setShowLoginPopup(false);
    
    setSuccessMessage('Login successful! Your cart has been preserved.');
    setShowSuccessPopup(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setUserEmail('');
    setShowLogoutDropdown(false);
    localStorage.setItem('guestCart', JSON.stringify(cartItems));
    
    setSuccessMessage('Logged out successfully! Your cart is preserved.');
    setShowSuccessPopup(true);
  };

  const toggleLogoutDropdown = () => {
    setShowLogoutDropdown(!showLogoutDropdown);
  };

  const openCart = () => {
    navigate('/cart');
  };

  const closePopup = () => {
    setShowValidationPopup(false);
    setShowSuccessPopup(false);
    setShowLoginPopup(false);
  };

  return (
    <div className="product-page">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">ShopperStop</Link>
          <div className="header-actions">
            <div className="cart-icon" onClick={openCart}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
              {cartItems.length > 0 && (
                <span className={`cart-badge ${cartItems.length > 0 ? 'show' : ''}`}>
                  {cartItems.length}
                </span>
              )}
            </div>
            
            {isLoggedIn ? (
              <div className="user-dropdown">
                <button 
                  className="login-btn user-btn" 
                  onClick={toggleLogoutDropdown}
                >
                  {currentUser}
                  <span className="dropdown-arrow">▼</span>
                </button>
                {showLogoutDropdown && (
                  <div className="logout-dropdown">
                    <button 
                      className="logout-option"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                className="login-btn" 
                onClick={() => setShowLoginPopup(true)}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container">
        <div className="product-section">
          <div className="image-section">
            <img 
              src={mainImage} 
              alt="Product Image" 
              className="main-image"
              style={{ opacity: 1, transition: 'opacity 0.3s ease' }}
            />
          </div>
          
          <div className="product-info">
            <h1 className="product-title">{productData.name}</h1>
            
            <div className="product-price">
              <span className="current-price">₹{productData.currentPrice}</span>
              <span className="original-price">₹{productData.originalPrice}</span>
              <span className="discount">{productData.discount}</span>
            </div>
            
            <div className="rating">
              <div className="stars">★★★★☆</div>
              <span>({productData.rating}) {productData.reviews.toLocaleString()} ratings</span>
            </div>
            
            <div className="selection-group">
              <div className="selection-label">Color *</div>
              <div className="color-options">
                {productData.colors.map((color) => (
                  <div
                    key={color.name}
                    className={`color-option ${selectedColor?.name === color.name ? 'selected' : ''}`}
                    style={{ backgroundColor: color.code }}
                    onClick={() => handleColorSelect(color)}
                    onMouseEnter={() => handleColorHover(color)}
                    onMouseLeave={handleColorLeave}
                  />
                ))}
              </div>
            </div>
            
            <div className="selection-group">
              <div className="selection-label">Size *</div>
              <div className="size-options">
                {productData.sizes.map((size) => (
                  <div
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="action-buttons">
              <button className="btn btn-primary" onClick={addToCart}>
                Add to Cart
              </button>
              <button className="btn btn-secondary" onClick={buyNow}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Validation Popup */}
      {showValidationPopup && (
        <div className="popup show" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-icon">⚠️</div>
            <div className="popup-message">Please select color and size to add product into cart.</div>
            <button className="popup-btn" onClick={closePopup}>OK</button>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="popup show" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-icon">✅</div>
            <div className="popup-message">{successMessage}</div>
            <button className="popup-btn" onClick={closePopup}>Continue Shopping</button>
          </div>
        </div>
      )}

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="popup show" onClick={closePopup}>
          <div className="login-popup" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>
              Login to Your Account
            </h2>
            <form className="login-form" onSubmit={handleLogin}>
              <input 
                type="email" 
                name="email"
                className="login-input" 
                placeholder="Email Address" 
                required 
              />
              <input 
                type="password" 
                name="password"
                className="login-input" 
                placeholder="Password" 
                required 
              />
              <button type="submit" className="btn btn-primary">Login</button>
              <button 
                type="button" 
                className="btn" 
                style={{ background: '#6c757d', color: 'white' }}
                onClick={closePopup}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductPage;

