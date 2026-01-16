import React, { useState, useMemo } from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [hoveredItem, setHoveredItem] = useState(null)

  // Filter menu items based on search term
  const filteredMenuList = useMemo(() => {
    return menu_list.filter(item => 
      item.menu_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  // Handle category selection with smooth animation
  const handleCategoryClick = (itemName) => {
    setCategory(prev => prev === itemName ? "All" : itemName)
  }

  // Clear search
  const clearSearch = () => {
    setSearchTerm('')
  }
  
  
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore Our Menu</h1>
        <p className='explore-menu-text'>
          Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. 
          Discover flavors that will tantalize your taste buds!
        </p>
        
        {/* Search Box */}
        <div className="explore-menu-search">
          <input
            type="text"
            placeholder="Search for your favorite cuisine..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
          {searchTerm && (
            <button 
              onClick={clearSearch}
              style={{
                position: 'absolute',
                right: '45px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.2rem'
              }}
            >
              ✕
            </button>
          )}
        </div>

        <div className="explore-menu-list">
           {filteredMenuList.length > 0 ? (
             filteredMenuList.map((item, index) => {
              const isActive = category === item.menu_name
              const isHovered = hoveredItem === index
              
              return (
                  <div 
                    onClick={() => handleCategoryClick(item.menu_name)} 
                    key={index} 
                    className={`explore-menu-list-item ${isActive ? 'active' : ''}`}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{
                      '--index': index,
                      transform: isHovered && !isActive ? 'translateY(-8px) scale(1.02)' : '',
                    }}
                  >
                    <img 
                      className={isActive ? "active" : ""} 
                      src={item.menu_image} 
                      alt={item.menu_name}
                      loading="lazy"
                    /> 
                    <p>{item.menu_name}</p>
                    {isActive && (
                      <div style={{
                        position: 'absolute',
                        bottom: '-5px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'white',
                        boxShadow: '0 0 15px rgba(255,255,255,0.9)',
                        animation: 'pulse 1.5s infinite'
                      }} />
                    )}
                    
                    {/* Tooltip on hover */}
                    {isHovered && !isActive && (
                      <div style={{
                        position: 'absolute',
                        bottom: '-35px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(0,0,0,0.8)',
                        color: 'white',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        fontSize: '0.8rem',
                        whiteSpace: 'nowrap',
                        zIndex: 1000,
                        animation: 'fadeInUp 0.3s ease-out'
                      }}>
                        Click to explore {item.menu_name}
                      </div>
                    )}
                  </div>
              )
             })
           ) : (
             <div style={{
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               justifyContent: 'center',
               width: '100%',
               padding: '40px',
               color: '#6c757d',
               animation: 'fadeInUp 0.5s ease-out'
             }}>
               <div style={{fontSize: '3rem', marginBottom: '20px'}}>🔍</div>
               <h3 style={{margin: '0 0 10px 0', color: '#2c3e50'}}>No categories found</h3>
               <p style={{margin: 0, textAlign: 'center'}}>
                 Try adjusting your search or <button 
                   onClick={clearSearch}
                   style={{
                     background: 'none',
                     border: 'none',
                     color: '#ff6b6b',
                     textDecoration: 'underline',
                     cursor: 'pointer',
                     fontSize: 'inherit'
                   }}
                 >
                   clear search
                 </button> to see all categories.
               </p>
             </div>
           )}
        </div>

        {/* Quick Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          flexWrap: 'wrap',
          margin: '20px 0',
          animation: 'fadeInUp 1.4s ease-out 0.8s both'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '15px 25px',
            borderRadius: '20px',
            textAlign: 'center',
            minWidth: '120px',
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
          }}>
            <div style={{fontSize: '1.5rem', fontWeight: 'bold'}}>{menu_list.length}</div>
            <div style={{fontSize: '0.9rem', opacity: 0.9}}>Categories</div>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            padding: '15px 25px',
            borderRadius: '20px',
            textAlign: 'center',
            minWidth: '120px',
            boxShadow: '0 8px 25px rgba(245, 87, 108, 0.3)'
          }}>
            <div style={{fontSize: '1.5rem', fontWeight: 'bold'}}>
              {filteredMenuList.length}
            </div>
            <div style={{fontSize: '0.9rem', opacity: 0.9}}>
              {searchTerm ? 'Found' : 'Available'}
            </div>
          </div>
          
          {category !== "All" && (
            <div style={{
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
              padding: '15px 25px',
              borderRadius: '20px',
              textAlign: 'center',
              minWidth: '120px',
              boxShadow: '0 8px 25px rgba(79, 172, 254, 0.3)',
              animation: 'fadeInUp 0.5s ease-out'
            }}>
              <div style={{fontSize: '1.2rem', fontWeight: 'bold'}}>✓</div>
              <div style={{fontSize: '0.9rem', opacity: 0.9}}>Selected</div>
            </div>
          )}
        </div>

        {/* Category Counter */}
        {searchTerm && (
          <div className="category-counter">
            {filteredMenuList.length > 0 
              ? `Found ${filteredMenuList.length} categor${filteredMenuList.length === 1 ? 'y' : 'ies'} matching "${searchTerm}"`
              : `No categories found matching "${searchTerm}"`
            }
          </div>
        )}

        {/* Selected Category Display */}
        {category !== "All" && (
          <div className="category-counter">
            Currently browsing: <strong>{category}</strong>
            <button 
              onClick={() => setCategory("All")}
              style={{
                marginLeft: '10px',
                padding: '5px 10px',
                background: '#ff6b6b',
                color: 'white',
                border: 'none',
                borderRadius: '15px',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
            >
              View All
            </button>
          </div>
        )}

        <hr/>
    </div>
  )
}

export default ExploreMenu
