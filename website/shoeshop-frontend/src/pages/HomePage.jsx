import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Headers from "../components/Header";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();

  // Kiểm tra nếu chưa login thì điều hướng về trang login
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, [navigate]);
  // Bypass login check để dễ code
  // useEffect(() => {
  //   const bypass = import.meta.env.VITE_BYPASS_AUTH === 'true';
  //   if (!bypass) {
  //     const token = localStorage.getItem("token");
  //     if (!token) navigate("/login");
  //   }
  // }, [navigate]);

  // Dữ liệu sản phẩm mẫu
  const featuredProducts = [
    {
      id: 1,
      name: "ANTA KT8",
      price: "2,490,000đ",
      originalPrice: "3,490,000đ",
      discount: "29%",
      image: "https://via.placeholder.com/300x300?text=ANTA+KT8",
      badge: "HOT"
    },
    {
      id: 2,
      name: "ANTA KT7",
      price: "1,990,000đ",
      originalPrice: "2,990,000đ",
      discount: "33%",
      image: "https://via.placeholder.com/300x300?text=ANTA+KT7",
      badge: "SALE"
    },
    {
      id: 3,
      name: "ANTA GH4",
      price: "1,490,000đ",
      originalPrice: "2,190,000đ",
      discount: "32%",
      image: "https://via.placeholder.com/300x300?text=ANTA+GH4",
      badge: "NEW"
    },
    {
      id: 4,
      name: "ANTA KT6",
      price: "1,290,000đ",
      originalPrice: "1,890,000đ",
      discount: "32%",
      image: "https://via.placeholder.com/300x300?text=ANTA+KT6",
      badge: ""
    }
  ];

  return (
    <div className="homepage">
      <Headers />
      
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">MEGA SALE</h1>
            <h2 className="hero-subtitle">UP TO 50% OFF</h2>
            <p className="hero-description">
              Khám phá bộ sưu tập giày thể thao ANTA với mức giá ưu đãi đặc biệt
            </p>
            <button className="hero-cta" onClick={() => navigate('/collections/san-pham-mega-sale')}>
              MUA NGAY
            </button>
          </div>
          <div className="hero-image">
            <img src="https://via.placeholder.com/600x400?text=ANTA+HERO" alt="ANTA Hero" />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">HÀNG MỚI</h2>
            <p className="section-subtitle">Khám phá những mẫu giày mới nhất từ ANTA</p>
          </div>
          
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  {product.badge && <span className={`product-badge ${product.badge.toLowerCase()}`}>
                    {product.badge}
                  </span>}
                  <div className="product-overlay">
                    <button className="quick-view">XEM NHANH</button>
                    <button className="add-to-cart">THÊM VÀO GIỎ</button>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price">
                    <span className="current-price">{product.price}</span>
                    <span className="original-price">{product.originalPrice}</span>
                    <span className="discount">-{product.discount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="section-footer">
            <button className="view-all-btn" onClick={() => navigate('/new')}>
              XEM TẤT CẢ SẢN PHẨM
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">DANH MỤC SẢN PHẨM</h2>
          <div className="categories-grid">
            <div className="category-card" onClick={() => navigate('/men')}>
              <img src="https://via.placeholder.com/300x200?text=NAM" alt="Nam" />
              <div className="category-overlay">
                <h3>NAM</h3>
                <p>Giày thể thao nam</p>
              </div>
            </div>
            <div className="category-card" onClick={() => navigate('/women')}>
              <img src="https://via.placeholder.com/300x200?text=NỮ" alt="Nữ" />
              <div className="category-overlay">
                <h3>NỮ</h3>
                <p>Giày thể thao nữ</p>
              </div>
            </div>
            <div className="category-card" onClick={() => navigate('/kids')}>
              <img src="https://via.placeholder.com/300x200?text=KIDS" alt="Kids" />
              <div className="category-overlay">
                <h3>KIDS</h3>
                <p>Giày trẻ em</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
