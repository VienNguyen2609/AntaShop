import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="anta-footer">
      <div className="footer-wrapper">
        <div className="footer-grid">
          {/* Company Information Column */}
          <div className="footer-section company-info">
            <h3 className="section-heading">CÔNG TY TNHH ANTA SPORTS VIỆT NAM</h3>
            <div className="info-content">
              <p className="info-item">
                <span className="info-icon">📍</span>
                <span className="info-text">Nhà phố thương mại SH08-22 & SH08-23, Số 07-09, Đường số 7, Phường An Khánh, Thành phố Hồ Chí Minh, Việt Nam</span>
              </p>
              <p className="info-item">
                <span className="info-icon">📞</span>
                <span className="info-text">Số điện thoại: 0974945488</span>
              </p>
              <p className="info-item">
                <span className="info-icon">✉️</span>
                <span className="info-text">Email: antavnonline@anta.com</span>
              </p>
            </div>
            <div className="copyright-text">
              © Bản quyền thuộc về <Link to="/" className="footer-link">Anta Việt Nam</Link> | Cung cấp bởi <span className="footer-link">Haravan</span>
            </div>
          </div>

          {/* Policy Links Column */}
          <div className="footer-section">
            <h3 className="section-heading">CHÍNH SÁCH</h3>
            <ul className="section-links">
              <li className="link-item"><Link to="/policies/shipping" className="link-text">Chính sách vận chuyển</Link></li>
              <li className="link-item"><Link to="/policies/returns" className="link-text">Chính sách đổi trả hàng</Link></li>
              <li className="link-item"><Link to="/policies/privacy" className="link-text">Chính sách bảo mật thông tin</Link></li>
              <li className="link-item"><Link to="/policies/inspection" className="link-text">Chính sách kiểm hàng</Link></li>
              <li className="link-item"><Link to="/policies/obligations" className="link-text">Nghĩa vụ của người bán và nghĩa vụ của khách hàng trong mỗi giao dịch</Link></li>
            </ul>
          </div>

          {/* Customer Support Column */}
          <div className="footer-section">
            <h3 className="section-heading">HỖ TRỢ KHÁCH HÀNG</h3>
            <ul className="section-links">
              <li className="link-item"><Link to="/about" className="link-text">Giới thiệu</Link></li>
              <li className="link-item"><Link to="/terms" className="link-text">Quy định chung</Link></li>
              <li className="link-item"><Link to="/stores" className="link-text">Hệ thống cửa hàng</Link></li>
              <li className="link-item"><Link to="/order-tracking" className="link-text">Kiểm Tra Đơn Hàng</Link></li>
              <li className="link-item"><Link to="/kids" className="link-text">ANTA Kids</Link></li>
            </ul>
          </div>

          {/* Newsletter & Social Column */}
          <div className="footer-section">
            <h3 className="section-heading">ĐĂNG KÝ NHẬN TIN</h3>
            <div className="newsletter-box">
              <input 
                type="email" 
                className="newsletter-input" 
                placeholder="Nhập địa chỉ email" 
                aria-label="Email"
              />
              <button className="newsletter-button">Đăng ký</button>
            </div>
            <div className="social-icons">
              <a href="https://www.facebook.com/antavietnam" target="_blank" rel="noopener noreferrer" className="social-link facebook-link" title="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@antavietnam" target="_blank" rel="noopener noreferrer" className="social-link youtube-link" title="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@antavietnam" target="_blank" rel="noopener noreferrer" className="social-link tiktok-link" title="TikTok">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/antavietnam" target="_blank" rel="noopener noreferrer" className="social-link instagram-link" title="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="footer-divider">
          <div className="certification-bar">
            <div className="cert-item">
              <span className="cert-badge">
                ĐÃ THÔNG BÁO BỘ CÔNG THƯƠNG
              </span>
            </div>
            <div className="payment-logos">
              <span className="payment-item">💳 VISA</span>
              <span className="payment-item">💳 Mastercard</span>
              <span className="payment-item">📱 MoMo</span>
              <span className="payment-item">💰 ZaloPay</span>
              <span className="payment-item">💵 COD</span>
            </div>
          </div>
        </div>

        {/* Legal Information */}
        <div className="legal-info">
          <p className="legal-text">
            Công ty TNHH Anta Sports Việt Nam, Số CN ĐKDN: 0318507641 - Ngày cấp: 12/06/2024 - Nơi cấp: Sở kế hoạch và đầu tư thành phố Hồ Chí Minh - Phòng đăng ký kinh doanh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
