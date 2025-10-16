import React from "react";
import "./home.css";

export default function BrandStrip() {
  const brands = new Array(10).fill(0).map((_, i) => ({ id: i + 1, logo: `https://via.placeholder.com/120x60?text=BRAND+${i+1}` }));
  return (
    <section className="brand-strip">
      <div className="container brand-row">
        {brands.map((b) => (
          <img key={b.id} src={b.logo} alt={`brand-${b.id}`} />
        ))}
      </div>
    </section>
  );
}


