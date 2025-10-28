import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components';
import { useAuth } from '../contexts';
import './AccountPage.css';

export default function AccountPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const mockOrders = [
    {
      id: 'ANT12345678',
      date: '2024-01-15',
      status: 'Đã giao',
      total: 2599000,
      items: 2,
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 'ANT12345679',
      date: '2024-01-10',
      status: 'Đang giao',
      total: 1899000,
      items: 1,
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 'ANT12345680',
      date: '2024-01-05',
      status: 'Đã giao',
      total: 3450000,
      items: 3,
      image: 'https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const mockWishlist = [
    {
      id: 1,
      name: 'Giày Chạy Thể Thao Nam ANTA Running Pro',
      price: '1.259.100₫',
      originalPrice: '1.399.000₫',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600',
      inStock: true
    },
    {
      id: 2,
      name: 'Giày Bóng Rổ ANTA Basketball Elite',
      price: '2.199.000₫',
      originalPrice: '2.499.000₫',
      image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=600',
      inStock: true
    },
    {
      id: 3,
      name: 'Áo Khoác Thể Thao ANTA Windbreaker',
      price: '1.359.000₫',
      originalPrice: '1.699.000₫',
      image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600',
      inStock: false
    }
  ];

  const [profileData, setProfileData] = useState({
    fullName: user?.username || '',
    email: user?.email || '',
    phone: '',
    birthday: '',
    gender: ''
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    alert('Cập nhật thông tin thành công!');
  };

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Đã giao':
        return 'delivered';
      case 'Đang giao':
        return 'shipping';
      case 'Đang xử lý':
        return 'processing';
      case 'Đã hủy':
        return 'cancelled';
      default:
        return '';
    }
  };

  const renderDashboard = () => (
    <div className="dashboard-content">
      <div className="welcome-section">
        <h2>Xin chào, {user?.username}!</h2>
        <p>Chào mừng bạn quay trở lại với ANTA Việt Nam</p>
      </div>

      <div className="quick-stats">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <div className="stat-value">3</div>
            <div className="stat-label">Đơn hàng</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">❤️</div>
          <div className="stat-info">
            <div className="stat-value">{mockWishlist.length}</div>
            <div className="stat-label">Yêu thích</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎁</div>
          <div className="stat-info">
            <div className="stat-value">0</div>
            <div className="stat-label">Ưu đãi</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <div className="stat-value">0</div>
            <div className="stat-label">Điểm thưởng</div>
          </div>
        </div>
      </div>

      <div className="recent-orders-section">
        <div className="section-header">
          <h3>Đơn hàng gần đây</h3>
          <button className="view-all-btn" onClick={() => setActiveTab('orders')}>
            Xem tất cả
          </button>
        </div>
        <div className="orders-list">
          {mockOrders.slice(0, 2).map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-image">
                <img src={order.image} alt="Order" />
              </div>
              <div className="order-info">
                <div className="order-header-row">
                  <span className="order-id">{order.id}</span>
                  <span className={`order-status ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <p className="order-date">{new Date(order.date).toLocaleDateString('vi-VN')}</p>
                <p className="order-items">{order.items} sản phẩm</p>
                <p className="order-total">Tổng: {order.total.toLocaleString()}₫</p>
              </div>
              <button className="view-order-btn">Xem chi tiết</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="orders-content">
      <h2>Đơn hàng của tôi</h2>
      <div className="orders-filter">
        <button className="filter-btn active">Tất cả</button>
        <button className="filter-btn">Đang xử lý</button>
        <button className="filter-btn">Đang giao</button>
        <button className="filter-btn">Đã giao</button>
        <button className="filter-btn">Đã hủy</button>
      </div>

      <div className="orders-list-full">
        {mockOrders.map((order) => (
          <div key={order.id} className="order-item-full">
            <div className="order-header-full">
              <div className="order-id-date">
                <span className="order-id-label">Mã đơn hàng: <strong>{order.id}</strong></span>
                <span className="order-date-label">{new Date(order.date).toLocaleDateString('vi-VN')}</span>
              </div>
              <span className={`order-status-badge ${getStatusClass(order.status)}`}>
                {order.status}
              </span>
            </div>
            <div className="order-body-full">
              <img src={order.image} alt="Product" className="order-product-image" />
              <div className="order-details-full">
                <p className="order-items-count">{order.items} sản phẩm</p>
                <p className="order-total-full">Tổng tiền: <strong>{order.total.toLocaleString()}₫</strong></p>
              </div>
            </div>
            <div className="order-actions-full">
              <button className="btn-outline">Chi tiết</button>
              {order.status === 'Đã giao' && (
                <>
                  <button className="btn-outline">Mua lại</button>
                  <button className="btn-primary">Đánh giá</button>
                </>
              )}
              {order.status === 'Đang giao' && (
                <button className="btn-primary">Theo dõi</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWishlist = () => (
    <div className="wishlist-content">
      <h2>Sản phẩm yêu thích</h2>
      <div className="wishlist-grid">
        {mockWishlist.map((item) => (
          <div key={item.id} className="wishlist-item">
            <button className="remove-wishlist-btn">×</button>
            <div className="wishlist-image">
              <img src={item.image} alt={item.name} />
              {!item.inStock && (
                <div className="out-of-stock-overlay">Hết hàng</div>
              )}
            </div>
            <div className="wishlist-info">
              <h4>{item.name}</h4>
              <div className="wishlist-price">
                <span className="current-price">{item.price}</span>
                {item.originalPrice && (
                  <span className="original-price">{item.originalPrice}</span>
                )}
              </div>
              {item.inStock ? (
                <button className="add-to-cart-btn" onClick={() => navigate(`/product/${item.id}`)}>
                  Thêm vào giỏ
                </button>
              ) : (
                <button className="notify-btn">Thông báo khi có hàng</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="profile-content">
      <h2>Thông tin cá nhân</h2>
      <form onSubmit={handleSaveProfile} className="profile-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fullName">Họ và tên</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={profileData.fullName}
              onChange={handleProfileChange}
              placeholder="Nhập họ và tên"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleProfileChange}
              placeholder="Nhập email"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={profileData.phone}
              onChange={handleProfileChange}
              placeholder="Nhập số điện thoại"
            />
          </div>
          <div className="form-group">
            <label htmlFor="birthday">Ngày sinh</label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              value={profileData.birthday}
              onChange={handleProfileChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="gender">Giới tính</label>
            <select
              id="gender"
              name="gender"
              value={profileData.gender}
              onChange={handleProfileChange}
            >
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-save">Lưu thay đổi</button>
          <button type="button" className="btn-cancel">Hủy</button>
        </div>
      </form>

      <div className="password-section">
        <h3>Đổi mật khẩu</h3>
        <form className="password-form">
          <div className="form-group">
            <label htmlFor="currentPassword">Mật khẩu hiện tại</label>
            <input type="password" id="currentPassword" placeholder="Nhập mật khẩu hiện tại" />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">Mật khẩu mới</label>
            <input type="password" id="newPassword" placeholder="Nhập mật khẩu mới" />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Xác nhận mật khẩu mới</label>
            <input type="password" id="confirmPassword" placeholder="Nhập lại mật khẩu mới" />
          </div>
          <button type="submit" className="btn-save">Đổi mật khẩu</button>
        </form>
      </div>
    </div>
  );

  const renderAddresses = () => (
    <div className="addresses-content">
      <h2>Sổ địa chỉ</h2>
      <button className="add-address-btn">+ Thêm địa chỉ mới</button>
      
      <div className="addresses-list">
        <div className="address-card default">
          <div className="address-header">
            <h4>Địa chỉ mặc định</h4>
            <span className="default-badge">Mặc định</span>
          </div>
          <div className="address-body">
            <p className="address-name">Nguyễn Văn A</p>
            <p className="address-phone">0123456789</p>
            <p className="address-detail">123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh</p>
          </div>
          <div className="address-actions">
            <button className="btn-edit">Sửa</button>
            <button className="btn-delete">Xóa</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="account-page">
        <div className="breadcrumbs">
          <div className="container">
            <span className="breadcrumb-link" onClick={() => navigate('/home')}>Trang chủ</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Tài khoản</span>
          </div>
        </div>

        <div className="account-container">
          <div className="container">
            <div className="account-layout">
              <aside className="account-sidebar">
                <div className="user-info">
                  <div className="user-avatar">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-details">
                    <h3>{user?.username}</h3>
                    <p>{user?.email}</p>
                  </div>
                </div>

                <nav className="account-nav">
                  <button
                    className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setActiveTab('dashboard')}
                  >
                    <span className="nav-icon">🏠</span>
                    <span>Tổng quan</span>
                  </button>
                  <button
                    className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                    onClick={() => setActiveTab('orders')}
                  >
                    <span className="nav-icon">📦</span>
                    <span>Đơn hàng</span>
                  </button>
                  <button
                    className={`nav-item ${activeTab === 'wishlist' ? 'active' : ''}`}
                    onClick={() => setActiveTab('wishlist')}
                  >
                    <span className="nav-icon">❤️</span>
                    <span>Yêu thích</span>
                  </button>
                  <button
                    className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <span className="nav-icon">👤</span>
                    <span>Thông tin</span>
                  </button>
                  <button
                    className={`nav-item ${activeTab === 'addresses' ? 'active' : ''}`}
                    onClick={() => setActiveTab('addresses')}
                  >
                    <span className="nav-icon">📍</span>
                    <span>Địa chỉ</span>
                  </button>
                  <button className="nav-item" onClick={handleLogout}>
                    <span className="nav-icon">🚪</span>
                    <span>Đăng xuất</span>
                  </button>
                </nav>
              </aside>

              <main className="account-main">
                {activeTab === 'dashboard' && renderDashboard()}
                {activeTab === 'orders' && renderOrders()}
                {activeTab === 'wishlist' && renderWishlist()}
                {activeTab === 'profile' && renderProfile()}
                {activeTab === 'addresses' && renderAddresses()}
              </main>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
