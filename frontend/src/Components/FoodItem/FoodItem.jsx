import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const resolveImageSrc = (img) => {
    if (!img) return '';
    const isAbsolute = /^(https?:)?\/\//.test(img) || img.startsWith('/') || img.startsWith('data:') || img.startsWith('blob:');
    return isAbsolute ? img : `${url}/images/${img}`;
  };

  // Stable badge logic based on item id — no random, no flicker
  const numericId = parseInt(id, 10) || 0;
  const isNew = numericId % 5 === 0;       // items 5,10,15,20,25,30
  const isPopular = numericId % 3 === 1;   // items 1,4,7,10,13,16...

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(id);
  };

  const handleQuickRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromCart(id);
  };

  const itemCount = cartItems[id] || 0;

  return (
    <div 
      className='food-item'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
      }}
    >
      <div className="food-item-img-container">
        {/* Badges */}
        {isNew && <div className="new-badge">New</div>}
        {isPopular && <div className="popular-badge">Popular</div>}
        
        {/* Image with loading placeholder */}
        <img 
          className='food-item-image' 
          src={resolveImageSrc(image)}
          alt={name}
          onLoad={handleImageLoad}
          style={{
            opacity: imageLoaded ? 1 : 0.7,
            transition: 'opacity 0.3s ease'
          }}
        />
        
        {/* Loading overlay */}
        {!imageLoaded && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            borderRadius: '20px 20px 0 0'
          }} />
        )}

        {/* Add to cart controls */}
        {!itemCount ? (
          <img
            className='add'
            onClick={handleQuickAdd}
            src={assets.add_icon_white}
            alt="Add to cart"
            title="Add to cart"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
        ) : (
          <div className='food-item-counter'>
            <img 
              onClick={handleQuickRemove} 
              src={assets.remove_icon_red} 
              alt="Remove from cart"
              title="Remove from cart"
            />
            <p>{itemCount}</p>
            <img 
              onClick={handleQuickAdd} 
              src={assets.add_icon_green} 
              alt="Add more"
              title="Add more"
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p title={name}>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        
        <p className="food-item-desc" title={description}>
          {description}
        </p>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '15px'
        }}>
          <p className="food-item-price">
            {price}
          </p>
          
          {/* Quick action buttons */}
          <div style={{
            display: 'flex',
            gap: '8px',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Add to favorites functionality
              }}
              style={{
                background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.9rem',
                transition: 'all 0.2s ease'
              }}
              title="Add to favorites"
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              ❤️
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Share functionality
              }}
              style={{
                background: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.9rem',
                transition: 'all 0.2s ease'
              }}
              title="Share"
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              📤
            </button>
          </div>
        </div>

        {/* Item in cart indicator */}
        {itemCount > 0 && (
          <div style={{
            background: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '15px',
            fontSize: '0.8rem',
            fontWeight: '600',
            textAlign: 'center',
            marginTop: '10px',
            animation: 'scaleIn 0.3s ease-out'
          }}>
            🛒 {itemCount} in cart
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodItem;
