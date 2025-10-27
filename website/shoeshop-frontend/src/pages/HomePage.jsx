import React from "react";
import { Layout, HeroBanner, DiscountCodes, ProductSections } from "../components";
import { HomeSlider, ProductGrid, BrandStrip, Lookbook } from "../components/home";
import "./HomePage.css";

export default function HomePage() {
  const featuredProducts = [
    {
      id: 1,
      name: "Giày Chạy Thể Thao Nam ANTA Running Pro",
      price: "1.259.100₫",
      originalPrice: "1.399.000₫",
      discount: "10%",
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600",
      badge: "HOT"
    },
    {
      id: 2,
      name: "Giày Chạy Thể Thao Nữ ANTA Speed",
      price: "1.599.000₫",
      originalPrice: "1.999.000₫",
      discount: "20%",
      image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600",
      badge: "SALE"
    },
    {
      id: 3,
      name: "Giày Thể Thao Nam ANTA Lifestyle",
      price: "1.899.000₫",
      originalPrice: "2.199.000₫",
      discount: "14%",
      image: "https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=600",
      badge: "NEW"
    },
    {
      id: 4,
      name: "Giày Bóng Rổ ANTA Basketball Elite",
      price: "2.199.000₫",
      originalPrice: "2.499.000₫",
      discount: "12%",
      image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=600",
      badge: "HOT"
    }
  ];

  const newArrivals = [
    {
      id: 5,
      name: "Áo Thể Thao Nam ANTA Performance",
      price: "599.000₫",
      originalPrice: null,
      discount: null,
      image: "https://images.pexels.com/photos/1232594/pexels-photo-1232594.jpeg?auto=compress&cs=tinysrgb&w=600",
      badge: "NEW"
    },
    {
      id: 6,
      name: "Quần Short Thể Thao ANTA Training",
      price: "499.000₫",
      originalPrice: null,
      discount: null,
      image: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=600",
      badge: "NEW"
    },
    {
      id: 7,
      name: "Giày Chạy ANTA Ultra Light",
      price: "1.799.000₫",
      originalPrice: "2.099.000₫",
      discount: "14%",
      image: "https://images.pexels.com/photos/1619654/pexels-photo-1619654.jpeg?auto=compress&cs=tinysrgb&w=600",
      badge: "NEW"
    },
    {
      id: 8,
      name: "Áo Khoác Thể Thao ANTA Windbreaker",
      price: "1.359.000₫",
      originalPrice: "1.699.000₫",
      discount: "20%",
      image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600",
      badge: "SALE"
    }
  ];

  return (
    <Layout>
      <div className="homepage">
        <HeroBanner />
        
        <DiscountCodes />
        
        <section className="categories-section">
          <div className="container">
            <div className="section-heading">
              <h2 className="section-title-large">Danh Mục Sản Phẩm</h2>
              <p className="section-subtitle">Khám phá bộ sưu tập đa dạng của ANTA</p>
            </div>
            <Lookbook />
          </div>
        </section>

        <section className="featured-section">
          <div className="container">
            <div className="section-heading">
              <h2 className="section-title-large">Sản Phẩm Nổi Bật</h2>
              <p className="section-subtitle">Những sản phẩm được yêu thích nhất</p>
            </div>
            <ProductGrid title="" products={featuredProducts} />
          </div>
        </section>

        <section className="promotional-banner">
          <div className="promo-content">
            <div className="promo-text-block">
              <span className="promo-badge">🔥 MEGA SALE</span>
              <h2 className="promo-title">Giảm Giá Lên Đến 50%</h2>
              <p className="promo-description">
                Cơ hội vàng sở hữu giày thể thao chính hãng với giá tốt nhất
              </p>
              <button className="promo-button">Mua Ngay</button>
            </div>
            <div className="promo-image-block">
              <img 
                src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Promotional shoes"
                className="promo-image"
              />
            </div>
          </div>
        </section>

        <ProductSections />

        <section className="new-arrivals-section">
          <div className="container">
            <div className="section-heading">
              <h2 className="section-title-large">Hàng Mới Về</h2>
              <p className="section-subtitle">Cập nhật xu hướng thể thao mới nhất</p>
            </div>
            <ProductGrid title="" products={newArrivals} />
          </div>
        </section>

        <section className="brands-section">
          <div className="container">
            <div className="section-heading">
              <h2 className="section-title-large">Đối Tác Thương Hiệu</h2>
            </div>
            <BrandStrip />
          </div>
        </section>

        <section className="newsletter-section">
          <div className="newsletter-container">
            <div className="newsletter-content">
              <h2 className="newsletter-title">Đăng Ký Nhận Tin</h2>
              <p className="newsletter-description">
                Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt
              </p>
              <div className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Nhập email của bạn" 
                  className="newsletter-input"
                />
                <button className="newsletter-button">Đăng Ký</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
