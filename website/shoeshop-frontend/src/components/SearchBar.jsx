import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../services';
import './SearchBar.css';

const SearchBar = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Focus search input when opened
  useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen]);

  // Search products function
  const searchProducts = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const results = await productService.searchProducts(query);
      setSearchResults(results || []);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search input change with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchProducts(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Handle search submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      onClose();
    }
  };

  // Handle product click
  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
    onClose();
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="search-overlay">
      <div className="search-container" ref={searchRef}>
        <div className="search-header">
          <h3>Tìm kiếm sản phẩm</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-input-wrapper">
            <input
              ref={searchRef}
              type="text"
              placeholder="Tìm kiếm giày, quần áo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </div>
        </form>

        {/* Search Results */}
        {showResults && (
          <div className="search-results">
            {isLoading ? (
              <div className="search-loading">
                <div className="loading-spinner"></div>
                <span>Đang tìm kiếm...</span>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="results-list">
                {searchResults.slice(0, 5).map((product) => (
                  <div
                    key={product.id}
                    className="result-item"
                    onClick={() => handleProductClick(product)}
                  >
                    <img src={product.image || '/placeholder.jpg'} alt={product.name} />
                    <div className="result-info">
                      <h4>{product.name}</h4>
                      <p className="result-price">{product.price}đ</p>
                    </div>
                  </div>
                ))}
                {searchResults.length > 5 && (
                  <div className="view-all-results">
                    <button onClick={() => navigate(`/search?q=${encodeURIComponent(searchTerm)}`)}>
                      Xem tất cả kết quả ({searchResults.length})
                    </button>
                  </div>
                )}
              </div>
            ) : searchTerm && (
              <div className="no-results">
                <p>Không tìm thấy sản phẩm nào</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
