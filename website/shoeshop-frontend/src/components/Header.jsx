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
    
    const menuData = MENU_ITEMS;
 
    const handlePushRouter = (link) => {
        if (!link) return;
        navigate(link);
        setIsMobileMenuOpen(false);
    };

    const handleMouseEnter = (itemId) => {
        setActiveDropdown(itemId);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };

    const handleSearchToggle = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = () => {
        logout();
        navigate(ROUTES.HOME);
        setIsMobileMenuOpen(false);
    };

    const handleCartClick = () => {
        navigate(ROUTES.CART);
    };

    return (
        <>
            <header className="anta-header">
                <div className="header-content">
                    <div className="header-left">
                        <button 
                            className="menu-toggle"
                            onClick={handleMobileMenuToggle}
                            aria-label="Menu"
                        >
                            <span className={`toggle-bar ${isMobileMenuOpen ? 'active' : ''}`}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </button>
                        
                        <div className="brand-logo" onClick={() => navigate(ROUTES.HOME)}>
                            <svg width="110" height="36" viewBox="0 0 110 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <text x="5" y="26" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fill="#D70010">ANTA</text>
                            </svg>
                        </div>
                    </div>

                    <nav className="header-navigation">
                        <ul className="navigation-list">
                            {menuData.map((item) => (
                                <li 
                                    key={item.id} 
                                    className="navigation-item"
                                    onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.id)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <div 
                                        className="nav-item-link" 
                                        onClick={() => handlePushRouter(item.link)}
                                    >
                                        <span className={`nav-item-text ${item.highlight ? 'text-highlight' : ''}`}>
                                            {item.name}
                                        </span>
                                        {item.hasDropdown && (
                                            <svg className="nav-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
                                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        )}
                                    </div>
                                    
                                    {item.hasDropdown && activeDropdown === item.id && (
                                        <div className="navigation-dropdown">
                                            <div className="dropdown-container">
                                                {item.dropdown.map((section, index) => (
                                                    <div key={index} className="dropdown-column">
                                                        <h4 className="column-title">{section.title}</h4>
                                                        <ul className="column-items">
                                                            {section.items.map((subItem, subIndex) => (
                                                                <li key={subIndex} className="column-item">
                                                                    <a href="#">{subItem}</a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="header-right">
                        <button 
                            className="header-action search-action" 
                            onClick={handleSearchToggle} 
                            aria-label="Tìm kiếm"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M19 19L13.8 13.8M16 8.5C16 12.6421 12.6421 16 8.5 16C4.35786 16 1 12.6421 1 8.5C1 4.35786 4.35786 1 8.5 1C12.6421 1 16 4.35786 16 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                        </button>

                        <button 
                            className="header-action user-action" 
                            onClick={() => isAuthenticated ? navigate(ROUTES.ADMIN) : navigate(ROUTES.LOGIN)}
                            aria-label={isAuthenticated ? "Tài khoản" : "Đăng nhập"}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M16 17V15C16 13.9391 15.5786 12.9217 14.8284 12.1716C14.0783 11.4214 13.0609 11 12 11H6C4.93913 11 3.92172 11.4214 3.17157 12.1716C2.42143 12.9217 2 13.9391 2 15V17M13 5C13 6.65685 11.6569 8 10 8C8.34315 8 7 6.65685 7 5C7 3.34315 8.34315 2 10 2C11.6569 2 13 3.34315 13 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>

                        <button className="header-action wishlist-action" aria-label="Yêu thích">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 17.5L2.5 10C0.833333 8.33333 0.833333 5.5 2.5 3.83333C4.16667 2.16667 7 2.16667 8.66667 3.83333L10 5.16667L11.3333 3.83333C13 2.16667 15.8333 2.16667 17.5 3.83333C19.1667 5.5 19.1667 8.33333 17.5 10L10 17.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                            </svg>
                            <span className="action-count">0</span>
                        </button>

                        <button className="header-action cart-action" onClick={handleCartClick} aria-label="Giỏ hàng">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M1 1H3.66667L5.73333 12.3933C5.82417 12.8453 6.06973 13.2512 6.42855 13.5422C6.78737 13.8332 7.2362 13.9916 7.7 13.9917H15.4C15.8638 13.9916 16.3126 13.8332 16.6715 13.5422C17.0303 13.2512 17.2758 12.8453 17.3667 12.3933L18.6667 5.66667H4.33333M7.66667 17.6667C7.66667 18.1269 7.29357 18.5 6.83333 18.5C6.3731 18.5 6 18.1269 6 17.6667C6 17.2064 6.3731 16.8333 6.83333 16.8333C7.29357 16.8333 7.66667 17.2064 7.66667 17.6667ZM16.1667 17.6667C16.1667 18.1269 15.7936 18.5 15.3333 18.5C14.8731 18.5 14.5 18.1269 14.5 17.6667C14.5 17.2064 14.8731 16.8333 15.3333 16.8333C15.7936 16.8333 16.1667 17.2064 16.1667 17.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="action-count">{totalItems}</span>
                        </button>
                    </div>
                </div>
            </header>

            {isMobileMenuOpen && (
                <div className="mobile-menu-backdrop" onClick={handleMobileMenuToggle}>
                    <div className="mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
                        <div className="panel-header">
                            <h3 className="panel-title">MENU</h3>
                            <button className="panel-close" onClick={handleMobileMenuToggle} aria-label="Đóng">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </button>
                        </div>
                        
                        <nav className="panel-navigation">
                            {menuData.map((item) => (
                                <div key={item.id} className="panel-nav-item">
                                    <span 
                                        className={`panel-nav-text ${item.highlight ? 'text-highlight' : ''}`}
                                        onClick={() => handlePushRouter(item.link)}
                                    >
                                        {item.name}
                                    </span>
                                </div>
                            ))}
                        </nav>
                        
                        <div className="panel-footer">
                            {isAuthenticated ? (
                                <div className="auth-section">
                                    <p className="auth-greeting">Xin chào, {user.username}</p>
                                    <button className="auth-button" onClick={handleLogout}>Đăng xuất</button>
                                </div>
                            ) : (
                                <button className="auth-button" onClick={() => handlePushRouter(ROUTES.LOGIN)}>
                                    Đăng nhập
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
};

export default Headers;
