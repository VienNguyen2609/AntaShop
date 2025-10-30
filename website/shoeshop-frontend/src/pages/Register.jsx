import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts';
import { Header as Headers, Footer, FloatingButtons } from '../components';
import './AuthPage.css';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Tên là bắt buộc';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Họ là bắt buộc';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Số điện thoại là bắt buộc';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful registration
      const mockToken = 'mock-jwt-token';
      login(mockToken);
      
      // Redirect to home
      navigate('/home');
    } catch {
      setErrors({ general: 'Đăng ký thất bại. Vui lòng thử lại.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // Mock social login
    console.log(`Login with ${provider}`);
    alert(`Đăng nhập với ${provider} (Mock)`);
  };

  return (
    <div className="auth-page">
      <Headers />
      
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <div className="container">
          <span>Trang chủ / Tài khoản / Đăng ký</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="auth-content">
        <div className="container">
          <div className="auth-form-container">
            <div className="auth-form">
              <h1 className="auth-title">ĐĂNG KÝ TÀI KHOẢN</h1>
              
              <div className="auth-switch">
                <span>Bạn đã có tài khoản? </span>
                <Link to="/login" className="auth-link">Đăng nhập ngay</Link>
              </div>

              <div className="form-section">
                <h2 className="section-title">THÔNG TIN CÁ NHÂN</h2>
                
                <form onSubmit={handleSubmit} className="register-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="lastName">Họ *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Họ"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={errors.lastName ? 'error' : ''}
                      />
                      {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="firstName">Tên *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Tên"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={errors.firstName ? 'error' : ''}
                      />
                      {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Số điện thoại *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Số điện thoại"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Mật khẩu *</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Mật khẩu"
                      value={formData.password}
                      onChange={handleChange}
                      className={errors.password ? 'error' : ''}
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                  </div>

                  {errors.general && (
                    <div className="error-message general-error">
                      {errors.general}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="auth-submit-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
                  </button>
                </form>
              </div>

              <div className="social-login">
                <div className="social-divider">
                  <span>Hoặc đăng nhập bằng</span>
                </div>
                
                <div className="social-buttons">
                  <button 
                    className="social-btn google-btn"
                    onClick={() => handleSocialLogin('Google')}
                  >
                    <div className="social-icon google-icon">G+</div>
                    <span>Đăng nhập Google</span>
                  </button>
                  
                  <button 
                    className="social-btn facebook-btn"
                    onClick={() => handleSocialLogin('Facebook')}
                  >
                    <div className="social-icon facebook-icon">f</div>
                    <span>Đăng nhập Facebook</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <FloatingButtons />
    </div>
  );
}
