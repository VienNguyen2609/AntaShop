import React, { useState } from 'react';
import './header.css';
import { useNavigate } from "react-router-dom";

const Headers = () => {
    const navigate = useNavigate();
    const [activeDropdown, setActiveDropdown] = useState(null);
    
    // Dữ liệu menu với dropdown
    const menuData = [
        { id: 1, name: "TRANG CHỦ", link: '/home' }, 
        { id: 2, name: "🔥 UP TO 50%", link: '/collections/san-pham-mega-sale' },
        { id: 3, name: "HÀNG MỚI", link: '/new' },
        { id: 4, name: "ĐỘC QUYỀN ONLINE", link: '/exclusive' },
        { 
            id: 5, 
            name: "NAM", 
            link: '/men',
            hasDropdown: true,
            dropdown: [
                { title: "Giày Nam", items: ["Chạy", "Tập luyện", "Lifestyle"] },
                { title: "Quần Nam", items: ["Áo thun", "Áo khoác", "Quần short"] },
                { title: "Áo Nam", items: ["Mega Sale", "Mới ra mắt"] },
                { title: "Dép Nam", items: [] }
            ]
        },
        { 
            id: 6, 
            name: "NỮ", 
            link: '/women',
            hasDropdown: true,
            dropdown: [
                { title: "Giày Nữ", items: ["Chạy", "Lifestyle"] },
                { title: "Quần Nữ", items: ["Áo thun", "Áo khoác"] },
                { title: "Áo Nữ", items: ["Mega Sale", "Mới ra mắt"] },
                { title: "Dép Nữ", items: [] }
            ]
        },
        { 
            id: 7, 
            name: "PHỤ KIỆN", 
            link: '/accessories',
            hasDropdown: true,
            dropdown: [
                { title: "Túi", items: ["Tote", "Đeo chéo"] },
                { title: "Khác", items: ["Vớ", "Nón", "Dây giày"] }
            ]
        },
        { id: 8, name: "KIDS", link: '/kids' }
    ];

    // Hàm xử lý chuyển trang
    const handlePushRouter = (link) => {
        if (!link) return;
        navigate(link);
    };

    // Hàm xử lý hover để hiện / ẩn dropdown
    const handleMouseEnter = (itemId) => {
        setActiveDropdown(itemId);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };

    return (
        <div className="app">
            {/* Header với logo ANTA */}
            <header className="header">
                {/* Logo ANTA với mũi tên đỏ */}
                <div className="logo">
                    <img 
                        src="https://theme.hstatic.net/1000150581/1001194384/14/logo.png?v=1704" 
                        alt="ANTA Logo" 
                        className="logo-image"
                        onClick={() => handlePushRouter('/home')}
                    />
                </div>

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
                    <div className="icon-item search-icon" onClick={() => handlePushRouter('/search')}>
                        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="m21 21-4.35-4.35"/>
                        </svg>
                    </div>
                    <div className="icon-item user-icon" onClick={() => handlePushRouter('/login')}>
                        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                        </svg>

                    </div>
                    <div className="icon-item badge-icon favourite-icon" onClick={() => handlePushRouter('/favourite')}>
                        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        <span className="badge">0</span>
                    </div>
                    <div className="icon-item badge-icon shoppingcart-icon" onClick={() => handlePushRouter('/cart')}>
                        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="9" cy="21" r="1"/>
                            <circle cx="20" cy="21" r="1"/>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                        </svg>
                        <span className="badge">0</span>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Headers;