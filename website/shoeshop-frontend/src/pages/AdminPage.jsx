import React, { useState } from 'react';
import { AdminSidebar, ProductManagement, ShippingManagement, AddProduct } from '../components';
import './AdminPage.css';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('products');
  const [activeSubTab, setActiveSubTab] = useState('my-products');

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return (
          <ProductManagement 
            activeSubTab={activeSubTab}
            setActiveSubTab={setActiveSubTab}
          />
        );
      case 'shipping':
        return <ShippingManagement />;
      case 'messages':
        return <div className="admin-content">Tin nhắn (49)</div>;
      case 'notifications':
        return <div className="admin-content">Thông báo</div>;
      case 'settings':
        return <div className="admin-content">Cài đặt</div>;
      default:
        return <ProductManagement activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} />;
    }
  };

  return (
    <div className="admin-page">
      <AdminSidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="admin-main">
        {renderContent()}
      </div>
    </div>
  );
}
