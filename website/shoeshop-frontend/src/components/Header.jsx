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
    };

    const handleCartClick = () => {
        navigate(ROUTES.CART);
    };

    return (
        <div className="app">
            <header className="header">
                <div className="header-container">
                    <div className="logo-container">
                        <div className="logo-link" onClick={() => navigate(ROUTES.HOME)}>
                            <img 
                                className="logo-image" 
                                src="https://api.builder.io/api/v1/image/assets/TEMP/1d76ad4a5780ed1a3821e2acd80fe39e927b5bdc?width=300" 
                                alt="logo Anta Việt Nam" 
                            />
                        </div>
                    </div>

                    <div className="nav-center">
                        <div className="nav-wrapper">
                            <nav className="nav-list">
                                {menuData.map((item) => (
                                    <div 
                                        key={item.id} 
                                        className="nav-item"
                                        onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.id)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <div className="nav-link" onClick={() => handlePushRouter(item.link)}>
                                            <div className="nav-link-container">
                                                <div className={`nav-label ${item.highlight ? 'highlight' : ''}`}>
                                                    {item.name}
                                                </div>
                                            </div>
                                            {item.hasDropdown && (
                                                <div className="dropdown-icon">
                                                    <svg className="icon-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                        <g clipPath="url(#clip0_1_1468)">
                                                            <path d="M11.1192 3.0934C11.2125 2.9968 11.2099 2.84284 11.1133 2.74952C11.019 2.6585 10.8696 2.6585 10.7754 2.74952L5.59678 7.92763L0.418666 2.74904C0.325347 2.65244 0.171404 2.64977 0.0747801 2.74307C-0.0218214 2.83638 -0.0244888 2.99033 0.0688063 3.08695C0.070767 3.08898 0.0727507 3.09096 0.0747801 3.09292L5.42507 8.44322C5.52003 8.53816 5.67398 8.53816 5.76896 8.44322L11.1192 3.0934Z" fill="black"/>
                                                            <path d="M0.00315819 2.92136C0.00307427 2.8732 0.0172926 2.8261 0.0440098 2.78602C0.0707279 2.74595 0.108741 2.71471 0.153233 2.69627C0.197725 2.67783 0.246691 2.67301 0.293924 2.68243C0.341157 2.69185 0.384529 2.71508 0.418543 2.74918L5.59665 7.92777L10.7747 2.74918C10.8698 2.65408 11.024 2.65408 11.1191 2.74918C11.2142 2.84428 11.2142 2.99845 11.1191 3.09354L5.76881 8.44384C5.67385 8.53877 5.51991 8.53877 5.42493 8.44384L0.0746571 3.09354C0.0519959 3.07096 0.0340162 3.04412 0.0217472 3.01458C0.00947724 2.98503 0.0031601 2.95335 0.00315819 2.92136Z" fill="black"/>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_1_1468">
                                                                <rect width="11.19" height="11.19" fill="white" transform="matrix(0 1 -1 0 11.1904 0)"/>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        
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
                        </div>
                    </div>

                    <div className="header-actions">
                        <div className="actions-container">
                            <div className="action-icon search-icon" onClick={handleSearchToggle}>
                                <div className="icon-svg">
                                    <svg className="svg-search" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                        <g clipPath="url(#clip0_1_1501)">
                                            <path d="M22.1356 20.9045L16.6712 15.4403C18.0295 13.8069 18.8478 11.7095 18.8478 9.42417C18.8478 4.22766 14.6202 0 9.42394 0C4.22755 0 0 4.22766 0 9.42417C0 14.6203 4.22755 18.8476 9.42394 18.8476C11.7091 18.8476 13.8067 18.0295 15.44 16.6712L20.9045 22.1356C20.9853 22.2166 21.0812 22.2808 21.1868 22.3245C21.2925 22.3683 21.4057 22.3908 21.5201 22.3906C21.6923 22.3907 21.8607 22.3397 22.0039 22.2441C22.1471 22.1484 22.2587 22.0124 22.3246 21.8533C22.3905 21.6942 22.4077 21.5192 22.3741 21.3503C22.3404 21.1814 22.2574 21.0262 22.1356 20.9045ZM1.74107 9.42417C1.74107 5.18769 5.18757 1.74107 9.42394 1.74107C13.6602 1.74107 17.1066 5.18769 17.1066 9.42417C17.1066 13.6603 13.6602 17.1066 9.42394 17.1066C5.18757 17.1066 1.74107 13.6603 1.74107 9.42417Z" fill="black"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1_1501">
                                                <rect width="22.3906" height="22.3906" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                            </div>

                            <div className="action-icon user-icon" onClick={() => isAuthenticated ? null : navigate(ROUTES.LOGIN)}>
                                <div className="icon-svg">
                                    <svg className="svg-user" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                        <g clipPath="url(#clip0_1_1505)">
                                            <path d="M15.1137 13.2944C13.8586 13.2944 13.2551 13.9941 11.1953 13.9941C9.13554 13.9941 8.53642 13.2944 7.27695 13.2944C4.03206 13.2944 1.39941 15.9271 1.39941 19.172V20.2915C1.39941 21.4504 2.33964 22.3906 3.49853 22.3906H18.8921C20.051 22.3906 20.9912 21.4504 20.9912 20.2915V19.172C20.9912 15.9271 18.3585 13.2944 15.1137 13.2944ZM18.8921 20.2915H3.49853V19.172C3.49853 17.0903 5.19532 15.3935 7.27695 15.3935C7.91543 15.3935 8.95187 16.0932 11.1953 16.0932C13.4562 16.0932 14.4708 15.3935 15.1137 15.3935C17.1953 15.3935 18.8921 17.0903 18.8921 19.172V20.2915ZM11.1953 12.5947C14.672 12.5947 17.4927 9.77402 17.4927 6.29736C17.4927 2.82069 14.672 0 11.1953 0C7.71864 0 4.89795 2.82069 4.89795 6.29736C4.89795 9.77402 7.71864 12.5947 11.1953 12.5947ZM11.1953 2.09912C13.5087 2.09912 15.3935 3.98395 15.3935 6.29736C15.3935 8.61076 13.5087 10.4956 11.1953 10.4956C8.8819 10.4956 6.99706 8.61076 6.99706 6.29736C6.99706 3.98395 8.8819 2.09912 11.1953 2.09912Z" fill="black"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1_1505">
                                                <rect width="22.3906" height="22.3906" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                            </div>

                            <div className="action-icon wishlist-icon">
                                <div className="wishlist-symbol">♡</div>
                                <div className="badge-background">
                                    <div className="badge-number">0</div>
                                </div>
                            </div>

                            <div className="action-icon cart-icon" onClick={handleCartClick}>
                                <div className="cart-link">
                                    <div className="icon-svg">
                                        <svg className="svg-cart" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                            <path d="M20.1444 19.315C20.1446 19.4239 20.1233 19.5317 20.0817 19.6324C20.0401 19.733 19.9791 19.8245 19.9022 19.9015C19.8253 19.9786 19.7339 20.0397 19.6333 20.0814C19.5327 20.1231 19.4249 20.1446 19.316 20.1446H18.4863V20.9731C18.4863 21.1928 18.3991 21.4035 18.2437 21.5589C18.0883 21.7142 17.8776 21.8015 17.6579 21.8015C17.4382 21.8015 17.2275 21.7142 17.0721 21.5589C16.9167 21.4035 16.8294 21.1928 16.8294 20.9731V20.1446H16.001C15.7811 20.1446 15.5702 20.0573 15.4148 19.9018C15.2593 19.7463 15.172 19.5354 15.172 19.3156C15.172 19.0957 15.2593 18.8848 15.4148 18.7293C15.5702 18.5739 15.7811 18.4865 16.001 18.4865H16.8294V17.6581C16.8294 17.4383 16.9167 17.2276 17.0721 17.0723C17.2275 16.9169 17.4382 16.8296 17.6579 16.8296C17.8776 16.8296 18.0883 16.9169 18.2437 17.0723C18.3991 17.2276 18.4863 17.4383 18.4863 17.6581V18.4877H19.316C19.7732 18.4877 20.1444 18.8577 20.1444 19.3161V19.315ZM20.1444 6.3897V14.3443C20.1444 14.564 20.0571 14.7747 19.9018 14.9301C19.7464 15.0854 19.5357 15.1727 19.316 15.1727C19.0963 15.1727 18.8855 15.0854 18.7302 14.9301C18.5748 14.7747 18.4875 14.564 18.4875 14.3443V7.21815H16.8283V9.70469C16.8283 9.92441 16.741 10.1351 16.5856 10.2905C16.4303 10.4459 16.2195 10.5331 15.9998 10.5331C15.7801 10.5331 15.5694 10.4459 15.414 10.2905C15.2586 10.1351 15.1714 9.92441 15.1714 9.70469V7.21815H7.21681V9.70469C7.21681 9.92441 7.12952 10.1351 6.97416 10.2905C6.81879 10.4459 6.60807 10.5331 6.38835 10.5331C6.16864 10.5331 5.95792 10.4459 5.80255 10.2905C5.64719 10.1351 5.5599 9.92441 5.5599 9.70469V7.21815H3.90418V20.1446H12.6872C12.796 20.1446 12.9037 20.166 13.0042 20.2077C13.1047 20.2493 13.1961 20.3103 13.273 20.3872C13.3499 20.4642 13.4109 20.5555 13.4526 20.656C13.4942 20.7565 13.5156 20.8643 13.5156 20.9731C13.5156 21.0818 13.4942 21.1896 13.4526 21.2901C13.4109 21.3906 13.3499 21.4819 13.273 21.5589C13.1961 21.6358 13.1047 21.6968 13.0042 21.7384C12.9037 21.7801 12.796 21.8015 12.6872 21.8015H3.07455C2.85483 21.8015 2.64411 21.7142 2.48874 21.5589C2.33338 21.4035 2.24609 21.1928 2.24609 20.9731V6.3897C2.24609 5.93246 2.61731 5.56125 3.07455 5.56125H5.59997C5.76386 4.1919 6.42359 2.93 7.45451 2.01394C8.48543 1.09788 9.81615 0.591104 11.1953 0.589355C12.5744 0.591104 13.9051 1.09788 14.936 2.01394C15.9669 2.93 16.6267 4.1919 16.7906 5.56125H19.316C19.7732 5.56125 20.1444 5.93246 20.1444 6.3897ZM15.1172 5.56125C14.9595 4.63484 14.4794 3.79401 13.7617 3.18738C13.044 2.58075 12.135 2.2474 11.1953 2.24626C10.2554 2.24745 9.34618 2.58096 8.62847 3.18783C7.91075 3.79469 7.43076 4.63581 7.27337 5.56243L15.1172 5.56125Z" fill="black"/>
                                        </svg>
                                    </div>
                                    <div className="badge-background">
                                        <div className="badge-number">{totalItems}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

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
                </div>
            </header>

            {isMobileMenuOpen && (
                <div className="mobile-menu-overlay" onClick={handleMobileMenuToggle}>
                    <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
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

            <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </div>
    );
};

export default Headers;
