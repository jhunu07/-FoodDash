import React, { useState } from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';

const FooterCompact = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());
  const navigate = useNavigate();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setIsSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeClick = () => {
    navigate('/');
    scrollToTop();
  };

  return (
    <div className='footer-compact' id='footer'>
      <div className="footer-content">
        <div className="footer-section">
          <img 
            src={assets.logo} 
            alt="Tomato Logo" 
            className="footer-logo"
            onClick={handleHomeClick}
            style={{ cursor: 'pointer' }}
          />
          <p>Fresh, delicious meals delivered fast.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <div className="links-row">
            <Link to="/" onClick={scrollToTop}>Home</Link>
            <a href="#explore-menu" onClick={() => navigate('/')}>Menu</a>
            <Link to="/myorders">Orders</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <div className="contact-row">
            <a href="tel:+918229862782">📞 Call</a>
            <a href="mailto:contact@tomato.com">✉️ Email</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Stay Updated</h4>
          <form onSubmit={handleNewsletterSubmit} className="newsletter-compact">
            <input
              type="email"
              placeholder="Your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={isSubscribed}>
              {isSubscribed ? '✓' : '→'}
            </button>
          </form>
          
          <div className="social-icons-compact">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <img src={assets.facebook_icon} alt="FB" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <img src={assets.twitter_icon} alt="TW" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <img src={assets.linkedin_icon} alt="LI" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} <span className="brand-highlight">EatSprint.com</span></p>
        <div className="footer-links">
          <Link to="/contact">Privacy Policy</Link>
          <Link to="/contact">Terms & Conditions</Link>
        </div>
      </div>

      <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
        ↑
      </button>
    </div>
  );
};

export default FooterCompact;
