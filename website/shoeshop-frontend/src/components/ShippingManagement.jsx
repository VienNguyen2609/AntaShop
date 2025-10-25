import React, { useState } from 'react';
import './ShippingManagement.css';

export default function ShippingManagement() {
  const [selectedStatus, setSelectedStatus] = useState('needs-shipping');
  const [searchOrder, setSearchOrder] = useState('');

  const statusFilters = [
    { id: 'all', label: 'Tất cả', count: 18 },
    { id: 'unpaid', label: 'Chưa thanh toán', count: 3 },
    { id: 'needs-shipping', label: 'Cần gửi', count: 5 },
    { id: 'sent', label: 'Đã gửi', count: 10 },
    { id: 'completed', label: 'Hoàn thành', count: 2 },
    { id: 'cancelled', label: 'Hủy bỏ', count: 0 },
    { id: 'return', label: 'Trở lại', count: 0 }
  ];

  const secondaryFilters = [
    { id: 'all', label: 'Tất cả (18)' },
    { id: 'processing', label: 'Cần xử lý (3)' },
    { id: 'return', label: 'Trở lại' }
  ];

  // Mock data for orders
  const orders = [
    {
      id: 1,
      customer: 'Viên',
      orderNumber: '2201223FJAOQ',
      products: [
        {
          id: 1,
          name: 'T-Shirt Groot Black',
          image: 'https://via.placeholder.com/60x60?text=👕',
          price: '600.000 VNĐ',
          quantity: 1,
          status: 'Cần phải được gửi',
          dueDate: 'Trước 28/05/2025',
          shippingService: 'J&T'
        },
        {
          id: 2,
          name: 'Sepatu Nike',
          image: 'https://via.placeholder.com/60x60?text=👟',
          price: '400.000 VNĐ',
          quantity: 1,
          status: 'Cần phải được gửi',
          dueDate: 'Trước 28/05/2025',
          shippingService: 'J&T'
        }
      ]
    },
    {
      id: 2,
      customer: 'Thao',
      orderNumber: '2197139TYQPWO',
      products: [
        {
          id: 3,
          name: 'T-Shirt Love Kills',
          image: 'https://via.placeholder.com/60x60?text=👕',
          price: '400.000 VNĐ',
          quantity: 2,
          status: 'Cần phải được gửi',
          dueDate: 'Trước 28/05/2025',
          shippingService: 'GHTK'
        }
      ]
    }
  ];

  const handleSearch = () => {
    // TODO: Implement order search
    // console.log('Searching for order:', searchOrder);
  };

  const handleReset = () => {
    setSearchOrder('');
  };

  return (
    <div className="shipping-management">
      <div className="admin-content">
        <div className="page-header">
          <h1 className="page-title">Sản phẩm</h1>
          <div className="header-actions">
            <select className="month-selector">
              <option value="May 2022">May 2022</option>
              <option value="April 2022">April 2022</option>
              <option value="March 2022">March 2022</option>
            </select>
          </div>
        </div>

        <div className="tabs">
          <button className="tab active">Sản phẩm của tôi</button>
          <button className="tab">Thêm sản phẩm</button>
          <button className="tab">Vi phạm</button>
        </div>

        <div className="status-filters">
          {statusFilters.map((filter) => (
            <button
              key={filter.id}
              className={`status-filter ${selectedStatus === filter.id ? 'active' : ''}`}
              onClick={() => setSelectedStatus(filter.id)}
            >
              {filter.label} {filter.count > 0 && `(${filter.count})`}
            </button>
          ))}
        </div>

        <div className="search-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="No. Pesanan"
              value={searchOrder}
              onChange={(e) => setSearchOrder(e.target.value)}
            />
            <span className="search-placeholder">Masukkan no. pesanan</span>
            <button className="search-icon">🔍</button>
          </div>
          <div className="search-actions">
            <button className="search-btn" onClick={handleSearch}>
              Tìm kiếm
            </button>
            <button className="reset-btn" onClick={handleReset}>
              Cài lại
            </button>
          </div>
        </div>

        <div className="secondary-filters">
          {secondaryFilters.map((filter) => (
            <button
              key={filter.id}
              className={`secondary-filter ${filter.id === 'all' ? 'active' : ''}`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="orders-section">
          <div className="orders-header">
            <h3>Đơn hàng cần xử lý</h3>
          </div>
          
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-group">
                <div className="order-header">
                  <div className="customer-info">
                    <span className="customer-icon">👤</span>
                    <span className="customer-name">{order.customer}</span>
                  </div>
                  <div className="order-number">
                    Số đơn hàng {order.orderNumber}
                  </div>
                </div>
                
                <div className="order-products">
                  {order.products.map((product) => (
                    <div key={product.id} className="product-row">
                      <div className="product-info">
                        <img src={product.image} alt={product.name} />
                        <div className="product-details">
                          <h4>{product.name}</h4>
                          <div className="product-price">{product.price}</div>
                        </div>
                      </div>
                      
                      <div className="product-status">
                        <div className="status-text">{product.status}</div>
                        <div className="due-date">{product.dueDate}</div>
                      </div>
                      
                      <div className="product-quantity">
                        {product.quantity}
                      </div>
                      
                      <div className="product-actions">
                        <button className="arrange-shipping-btn">
                          Sắp xếp giao hàng
                        </button>
                      </div>
                      
                      <div className="shipping-service">
                        {product.shippingService}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
