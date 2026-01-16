import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownloadCompact = () => {
  return (
    <div className="app-download-compact">
      <div className="compact-content">
        <div className="compact-text">
          <h3>📱 Get Our App</h3>
          <p>Order faster with our mobile app</p>
        </div>
        
        <div className="compact-stores">
          <a href="#" className="store-link-compact">
            <img src={assets.play_store} alt="Google Play" />
          </a>
          <a href="#" className="store-link-compact">
            <img src={assets.app_store} alt="App Store" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default AppDownloadCompact
