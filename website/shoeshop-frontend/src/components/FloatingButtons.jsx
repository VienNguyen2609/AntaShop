import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts';
import './FloatingButtons.css';

const FloatingButtons = () => {
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:0974945488';
  };

  const handleZaloClick = () => {
    window.open('https://zalo.me/0974945488', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="floating-buttons">
      <button 
        className="floating-btn scroll-top" 
        onClick={handleScrollToTop}
        aria-label="Cuộn lên đầu trang"
        title="Cuộn lên đầu trang"
        type="button"
      >
        ↑
      </button>
      
      <button 
        className="floating-btn cart" 
        onClick={handleCartClick}
        aria-label="Giỏ hàng"
        title="Giỏ hàng"
        type="button"
      >
        🛒
        {totalItems > 0 && <span className="floating-badge">{totalItems}</span>}
      </button>
      
      <button 
        className="floating-btn phone" 
        onClick={handlePhoneClick}
        aria-label="Gọi hotline"
        title="Gọi: 0974945488"
        type="button"
      >
        📞
      </button>
      
      <button 
        className="floating-btn zalo" 
        onClick={handleZaloClick}
        aria-label="Chat Zalo"
        title="Chat qua Zalo"
        type="button"
      >
        Z
      </button>
    </div>
  );
};

export default FloatingButtons;
