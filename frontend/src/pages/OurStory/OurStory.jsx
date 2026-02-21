import React from 'react';
import './OurStory.css';

const OurStory = () => {
  return (
    <div className='our-story'>
      
      <div className="story-hero">
        <h1>Our Story</h1>
        <p>From a small kitchen to your doorstep</p>
      </div>

      <div className="story-container">
        
        <section className="story-section">
          <h2>How It All Began</h2>
          <p>
            Back in 2020, we started with a simple idea: good food should reach everyone, 
            fast and fresh. What began as a small kitchen operation quickly grew into 
            something bigger than we imagined.
          </p>
          <p>
            We were just three friends who loved cooking and believed that quality food 
            shouldn't be complicated. We spent late nights perfecting recipes, testing 
            delivery routes, and talking to customers.
          </p>
        </section>

        <section className="story-section">
          <h2>Our Mission</h2>
          <p>
            We're on a mission to make delicious, home-style meals accessible to everyone. 
            Whether you're working late, craving comfort food, or just don't feel like 
            cooking - we've got you covered.
          </p>
          <p>
            Every dish is prepared with fresh ingredients, cooked with care, and delivered 
            with a smile. We treat every order like we're cooking for family.
          </p>
        </section>

        <section className="story-section">
          <h2>What Makes Us Different</h2>
          <div className="features">
            <div className="feature">
              <h3>🍳 Fresh Every Day</h3>
              <p>We don't believe in frozen or reheated food. Everything is cooked fresh when you order.</p>
            </div>
            <div className="feature">
              <h3>⚡ Lightning Fast</h3>
              <p>Our delivery team works hard to get hot food to you in record time.</p>
            </div>
            <div className="feature">
              <h3>❤️ Made with Love</h3>
              <p>Each meal is prepared by experienced cooks who take pride in their work.</p>
            </div>
            <div className="feature">
              <h3>🌟 Quality First</h3>
              <p>We never compromise on ingredients or taste. Your satisfaction matters most.</p>
            </div>
          </div>
        </section>

        <section className="story-section">
          <h2>Today & Tomorrow</h2>
          <p>
            Today, we serve thousands of happy customers across the city. But we're not 
            stopping here. We're constantly adding new dishes, improving our service, 
            and finding ways to make your experience better.
          </p>
          <p>
            Thank you for being part of our journey. Every order, every review, every 
            suggestion helps us grow. We're excited to continue serving you the food 
            you love.
          </p>
        </section>

        <section className="story-cta">
          <h2>Hungry Yet?</h2>
          <p>Join thousands of happy customers and order your favorite meal today!</p>
          <a href="/" className="order-btn">Order Now</a>
        </section>

      </div>
    </div>
  );
};

export default OurStory;
