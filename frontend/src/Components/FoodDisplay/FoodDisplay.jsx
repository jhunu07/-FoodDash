import React, { useContext, useState, useMemo } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort food items
  const filteredAndSortedFood = useMemo(() => {
    let filtered = food_list.filter(item => 
      category === "All" || category === item.category
    );

    // Sort based on selected option
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep original order
        break;
    }

    return filtered;
  }, [food_list, category, sortBy]);

  const totalItems = filteredAndSortedFood.length;

  return (
    <div className='food-display' id='food-display'>
      <div className="food-display-header">
        <h2>
          {category === "All" 
            ? "Top dishes near you" 
            : `Delicious ${category} dishes`}
        </h2>
        
        {/* Results count and filters */}
        <div className="food-display-controls">
          <div className="results-count">
            <span>{totalItems} dish{totalItems !== 1 ? 'es' : ''} found</span>
          </div>
          
          <div className="filter-controls">
            <button 
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              🔧 Filters
            </button>
            
            {showFilters && (
              <div className="filter-dropdown">
                <label>Sort by:</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Default</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="food-display-list">
        {filteredAndSortedFood.length > 0 ? (
          filteredAndSortedFood.map((item, index) => (
            <FoodItem 
              key={item._id || index} 
              id={item._id} 
              name={item.name} 
              description={item.description} 
              price={item.price} 
              image={item.image}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            />
          ))
        ) : (
          <div className="no-items-found">
            <div className="no-items-icon">🍽️</div>
            <h3>No dishes found</h3>
            <p>
              {category === "All" 
                ? "It looks like we don't have any dishes available right now."
                : `Sorry, we don't have any ${category} dishes available at the moment.`}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="retry-button"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
      
      {/* Loading indicator for future use */}
      {/* {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading delicious dishes...</p>
        </div>
      )} */}
    </div>
  );
};

export default FoodDisplay;
