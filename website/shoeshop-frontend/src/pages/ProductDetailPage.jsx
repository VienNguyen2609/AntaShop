import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../components';
import { useCart } from '../contexts';
import './ProductDetailPage.css';

export default function ProductDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('black');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const product = {
    id: id || 1,
    name: "Giày Chạy Thể Thao Nam ANTA Running Pro",
    price: "1.259.100₫",
    originalPrice: "1.399.000₫",
    discount: "10%",
    sku: "ANTA-RUN-001",
    brand: "ANTA",
    category: "Giày Chạy Bộ",
    images: [
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    sizes: [39, 40, 41, 42, 43, 44],
    colors: [
      { name: 'Đen', value: 'black' },
      { name: 'Trắng', value: 'white' },
      { name: 'Xám', value: 'gray' },
      { name: 'Đỏ', value: 'red' }
    ],
    description: `Giày chạy bộ ANTA Running Pro được thiết kế đặc biệt cho các vận động viên và người yêu thích chạy bộ. 
    Với công nghệ đệm tiên tiến và thiết kế nhẹ nhàng, đôi giày này mang lại sự thoải mái tối đa cho từng bước chạy.`,
    features: [
      'Công nghệ đệm A-FLASHFOAM giúp giảm chấn tối ưu',
      'Lớp Upper làm từ vải Mesh thoáng khí cao cấp',
      'Đế ngoài cao su chống mài mòn, bám đường tốt',
      'Thiết kế nhẹ, chỉ 280g mỗi chiếc (Size 42)',
      'Phù hợp cho chạy đường dài v�� tập luyện hàng ngày'
    ],
    specifications: {
      'Trọng lượng': '280g (Size 42)',
      'Chất liệu Upper': 'Vải Mesh + Synthetic',
      'Chất liệu đế giữa': 'A-FLASHFOAM',
      'Chất liệu đế ngoài': 'Cao su chống mài mòn',
      'Xuất xứ': 'Trung Quốc',
      'Bảo hành': '6 tháng lỗi nhà sản xuất'
    }
  };

  const relatedProducts = [
    {
      id: 2,
      name: "Giày Chạy Thể Thao Nữ ANTA Speed",
      price: "1.599.000₫",
      image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 3,
      name: "Giày Thể Thao Nam ANTA Lifestyle",
      price: "1.899.000₫",
      image: "https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 4,
      name: "Giày Bóng Rổ ANTA Basketball Elite",
      price: "2.199.000₫",
      image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 5,
      name: "Giày Chạy ANTA Ultra Light",
      price: "1.799.000₫",
      image: "https://images.pexels.com/photos/1619654/pexels-photo-1619654.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Vui lòng chọn kích thước');
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity: quantity
    });

    alert('Đã thêm sản phẩm vào giỏ hàng!');
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Vui lòng chọn kích thước');
      return;
    }

    handleAddToCart();
    navigate('/cart');
  };

  return (
    <Layout>
      <div className="product-detail-page">
        <div className="breadcrumbs">
          <div className="container">
            <span className="breadcrumb-link" onClick={() => navigate('/home')}>Trang chủ</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-link" onClick={() => navigate('/products')}>Sản phẩm</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{product.name}</span>
          </div>
        </div>

        <div className="product-detail-section">
          <div className="container">
            <div className="product-detail-layout">
              <div className="product-gallery">
                <div className="main-image">
                  <img src={product.images[selectedImage]} alt={product.name} />
                </div>
                <div className="thumbnail-images">
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img src={image} alt={`${product.name} ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="product-details">
                <div className="product-meta">
                  <span className="product-brand">{product.brand}</span>
                  <span className="product-sku">SKU: {product.sku}</span>
                </div>

                <h1 className="product-title">{product.name}</h1>

                <div className="product-rating">
                  <div className="stars">
                    <span className="star filled">★</span>
                    <span className="star filled">★</span>
                    <span className="star filled">★</span>
                    <span className="star filled">★</span>
                    <span className="star">★</span>
                  </div>
                  <span className="rating-text">(127 đánh giá)</span>
                </div>

                <div className="product-price-section">
                  <div className="price-info">
                    <span className="current-price">{product.price}</span>
                    {product.originalPrice && (
                      <span className="original-price">{product.originalPrice}</span>
                    )}
                    {product.discount && (
                      <span className="discount-badge">-{product.discount}</span>
                    )}
                  </div>
                  <div className="stock-status">
                    <span className="in-stock">✓ Còn hàng</span>
                  </div>
                </div>

                <div className="product-description-short">
                  <p>{product.description}</p>
                </div>

                <div className="product-options">
                  <div className="option-group">
                    <label className="option-label">Màu sắc: <span className="selected-value">{product.colors.find(c => c.value === selectedColor)?.name}</span></label>
                    <div className="color-options">
                      {product.colors.map((color) => (
                        <button
                          key={color.value}
                          className={`color-option ${selectedColor === color.value ? 'active' : ''}`}
                          style={{ backgroundColor: color.value }}
                          onClick={() => setSelectedColor(color.value)}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="option-group">
                    <label className="option-label">Kích thước: {selectedSize && <span className="selected-value">EU {selectedSize}</span>}</label>
                    <div className="size-options">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          className={`size-option ${selectedSize === size ? 'active' : ''}`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="option-group">
                    <label className="option-label">Số lượng:</label>
                    <div className="quantity-selector">
                      <button
                        className="qty-btn"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="qty-input"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        min="1"
                      />
                      <button
                        className="qty-btn"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="product-actions">
                  <button className="btn-add-cart" onClick={handleAddToCart}>
                    Thêm vào giỏ hàng
                  </button>
                  <button className="btn-buy-now" onClick={handleBuyNow}>
                    Mua ngay
                  </button>
                  <button className="btn-wishlist">
                    ♡
                  </button>
                </div>

                <div className="product-info-list">
                  <div className="info-item">
                    <span className="info-icon">🚚</span>
                    <div className="info-content">
                      <strong>Miễn phí vận chuyển</strong>
                      <span>Đơn hàng từ 999.000₫</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">🔄</span>
                    <div className="info-content">
                      <strong>Đổi trả trong 30 ngày</strong>
                      <span>Miễn phí đổi size hoặc trả hàng</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">✓</span>
                    <div className="info-content">
                      <strong>Chính hãng 100%</strong>
                      <span>Cam kết sản phẩm chính hãng</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-tabs-section">
          <div className="container">
            <div className="tabs-header">
              <button
                className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Mô tả sản phẩm
              </button>
              <button
                className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('specifications')}
              >
                Thông số kỹ thuật
              </button>
              <button
                className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Đánh giá (127)
              </button>
            </div>

            <div className="tabs-content">
              {activeTab === 'description' && (
                <div className="tab-panel">
                  <h3>Giới thiệu sản phẩm</h3>
                  <p>{product.description}</p>
                  <h4>Đặc điểm nổi bật</h4>
                  <ul>
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="tab-panel">
                  <h3>Thông số k�� thuật</h3>
                  <table className="specifications-table">
                    <tbody>
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <tr key={key}>
                          <td className="spec-label">{key}</td>
                          <td className="spec-value">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="tab-panel">
                  <h3>Đánh giá từ khách hàng</h3>
                  <div className="reviews-summary">
                    <div className="rating-average">
                      <span className="average-score">4.5</span>
                      <div className="stars">
                        <span className="star filled">★</span>
                        <span className="star filled">★</span>
                        <span className="star filled">★</span>
                        <span className="star filled">★</span>
                        <span className="star">★</span>
                      </div>
                      <span className="review-count">127 đánh giá</span>
                    </div>
                  </div>
                  <div className="review-list">
                    <div className="review-item">
                      <div className="review-header">
                        <strong>Nguyễn Văn A</strong>
                        <div className="stars small">
                          <span className="star filled">★</span>
                          <span className="star filled">★</span>
                          <span className="star filled">★</span>
                          <span className="star filled">★</span>
                          <span className="star filled">★</span>
                        </div>
                      </div>
                      <p className="review-text">Giày rất đẹp và chất lượng. Đi rất êm chân, phù hợp cho chạy bộ hàng ngày.</p>
                      <span className="review-date">2 ngày trước</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="related-products-section">
          <div className="container">
            <h2 className="section-title">Sản phẩm liên quan</h2>
            <div className="related-products-grid">
              {relatedProducts.map((item) => (
                <div
                  key={item.id}
                  className="product-card"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <div className="product-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{item.name}</h3>
                    <div className="product-price">
                      <span className="current-price">{item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
