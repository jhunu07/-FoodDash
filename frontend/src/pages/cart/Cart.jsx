import React, { useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const {cartItems, food_list, removeFromCart, addToCart, getTotalCartAmount, url} = useContext(StoreContext);
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const handlePromoSubmit = () => {
    if (promoCode.trim()) {
      setPromoApplied(true);
      setTimeout(() => setPromoApplied(false), 3000);
    }
  };

  const cartItemsCount = Object.values(cartItems).reduce((sum, count) => sum + count, 0);
  const isCartEmpty = cartItemsCount === 0;

  return (
    <div className='cart-page'>
      <div className="cart-header">
        <h1>🛒 Shopping Cart</h1>
        <p className="cart-count">{cartItemsCount} {cartItemsCount === 1 ? 'Item' : 'Items'}</p>
      </div>

      {isCartEmpty ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet</p>
          <button className="shop-now-btn" onClick={() => navigate('/')}>
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items-container">
            <div className="cart-items-header">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
              <span>Action</span>
            </div>

            <div className="cart-items-list">
              {food_list.map((item) => {
                if (cartItems[item._id] > 0) {
                  return (
                    <div key={item._id} className='cart-item-card'>
                      <div className="cart-item-product">
                        <div className="cart-item-image">
                          <img src={item.image.startsWith('http') ? item.image : url + "/images/" + item.image} alt={item.name} />
                        </div>
                        <div className="cart-item-details">
                          <h3>{item.name}</h3>
                          <p className="cart-item-category">Category: {item.category}</p>
                        </div>
                      </div>

                      <div className="cart-item-price">
                        <span className="price-label">Price</span>
                        <span className="price-value">₹{item.price}</span>
                      </div>

                      <div className="cart-item-quantity">
                        <span className="quantity-label">Quantity</span>
                        <div className="quantity-controls">
                          <button 
                            className="quantity-btn minus"
                            onClick={() => removeFromCart(item._id)}
                          >
                            −
                          </button>
                          <span className="quantity-value">{cartItems[item._id]}</span>
                          <button 
                            className="quantity-btn plus"
                            onClick={() => addToCart(item._id)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="cart-item-total">
                        <span className="total-label">Total</span>
                        <span className="total-value">₹{item.price * cartItems[item._id]}</span>
                      </div>

                      <div className="cart-item-remove">
                        <button 
                          className="remove-btn"
                          onClick={() => removeFromCart(item._id)}
                          title="Remove item"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>

          <div className="cart-summary-section">
            <div className="cart-promocode-card">
              <div className="promo-header">
                <span className="promo-icon">🎟️</span>
                <h3>Have a Promo Code?</h3>
              </div>
              <p>Enter your promo code to get special discounts</p>
              <div className='cart-promocode-input'>
                <input 
                  type="text" 
                  placeholder='Enter promo code'
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button onClick={handlePromoSubmit}>Apply</button>
              </div>
              {promoApplied && (
                <div className="promo-success">
                  ✓ Promo code applied successfully!
                </div>
              )}
            </div>

            <div className="cart-total-card">
              <h2>Order Summary</h2>
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{getTotalCartAmount()}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee</span>
                  <span className="free-tag">FREE 🎉</span>
                </div>
                <div className="summary-row discount">
                  <span>Discount</span>
                  <span className="discount-value">- ₹0</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total">
                  <span>Total Amount</span>
                  <span className="total-amount">₹{getTotalCartAmount()}</span>
                </div>
              </div>
              <button className="checkout-btn" onClick={() => navigate('/order')}>
                <span>Proceed to Checkout</span>
                <span className="checkout-arrow">→</span>
              </button>
              <button className="continue-shopping-btn" onClick={() => navigate('/')}>
                ← Continue Shopping
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
