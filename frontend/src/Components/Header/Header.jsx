import React, { useState, useEffect } from 'react'
import './Header.css'

const Header = () => {
  const [currentText, setCurrentText] = useState(0);
  
  const heroTexts = [
    {
      title: "Order your favourite food here",
      subtitle: "Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise."
    },
    {
      title: "Fresh ingredients, delivered fast",
      subtitle: "Experience the perfect blend of quality and convenience with our premium food delivery service."
    },
    {
      title: "Taste the difference today",
      subtitle: "Discover extraordinary flavors from local chefs and restaurants, delivered right to your doorstep."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length);
    }, 5000); // Change text every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const scrollToMenu = () => {
    document.getElementById('explore-menu')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className='header'>
      <div className="header-overlay"></div>
      <div className="header-contents">
        <h2 key={currentText}>
          {heroTexts[currentText].title}
        </h2>
        <p key={`${currentText}-p`}>
          {heroTexts[currentText].subtitle}
        </p>
        <button onClick={scrollToMenu} className="header-cta">
          <span>View Menu</span>
          <span className="button-icon">🍽️</span>
        </button>
        
        {/* Floating elements for visual appeal */}
        <div className="floating-elements">
          <div className="floating-food">🍕</div>
          <div className="floating-food">🍔</div>
          <div className="floating-food">🌮</div>
        </div>
      </div>
      
      {/* Progress indicators */}
      <div className="text-indicators">
        {heroTexts.map((_, index) => (
          <div 
            key={index}
            className={`indicator ${index === currentText ? 'active' : ''}`}
            onClick={() => setCurrentText(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default Header
