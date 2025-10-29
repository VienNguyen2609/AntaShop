import React, { useState } from 'react';
import './TopBanner.css';

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="top-banner">
      <div className="top-banner-content">
        <span className="banner-text">
          🔥 KHUYẾN MÃI ĐẶC BIỆT: GIẢM GIÁ LÊN ĐẾN 50% - MIỄN PHÍ VẬN CHUYỂN CHO ĐƠN HÀNG TỪ 500K
        </span>
      </div>
      <button
        className="banner-close"
        onClick={() => setIsVisible(false)}
        aria-label="Close banner"
      >
        ×
      </button>
    </div>
  );
};

export default TopBanner;
