import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts';
import { Header as Headers, Footer } from '../components';
import './AuthPage.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockToken = 'mock-jwt-token';
      login(mockToken);
      
      // Redirect based on user role (mock)
      navigate('/home');
    } catch {
      setErrors({ general: 'Đăng nhập thất bại. Vui lòng thử lại.' });
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
          <span>Trang chủ / Tài khoản / Đăng nhập</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="auth-content">
        <div className="container">
          <div className="auth-form-container">
            <div className="auth-form">
              <h1 className="auth-title">ĐĂNG NHẬP TÀI KHOẢN</h1>
              
              <div className="auth-switch">
                <span>Bạn chưa có tài khoản? </span>
                <Link to="/register" className="auth-link">Đăng ký tại đây</Link>
              </div>

              <form onSubmit={handleSubmit} className="login-form">
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

                <div className="form-options">
                  <Link to="/forgot-password" className="forgot-password">
                    Quên mật khẩu? Nhấn vào đây
                  </Link>
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
                  {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>
              </form>

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

      {/* Floating Action Buttons */}
      <div className="floating-buttons">
        <button className="floating-btn cart">🛒</button>
        <button className="floating-btn phone">📞</button>
        <button className="floating-btn zalo">Z</button>
      </div>
    </div>
  );
}