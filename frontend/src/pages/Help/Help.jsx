import React, { useState } from 'react';
import './Help.css';

const Help = () => {
  const [formData, setFormData] = useState({
    orderId: '',
    issue: '',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ orderId: '', issue: '', description: '' });
    
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className='help-page'>
      
      <div className="help-header">
        <h1>How can we help you?</h1>
        <p>We're here to make your experience better</p>
      </div>

      <div className="help-container">
        
        {/* Quick Contact */}
        <section className="quick-contact">
          <h2>Get in Touch</h2>
          <div className="contact-buttons">
            <a href="tel:+918229862782" className="contact-btn call">
              <span className="icon">📞</span>
              <div>
                <strong>Call Us</strong>
                <p>+91 822-986-2782</p>
              </div>
            </a>
            <a href="mailto:support@eatsprint.com" className="contact-btn email">
              <span className="icon">✉️</span>
              <div>
                <strong>Email Us</strong>
                <p>support@eatsprint.com</p>
              </div>
            </a>
            <a href="https://wa.me/918229862782" target="_blank" rel="noopener noreferrer" className="contact-btn whatsapp">
              <span className="icon">💬</span>
              <div>
                <strong>WhatsApp</strong>
                <p>Chat with us</p>
              </div>
            </a>
          </div>
          <div className="hours">
            <p>⏰ <strong>We're available:</strong> 10:00 AM - 11:00 PM, Every day</p>
          </div>
        </section>

        {/* Report Issue */}
        <section className="report-issue">
          <h2>Report an Order Issue</h2>
          {submitted && (
            <div className="success-message">
              ✓ Thanks! We'll look into this and get back to you soon.
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Order ID (Optional)</label>
              <input
                type="text"
                name="orderId"
                value={formData.orderId}
                onChange={handleChange}
                placeholder="e.g., #12345"
              />
            </div>
            
            <div className="form-group">
              <label>What's the issue?</label>
              <select
                name="issue"
                value={formData.issue}
                onChange={handleChange}
                required
              >
                <option value="">Select an issue</option>
                <option value="wrong-order">Wrong order delivered</option>
                <option value="missing-items">Missing items</option>
                <option value="cold-food">Food was cold</option>
                <option value="late-delivery">Late delivery</option>
                <option value="payment">Payment issue</option>
                <option value="quality">Food quality issue</option>
                <option value="other">Something else</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Tell us more</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what happened..."
                rows="4"
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn">Submit Report</button>
          </form>
        </section>

        {/* FAQ */}
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          
          <div className="faq-item">
            <h3>How long does delivery take?</h3>
            <p>Usually 30-45 minutes depending on your location and order size. You can track your order in real-time from "My Orders".</p>
          </div>
          
          <div className="faq-item">
            <h3>Can I cancel my order?</h3>
            <p>Yes, you can cancel within 2 minutes of placing the order. After that, the kitchen starts preparing it. Go to "My Orders" and click cancel.</p>
          </div>
          
          <div className="faq-item">
            <h3>What payment methods do you accept?</h3>
            <p>We accept all major credit/debit cards, UPI, wallets, and cash on delivery.</p>
          </div>
          
          <div className="faq-item">
            <h3>My food arrived cold, what do I do?</h3>
            <p>We're sorry about that! Use the form above to report it, or call us immediately. We'll either send a fresh order or process a refund.</p>
          </div>
          
          <div className="faq-item">
            <h3>Do you have a minimum order amount?</h3>
            <p>Yes, minimum order is ₹99. Small orders help us keep delivery fast and costs low.</p>
          </div>
          
          <div className="faq-item">
            <h3>How do I get a refund?</h3>
            <p>Refunds are processed within 5-7 business days to your original payment method. Contact us with your order ID for assistance.</p>
          </div>
          
          <div className="faq-item">
            <h3>Can I customize my order?</h3>
            <p>Absolutely! Add special instructions in the cart before checkout. No onions? Extra spicy? Just let us know.</p>
          </div>
          
          <div className="faq-item">
            <h3>What's your delivery area?</h3>
            <p>Currently delivering across Mumbai. Enter your address at checkout to check if we deliver to your area.</p>
          </div>
        </section>

        {/* Still Need Help */}
        <section className="still-help">
          <h2>Still need help?</h2>
          <p>Our support team is happy to assist you. Call or message us during business hours.</p>
          <a href="tel:+918229862782" className="big-call-btn">📞 Call Support Now</a>
        </section>

      </div>
    </div>
  );
};

export default Help;
