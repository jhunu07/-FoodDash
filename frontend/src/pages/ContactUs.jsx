import React, { useState } from 'react';
import './ContactUs.css';
import { assets } from '../assets/assets';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => {
        setSubmitStatus('');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="contact-us-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1>Get In Touch</h1>
          <p>We'd love to hear from you! Reach out to us for any queries or feedback.</p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="contact-container">
        {/* Contact Information Cards */}
        <div className="contact-info-section">
          <div className="info-card">
            <div className="info-icon phone-icon">📞</div>
            <h3>Call Us</h3>
            <p>Mon-Sat: 9:00 AM - 10:00 PM</p>
            <a href="tel:+918229862782">+91 8229862782</a>
          </div>

          <div className="info-card">
            <div className="info-icon email-icon">✉️</div>
            <h3>Email Us</h3>
            <p>We'll respond within 24 hours</p>
            <a href="mailto:contact@eatsprint.com">contact@eatsprint.com</a>
          </div>

          <div className="info-card">
            <div className="info-icon location-icon">📍</div>
            <h3>Visit Us</h3>
            <p>123 Food Street, Culinary District</p>
            <p>Mumbai, Maharashtra 400001</p>
          </div>

          <div className="info-card">
            <div className="info-icon time-icon">🕐</div>
            <h3>Working Hours</h3>
            <p>Monday - Saturday: 9 AM - 10 PM</p>
            <p>Sunday: 10 AM - 9 PM</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-section">
          <div className="form-header">
            <h2>Send Us a Message</h2>
            <p>Fill out the form below and we'll get back to you soon!</p>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 1234567890"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="order">Order Related</option>
                  <option value="delivery">Delivery Issue</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can help you..."
                rows="6"
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="btn-loading">
                  <span className="spinner"></span> Sending...
                </span>
              ) : (
                <span>Send Message 📨</span>
              )}
            </button>

            {submitStatus === 'success' && (
              <div className="success-message">
                ✓ Message sent successfully! We'll get back to you soon.
              </div>
            )}
          </form>
        </div>

        {/* Map Section */}
        <div className="map-section">
          <h2>Find Us Here</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.14571868058!2d72.74109995709657!3d19.082177516498385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1642581234567!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Location Map"
            ></iframe>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>🍕 What are your delivery hours?</h4>
              <p>We deliver from 9:00 AM to 10:00 PM, Monday through Sunday.</p>
            </div>
            <div className="faq-item">
              <h4>💳 What payment methods do you accept?</h4>
              <p>We accept all major credit cards, debit cards, UPI, and cash on delivery.</p>
            </div>
            <div className="faq-item">
              <h4>🚚 How long does delivery take?</h4>
              <p>Standard delivery takes 30-45 minutes. Express delivery is available for select areas.</p>
            </div>
            <div className="faq-item">
              <h4>🔄 What is your refund policy?</h4>
              <p>We offer full refunds for orders not delivered or quality issues within 24 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
