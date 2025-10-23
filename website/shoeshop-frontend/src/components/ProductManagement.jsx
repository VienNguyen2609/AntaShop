import React, { useState } from 'react';
import AddProduct from './AddProduct';
import './ProductManagement.css';

export default function ProductManagement({ activeSubTab, setActiveSubTab }) {
  // const [searchTerm, setSearchTerm] = useState(''); // Unused for now
  const [selectedMonth, setSelectedMonth] = useState('May 2022');
  const [filters, setFilters] = useState({
    productName: '',
    quantityMin: '',
    quantityMax: '',
    type: '',
    revenueMin: '',
    revenueMax: ''
  });

  // Mock data for products
  const products = [
    {
      id: 1,
      name: 'T-Shirt Groot Black',
      image: 'https://via.placeholder.com/60x60?text=👕',
      price: '500.000 VND',
      quantity: 200,
      rating: 5,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Sepatu Nike',
      image: 'https://via.placeholder.com/60x60?text=👟',
      price: '500.000 VND',
      quantity: 60,
      rating: 5,
      status: 'Active'
    },
    {
      id: 3,
      name: 'T-Shirt Love Kills',
      image: 'https://via.placeholder.com/60x60?text=👕',
      price: '400.000 VND',
      quantity: 120,
      rating: 5,
      status: 'Active'
    },
    {
      id: 4,
      name: 'Tas Selempang Pria',
      image: 'https://via.placeholder.com/60x60?text=🎒',
      price: '500.000 VND',
      quantity: 50,
      rating: 5,
      status: 'Active'
    }
  ];

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    // TODO: Implement search functionality
    // console.log('Searching with filters:', filters);
  };

  const handleReset = () => {
    setFilters({
      productName: '',
      quantityMin: '',
      quantityMax: '',
      type: '',
      revenueMin: '',
      revenueMax: ''
    });
    // setSearchTerm(''); // Unused for now
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (activeSubTab === 'add-product') {
    return <AddProduct />;
  }

  return (
    <div className="product-management">
      <div className="admin-content">
        <div className="page-header">
          <h1 className="page-title">Sản phẩm</h1>
          <div className="header-actions">
            <select 
              className="month-selector"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="May 2022">May 2022</option>
              <option value="April 2022">April 2022</option>
              <option value="March 2022">March 2022</option>
            </select>
          </div>
        </div>

        <div className="tabs">
          <button 
            className={`tab ${activeSubTab === 'my-products' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('my-products')}
          >
            Sản phẩm của tôi
          </button>
          <button 
            className={`tab ${activeSubTab === 'add-product' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('add-product')}
          >
            Thêm sản phẩm
          </button>
          <button 
            className={`tab ${activeSubTab === 'violations' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('violations')}
          >
            Vi phạm
          </button>
        </div>

        <div className="filters-section">
          <div className="filter-row">
            <div className="filter-group">
              <label>Tên sản phẩm</label>
              <input
                type="text"
                value={filters.productName}
                onChange={(e) => handleFilterChange('productName', e.target.value)}
                placeholder="Nhập tên sản phẩm"
              />
            </div>
            <div className="filter-group">
              <label>Số lượng</label>
              <div className="range-inputs">
                <input
                  type="number"
                  value={filters.quantityMin}
                  onChange={(e) => handleFilterChange('quantityMin', e.target.value)}
                  placeholder="Min"
                />
                <span>-</span>
                <input
                  type="number"
                  value={filters.quantityMax}
                  onChange={(e) => handleFilterChange('quantityMax', e.target.value)}
                  placeholder="Max"
                />
              </div>
            </div>
            <div className="filter-group">
              <label>Loại</label>
              <input
                type="text"
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                placeholder="Nhập loại sản phẩm"
              />
            </div>
            <div className="filter-group">
              <label>Doanh thu</label>
              <div className="range-inputs">
                <input
                  type="number"
                  value={filters.revenueMin}
                  onChange={(e) => handleFilterChange('revenueMin', e.target.value)}
                  placeholder="Min"
                />
                <span>-</span>
                <input
                  type="number"
                  value={filters.revenueMax}
                  onChange={(e) => handleFilterChange('revenueMax', e.target.value)}
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
          
          <div className="filter-actions">
            <button className="search-btn" onClick={handleSearch}>
              Tìm kiếm
            </button>
            <button className="reset-btn" onClick={handleReset}>
              Cài lại
            </button>
          </div>
          
          <div className="total-info">
            Total: {products.length} Produk
          </div>
        </div>

        <div className="products-table">
          <table>
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Xếp hạng</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="product-info">
                      <img src={product.image} alt={product.name} />
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <span className="rating">{renderStars(product.rating)}</span>
                  </td>
                  <td>
                    <button className="change-btn">Thay đổi</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
