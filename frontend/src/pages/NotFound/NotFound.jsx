import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='not-found'>
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you're looking for doesn't exist.</p>
        <div className="not-found-actions">
          <Link to="/" className="home-btn">Go Home</Link>
          <Link to="/help" className="help-btn">Get Help</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
