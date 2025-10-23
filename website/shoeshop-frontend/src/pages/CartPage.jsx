import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts';
import { Header as Headers, Footer } from '../components';
import './CartPage.css';

export default function CartPage() {
  const navigate = useNavigate();
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();

  return (
    <div className="cart-page">
      <Headers />
      
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <div className="container">
          <span>Trang chủ / Giỏ hàng</span>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="promo-banner">
        <div className="container">
          <div className="promo-content">
            <span className="promo-text">Freeship cho đơn hàng từ</span>
            <span className="promo-amount">999.000₫</span>
            <span className="promo-cta">Mua sắm ngay nào!!!</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="cart-content">
        <div className="container">
          {items.length === 0 ? (
            /* Empty Cart State */
            <div className="empty-cart">
              <div className="empty-cart-illustration">
                <div className="cart-basket">
                  <div className="basket-body">
                    <div className="basket-smiley">😊</div>
                  </div>
                  <div className="basket-handle"></div>
                </div>
                <div className="floating-shapes">
                  <div className="shape circle"></div>
                  <div className="shape star"></div>
                  <div className="shape plus"></div>
                  <div className="shape circle"></div>
                </div>
              </div>
              
              <div className="empty-cart-message">
                <h2>"Hồng" có gì trong giỏ hết</h2>
                <p>Về trang cửa hàng để chọn mua sản phẩm bạn nhé!!</p>
              </div>
              
              <button 
                className="shop-now-btn"
                onClick={() => navigate('/home')}
              >
                Mua sắm ngay
              </button>
            </div>
          ) : (
            /* Cart with Items */
            <div className="cart-with-items">
              <div className="cart-header">
                <h1>Giỏ hàng của bạn ({totalItems} sản phẩm)</h1>
                <button 
                  className="clear-cart-btn"
                  onClick={clearCart}
                >
                  Xóa tất cả
                </button>
              </div>

              <div className="cart-items">
                {items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img 
                        src={item.image || 'https://via.placeholder.com/120x120'} 
                        alt={item.name}
                      />
                    </div>
                    
                    <div className="item-info">
                      <h3 className="item-name">{item.name}</h3>
                      <div className="item-price">
                        <span className="current-price">{item.price}₫</span>
                        {item.originalPrice && (
                          <span className="original-price">{item.originalPrice}₫</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="item-quantity">
                      <button 
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button 
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="item-total">
                      <span className="total-price">
                        {(item.price * item.quantity).toLocaleString()}₫
                      </span>
                    </div>
                    
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="order-summary">
                <div className="summary-content">
                  <div className="summary-row">
                    <span>Tạm tính:</span>
                    <span>{totalPrice.toLocaleString()}₫</span>
                  </div>
                  <div className="summary-row">
                    <span>Phí vận chuyển:</span>
                    <span className="free-shipping">Miễn phí</span>
                  </div>
                  <div className="summary-row total">
                    <span>Tổng cộng:</span>
                    <span>{totalPrice.toLocaleString()}₫</span>
                  </div>
                </div>
                
                <div className="checkout-actions">
                  <button 
                    className="continue-shopping-btn"
                    onClick={() => navigate('/home')}
                  >
                    Tiếp tục mua sắm
                  </button>
                  <button 
                    className="checkout-btn"
                    onClick={() => navigate('/checkout')}
                  >
                    Tiến hành thanh toán
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />

      {/* Floating Action Buttons */}
      <div className="floating-buttons">
        <button className="floating-btn cart">🛒</button>
        <button className="floating-btn phone">📞</button>
        <button className="floating-btn zalo">Z</button>
      </div>
    </div>
  );
}
