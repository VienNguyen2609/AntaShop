import React from "react";
import "./home.css";

export default function ProductGrid({ title, products = [] }) {
  return (
    <section className="section-products">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
        </div>
        <div className="products-grid">
          {products.map((p) => (
            <div key={p.id} className="product-card">
              <div className="product-image">
                <img src={p.image} alt={p.name} />
                {p.badge && <span className={`product-badge ${p.badge.toLowerCase()}`}>{p.badge}</span>}
                <div className="product-overlay">
                  <button className="quick-view">XEM NHANH</button>
                  <button className="add-to-cart">THÊM VÀO GIỎ</button>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-name">{p.name}</h3>
                <div className="product-price">
                  <span className="current-price">{p.price}</span>
                  {p.originalPrice && <span className="original-price">{p.originalPrice}</span>}
                  {p.discount && <span className="discount">-{p.discount}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


