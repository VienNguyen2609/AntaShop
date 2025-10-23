import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>CÔNG TY TNHH ANTA SPORTS VIỆT NAM</h3>
            <div className="contact-info">
              <p>📍 Địa chỉ: Nhà phố thương mại SH08-22 & SH08-23, Số 07-09, Đường số 7, Phường An Khánh, Thành phố Hồ Chí Minh, Việt Nam</p>
              <p>📞 Số điện thoại: 0974945488</p>
              <p>✉️ Email: antavnonline@anta.com</p>
            </div>
            <div className="copyright">
              © Bản quyền thuộc về <a href="#">Anta Việt Nam</a> | Cung cấp bởi <a href="#">Haravan</a>
            </div>
          </div>
          
          <div className="footer-column">
            <h3>CHÍNH SÁCH</h3>
            <ul>
              <li><a href="#">Chính sách vận chuyển</a></li>
              <li><a href="#">Chính sách đổi trả hàng</a></li>
              <li><a href="#">Chính sách bảo mật thông tin</a></li>
              <li><a href="#">Chính sách kiểm hàng</a></li>
              <li><a href="#">Nghĩa vụ của người bán và nghĩa vụ của khách hàng trong mỗi giao dịch</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>HỖ TRỢ KHÁCH HÀNG</h3>
            <ul>
              <li><a href="#">Giới thiệu</a></li>
              <li><a href="#">Quy định chung</a></li>
              <li><a href="#">Hệ thống cửa hàng</a></li>
              <li><a href="#">Kiểm Tra Đơn Hàng</a></li>
              <li><a href="#">ANTA Kids</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>ĐĂNG KÝ NHẬN TIN</h3>
            <div className="newsletter-form">
              <input type="email" placeholder="Nhập địa chỉ email" />
              <button>Đăng ký</button>
            </div>
            <div className="social-media">
              <a href="#" className="social-icon facebook">f</a>
              <a href="#" className="social-icon youtube">▶</a>
              <a href="#" className="social-icon tiktok">T</a>
              <a href="#" className="social-icon search">🔍</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="certification">
            <div className="cert-badge">ĐÃ THÔNG BÁO BỘ CÔNG THƯƠNG</div>
          </div>
          <div className="payment-methods">
            <img src="https://via.placeholder.com/40x25?text=VISA" alt="VISA" />
            <img src="https://via.placeholder.com/40x25?text=MC" alt="Mastercard" />
            <img src="https://via.placeholder.com/40x25?text=MoMo" alt="MoMo" />
            <img src="https://via.placeholder.com/40x25?text=ZaloPay" alt="ZaloPay" />
            <img src="https://via.placeholder.com/40x25?text=COD" alt="COD" />
          </div>
        </div>
        
        <div className="footer-info">
          <p>Công ty TNHH Anta Sports Việt Nam, Số CN ĐKDN: 0318507641 - Ngày cấp: 12/06/2024 - Nơi cấp: Sở kế hoạch và đầu tư thành phố Hồ Chí Minh - Phòng đăng ký kinh doanh</p>
        </div>
        
        <div className="footer-bottom-bar">
          <span>1920 7920.81</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
