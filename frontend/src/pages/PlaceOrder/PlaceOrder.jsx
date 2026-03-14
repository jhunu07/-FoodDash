import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    state: '',
    zipcode: '',
    country: '',
    city: '',
    phone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('online');
  const [codConfirmation, setCodConfirmation] = useState({ show: false, orderId: null, message: '' });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resolveImageSrc = (img) => {
    if (!img) return '';
    const isAbsolute = /^(https?:)?\/\//.test(img) || img.startsWith('/') || img.startsWith('data:') || img.startsWith('blob:');
    return isAbsolute ? img : `${url}/images/${img}`;
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateStep1 = () => {
    return data.firstName && data.lastName && data.email && data.phone;
  };

  const validateStep2 = () => {
    return data.street && data.city && data.state && data.zipcode && data.country;
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    if (getTotalCartAmount() === 0) {
      toast.warn('Your cart is empty.');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderItems = food_list
        .filter((item) => cartItems[item._id] > 0)
        .map((item) => ({
          name: item.name,
          price: Math.round(item.price * 100),
          quantity: cartItems[item._id],
        }));

         const orderData = {
        address: data,
        items: orderItems,
        amount: Math.round(getTotalCartAmount() * 100),
          paymentMethod,
      };

      const config = {};
      if (token && token !== "setContext") {
        config.headers = { Authorization: `Bearer ${token}` };
      }

      const response = await axios.post(`${url}/api/order/place`, orderData, config);

      if (response.data.success && response.data.session_url) {
        window.location.replace(response.data.session_url);
      } else if (response.data.success && response.data.cod) {
        toast.success('Order placed successfully!');
        setCodConfirmation({ show: true, orderId: response.data.orderId, message: response.data.message || 'Order placed (Cash on Delivery).' });
        setTimeout(() => {
          navigate('/myorders');
        }, 4000);
      } else {
        toast.error(response.data.message || 'Failed to place order. Please try again.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred while placing the order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalAmount = getTotalCartAmount();
 
const navigate = useNavigate()
  useEffect(()=>{
   if (!token) {
    navigate('/cart') 
   }else if(getTotalCartAmount()===0)
   {
    navigate('/cart')
   }
  }, [token, getTotalCartAmount, navigate])

  const orderItems = food_list.filter((item) => cartItems[item._id] > 0);

  return (
    <div className="place-order-page">
      {codConfirmation.show && (
        <div className="cod-confirmation-overlay">
          <div className="cod-confirmation-card">
            <div className="success-icon">✓</div>
            <h2>Order Placed Successfully!</h2>
            <p>{codConfirmation.message}</p>
            {codConfirmation.orderId && (
              <div className="order-id">
                <span>Order ID:</span>
                <strong>{codConfirmation.orderId}</strong>
              </div>
            )}
            <button className="view-orders-btn" onClick={() => navigate('/myorders')}>
              View My Orders
            </button>
          </div>
        </div>
      )}

      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Complete your order in a few simple steps</p>
      </div>

      {/* Progress Steps */}
      <div className="progress-steps">
        <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
          <div className="step-number">
            {currentStep > 1 ? '✓' : '1'}
          </div>
          <span>Personal Info</span>
        </div>
        <div className={`step-line ${currentStep > 1 ? 'active' : ''}`}></div>
        <div className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
          <div className="step-number">
            {currentStep > 2 ? '✓' : '2'}
          </div>
          <span>Address</span>
        </div>
        <div className={`step-line ${currentStep > 2 ? 'active' : ''}`}></div>
        <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
          <div className="step-number">3</div>
          <span>Payment</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="checkout-container">
        <div className="checkout-left">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="checkout-card step-card">
              <div className="card-header">
                <span className="card-icon">👤</span>
                <h2>Personal Information</h2>
              </div>
              <div className="form-content">
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name *</label>
                    <input
                      required
                      name="firstName"
                      value={data.firstName}
                      onChange={onChangeHandler}
                      type="text"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input
                      required
                      name="lastName"
                      value={data.lastName}
                      onChange={onChangeHandler}
                      type="text"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    required
                    name="email"
                    value={data.email}
                    onChange={onChangeHandler}
                    type="email"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    required
                    name="phone"
                    value={data.phone}
                    onChange={onChangeHandler}
                    type="tel"
                    placeholder="+91 1234567890"
                  />
                </div>
              </div>
              <button
                type="button"
                className="next-btn"
                onClick={() => validateStep1() && setCurrentStep(2)}
                disabled={!validateStep1()}
              >
                Continue to Address →
              </button>
            </div>
          )}

          {/* Step 2: Delivery Address */}
          {currentStep === 2 && (
            <div className="checkout-card step-card">
              <div className="card-header">
                <span className="card-icon">📍</span>
                <h2>Delivery Address</h2>
              </div>
              <div className="form-content">
                <div className="form-group">
                  <label>Street Address *</label>
                  <input
                    required
                    name="street"
                    value={data.street}
                    onChange={onChangeHandler}
                    type="text"
                    placeholder="House No., Building, Street"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      required
                      name="city"
                      value={data.city}
                      onChange={onChangeHandler}
                      type="text"
                      placeholder="City"
                    />
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <input
                      required
                      name="state"
                      value={data.state}
                      onChange={onChangeHandler}
                      type="text"
                      placeholder="State"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Pin Code *</label>
                    <input
                      required
                      name="zipcode"
                      value={data.zipcode}
                      onChange={onChangeHandler}
                      type="text"
                      placeholder="Pin Code"
                    />
                  </div>
                  <div className="form-group">
                    <label>Country *</label>
                    <input
                      required
                      name="country"
                      value={data.country}
                      onChange={onChangeHandler}
                      type="text"
                      placeholder="Country"
                    />
                  </div>
                </div>
              </div>
              <div className="button-group">
                <button type="button" className="back-btn" onClick={() => setCurrentStep(1)}>
                  ← Back
                </button>
                <button
                  type="button"
                  className="next-btn"
                  onClick={() => validateStep2() && setCurrentStep(3)}
                  disabled={!validateStep2()}
                >
                  Continue to Payment →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment Method */}
          {currentStep === 3 && (
            <div className="checkout-card step-card">
              <div className="card-header">
                <span className="card-icon">💳</span>
                <h2>Payment Method</h2>
              </div>
              <div className="form-content">
                <div className="payment-options">
                  <label className={`payment-option ${paymentMethod === 'online' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === 'online'}
                      onChange={() => setPaymentMethod('online')}
                    />
                    <div className="option-content">
                      <div className="option-icon">💳</div>
                      <div className="option-details">
                        <h4>Online Payment</h4>
                        <p>Pay securely using Credit/Debit Card, UPI, Net Banking</p>
                      </div>
                      <div className="radio-mark"></div>
                    </div>
                  </label>
                  <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                    <div className="option-content">
                      <div className="option-icon">💵</div>
                      <div className="option-details">
                        <h4>Cash on Delivery</h4>
                        <p>Pay with cash when your order is delivered</p>
                      </div>
                      <div className="radio-mark"></div>
                    </div>
                  </label>
                </div>
              </div>
              <div className="button-group">
                <button type="button" className="back-btn" onClick={() => setCurrentStep(2)}>
                  ← Back
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary - Right Side */}
        <div className="checkout-right">
          <div className="summary-card sticky">
            <h2>Order Summary</h2>
            
            <div className="order-items">
              <h3>Items ({orderItems.length})</h3>
              <div className="items-list">
                {orderItems.map((item) => (
                  <div key={item._id} className="summary-item">
                    <img src={resolveImageSrc(item.image)} alt={item.name} />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Qty: {cartItems[item._id]}</p>
                    </div>
                    <span className="item-price">₹{item.price * cartItems[item._id]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{getTotalCartAmount()}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span className="free-delivery">FREE 🎉</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total-row">
                <span>Total Amount</span>
                <span className="total-amount">₹{totalAmount}</span>
              </div>
            </div>

            {currentStep === 3 && (
              <button 
                type="submit" 
                className="place-order-btn"
                disabled={getTotalCartAmount() === 0 || isSubmitting}
              >
                {isSubmitting ? (
                  <span className="btn-loading">
                    <span className="spinner"></span> Processing...
                  </span>
                ) : (
                  <>
                    <span>Place Order</span>
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </button>
            )}

            <div className="secure-payment">
              <span className="lock-icon">🔒</span>
              <span>Secure and encrypted payment</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;