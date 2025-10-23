import React, { useState } from 'react';
import './ProductSections.css';

const ProductSections = () => {
  const [activeCategory, setActiveCategory] = useState('shoes');
  const [activeGender, setActiveGender] = useState('nam');

  // Mock data for products
  const shoesData = {
    nam: [
      {
        id: 1,
        name: "Giày Chạy Thể Thao Nam Basic Running ANTA 912585571-2",
        price: 1259100,
        originalPrice: 1399000,
        discount: 10,
        image: "https://via.placeholder.com/300x300?text=Product+1",
        isOnline: false
      },
      {
        id: 2,
        name: "Giày Chạy Thể Thao Nam Performance ANTA 912585572-3",
        price: 1599000,
        originalPrice: 1999000,
        discount: 20,
        image: "https://via.placeholder.com/300x300?text=Product+2",
        isOnline: true
      },
      {
        id: 3,
        name: "Giày Chạy Thể Thao Nam Speed ANTA 912585573-4",
        price: 1899000,
        originalPrice: 2199000,
        discount: 14,
        image: "https://via.placeholder.com/300x300?text=Product+3",
        isOnline: true
      },
      {
        id: 4,
        name: "Giày Chạy Thể Thao Nam Endurance ANTA 912585574-5",
        price: 2199000,
        originalPrice: 2499000,
        discount: 12,
        image: "https://via.placeholder.com/300x300?text=Product+4",
        isOnline: false
      }
    ],
    nu: [
      {
        id: 5,
        name: "Giày Chạy Thể Thao Nữ Basic Running ANTA 912585575-6",
        price: 1159100,
        originalPrice: 1299000,
        discount: 11,
        image: "https://via.placeholder.com/300x300?text=Product+5",
        isOnline: false
      },
      {
        id: 6,
        name: "Giày Chạy Thể Thao Nữ Performance ANTA 912585576-7",
        price: 1499000,
        originalPrice: 1799000,
        discount: 17,
        image: "https://via.placeholder.com/300x300?text=Product+6",
        isOnline: true
      },
      {
        id: 7,
        name: "Giày Chạy Thể Thao Nữ Speed ANTA 912585577-8",
        price: 1799000,
        originalPrice: 2099000,
        discount: 14,
        image: "https://via.placeholder.com/300x300?text=Product+7",
        isOnline: true
      },
      {
        id: 8,
        name: "Giày Chạy Thể Thao Nữ Endurance ANTA 912585578-9",
        price: 2099000,
        originalPrice: 2399000,
        discount: 13,
        image: "https://via.placeholder.com/300x300?text=Product+8",
        isOnline: false
      }
    ]
  };

  const sportswearData = {
    ao: [
      {
        id: 9,
        name: "Áo Phông Thể Thao Nam Running Anta",
        price: 599000,
        originalPrice: null,
        discount: 0,
        image: "https://via.placeholder.com/300x300?text=Shirt+1",
        model: "1525C5112-1"
      },
      {
        id: 10,
        name: "Áo Phông Thể Thao Nam Performance Anta",
        price: 499000,
        originalPrice: null,
        discount: 0,
        image: "https://via.placeholder.com/300x300?text=Shirt+2",
        model: "1525C5113-2"
      },
      {
        id: 11,
        name: "Áo Polo Thể Thao Nam Premium Anta",
        price: 1359200,
        originalPrice: 1699000,
        discount: 20,
        image: "https://via.placeholder.com/300x300?text=Shirt+3",
        model: "1525C5114-3"
      },
      {
        id: 12,
        name: "Áo Khoác Thể Thao Nam Next Generation",
        price: 1979100,
        originalPrice: 2199000,
        discount: 10,
        image: "https://via.placeholder.com/300x300?text=Shirt+4",
        model: "1525C5115-4"
      }
    ],
    quan: [
      {
        id: 13,
        name: "Quần Thể Thao Nam Short Anta",
        price: 799000,
        originalPrice: null,
        discount: 0,
        image: "https://via.placeholder.com/300x300?text=Pants+1",
        model: "1525C5116-5"
      },
      {
        id: 14,
        name: "Quần Thể Thao Nam Long Anta",
        price: 999000,
        originalPrice: null,
        discount: 0,
        image: "https://via.placeholder.com/300x300?text=Pants+2",
        model: "1525C5117-6"
      }
    ]
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const renderProductCard = (product) => (
    <div key={product.id} className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-actions">
          <button className="action-button heart-button">
            <span>♡</span>
          </button>
          <button className="action-button share-button">
            <span>🔗</span>
          </button>
        </div>
        {product.isOnline && (
          <div className="online-badge">ONLINE</div>
        )}
      </div>
      
      <div className="product-info">
        <div className="product-brand">ANTA</div>
        <h3 className="product-name">{product.name}</h3>
        {product.model && (
          <div className="product-model">{product.model}</div>
        )}
        
        <div className="product-pricing">
          <div className="current-price">{formatPrice(product.price)}</div>
          {product.originalPrice && (
            <>
              <div className="original-price">{formatPrice(product.originalPrice)}</div>
              <div className="discount-badge">-{product.discount}%</div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="product-sections">
      {/* Sports Shoes Section */}
      <section className="product-section">
        <div className="section-header">
          <button className="section-title-button">
            GIÀY THỂ THAO
          </button>
        </div>
        
        <div className="category-tabs">
          <button 
            className={`tab-button ${activeGender === 'nam' ? 'active' : ''}`}
            onClick={() => setActiveGender('nam')}
          >
            Giày nam
          </button>
          <button 
            className={`tab-button ${activeGender === 'nu' ? 'active' : ''}`}
            onClick={() => setActiveGender('nu')}
          >
            Giày nữ
          </button>
        </div>
        
        <div className="products-grid">
          {shoesData[activeGender].map(renderProductCard)}
        </div>
        
        <div className="view-all-section">
          <button className="view-all-button">
            Xem tất cả &gt;
          </button>
        </div>
      </section>

      {/* Sportswear Section */}
      <section className="product-section">
        <div className="section-header">
          <button className="section-title-button">
            QUẦN ÁO THỂ THAO
          </button>
        </div>
        
        <div className="category-tabs">
          <button className="tab-button active">Áo nam</button>
          <button className="tab-button">Áo nữ</button>
          <button className="tab-button">Quần nam</button>
          <button className="tab-button">Quần nữ</button>
        </div>
        
        <div className="products-grid">
          {sportswearData.ao.map(renderProductCard)}
        </div>
        
        <div className="view-all-section">
          <button className="view-all-button">
            Xem tất cả &gt;
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProductSections;
