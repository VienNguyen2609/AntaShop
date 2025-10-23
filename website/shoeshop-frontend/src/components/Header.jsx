import React, { useState } from 'react';
import './header.css';
import { useNavigate } from "react-router-dom";
import { useCart, useAuth } from '../contexts';
import SearchBar from './SearchBar';
import { ROUTES, MENU_ITEMS } from '../constants';

const Headers = () => {
    const navigate = useNavigate();
    const { totalItems } = useCart();
    const { user, isAuthenticated, logout } = useAuth();
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // Sử dụng menu data từ constants
    const menuData = MENU_ITEMS;
 
    const handlePushRouter = (link) => {
        if (!link) return;
        navigate(link);
    };

    const handleMouseEnter = (itemId) => {
        setActiveDropdown(itemId);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };

    // Handle search toggle
    const handleSearchToggle = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    // Handle mobile menu toggle
    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Handle user logout
    const handleLogout = () => {
        logout();
        navigate(ROUTES.HOME);
    };

    // Handle cart click
    const handleCartClick = () => {
        navigate(ROUTES.CART);
    };

    return (
        <div className="app">
            {/* Header với logo ANTA */}
            <header className="header">
                {/* Logo ANTA với mũi tên đỏ */}
                <div className="logo" onClick={() => navigate(ROUTES.HOME)}>
                    <div className="logo-icon">→</div>
                    <span className="logo-text">ANTA</span>
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="mobile-menu-btn"
                    onClick={handleMobileMenuToggle}
                    aria-label="Toggle mobile menu"
                >
                    <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>

                {/* Navigation Menu */}
                <nav className="navigation">
                    {menuData.map((item) => (
                        <div 
                            key={item.id} 
                            className="nav-item"
                            onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.id)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <span 
                                className={`nav-text ${item.highlight ? 'highlight' : ''}`}
                                onClick={() => handlePushRouter(item.link)}
                            >
                                {item.name}
                                {item.hasDropdown && <span className="dropdown-arrow">ˇ</span>}
                            </span>
                            
                            {/* Mega Dropdown */}
                            {item.hasDropdown && activeDropdown === item.id && (
                                <div className="mega-dropdown">
                                    <div className="dropdown-content">
                                        {item.dropdown.map((section, index) => (
                                            <div key={index} className="dropdown-column">
                                                <h4 className="dropdown-title">{section.title}</h4>
                                                <ul className="dropdown-list">
                                                    {section.items.map((subItem, subIndex) => (
                                                        <li key={subIndex} className="dropdown-item">
                                                            <a href="#">{subItem}</a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Cụm icon phải */}
                <div className="header-icons">
                    {/* Search Icon */}
                    <div className="icon-item" onClick={handleSearchToggle}>
                        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="m21 21-4.35-4.35"/>
                        </svg>
                    </div>

                    {/* User Profile / Auth */}
                    {isAuthenticated ? (
                        <div className="user-menu">
                            <div className="user-info">
                                <span className="user-name">Xin chào, {user.username}</span>
                                <div className="user-dropdown">
                                    <button onClick={() => navigate('/profile')}>Tài khoản</button>
                                    {user.role === 'ADMIN' && (
                                        <button onClick={() => navigate(ROUTES.ADMIN)}>Quản trị</button>
                                    )}
                                    <button onClick={handleLogout}>Đăng xuất</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="icon-item" onClick={() => navigate(ROUTES.LOGIN)}>
                            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>
                        </div>
                    )}

                    {/* Wishlist */}
                    <div className="icon-item badge-icon">
                        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        <span className="badge">0</span>
                    </div>

                    {/* Shopping Cart */}
                    <div className="icon-item badge-icon" onClick={handleCartClick}>
                        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="9" cy="21" r="1"/>
                            <circle cx="20" cy="21" r="1"/>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                        </svg>
                        <span className="badge">{totalItems}</span>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="mobile-menu-overlay">
                    <div className="mobile-menu">
                        <div className="mobile-menu-header">
                            <h3>Menu</h3>
                            <button className="close-btn" onClick={handleMobileMenuToggle}>×</button>
                        </div>
                        <nav className="mobile-nav">
                            {menuData.map((item) => (
                                <div key={item.id} className="mobile-nav-item">
                                    <span 
                                        className={`mobile-nav-text ${item.highlight ? 'highlight' : ''}`}
                                        onClick={() => {
                                            handlePushRouter(item.link);
                                            setIsMobileMenuOpen(false);
                                        }}
                                    >
                                        {item.name}
                                    </span>
                                </div>
                            ))}
                        </nav>
                        <div className="mobile-menu-footer">
                            {isAuthenticated ? (
                                <div className="mobile-user-info">
                                    <p>Xin chào, {user.username}</p>
                                    <button onClick={handleLogout}>Đăng xuất</button>
                                </div>
                            ) : (
                                <button onClick={() => {
                                    navigate(ROUTES.LOGIN);
                                    setIsMobileMenuOpen(false);
                                }}>
                                    Đăng nhập
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Search Bar */}
            <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </div>
    );
};

export default Headers;