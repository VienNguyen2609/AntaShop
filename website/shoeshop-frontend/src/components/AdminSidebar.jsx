import React from 'react';
import './AdminSidebar.css';
import { ADMIN_MENU_ITEMS } from '../constants';

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const menuItems = ADMIN_MENU_ITEMS;

  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <div className="anta-logo">
          <span className="anta-red">ANTA</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {item.badge && (
              <span className="nav-badge">{item.badge}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">
            <img 
              src="https://via.placeholder.com/40x40?text=👤" 
              alt="Admin Avatar"
            />
          </div>
          <div className="user-info">
            <div className="user-name">Admin</div>
            <div className="user-store">Anta Store</div>
          </div>
          <button className="logout-btn">🚪</button>
        </div>
      </div>
    </div>
  );
}
